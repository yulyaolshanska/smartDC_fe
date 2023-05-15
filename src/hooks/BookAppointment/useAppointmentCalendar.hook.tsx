import { useState, useEffect } from 'react';
import { DayClickEventHandler } from 'react-day-picker';
import { addMonths } from 'date-fns';
import { appointmentApi } from '../../services/BookAppointmetService';
type Props = {
  onDayClick: (day: Date) => void;
  specialization: number;
  setAvalibleTimeRange: React.Dispatch<React.SetStateAction<any>>;
  selectedDay: Date | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const useAppointmentCalendarHook = ({
  onDayClick,
  specialization,
  setAvalibleTimeRange,
  selectedDay,
  setSelectedDay,
  setSelectedDate
}: Props) => {
  const today = new Date();
  //   const [selectedDay, setSelectedDay] = useState<Date | null>(null); //спробую підняти в форму
  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonth);
  const currentStyle = { backgroundColor: '#4579EE' };

  const [showCalendar, setShowCalendar] = useState(false);

  const { data } = appointmentApi.useGetSpecializationByIdQuery(specialization);

  const [freeSlots, setFreeSlots] = useState([]);

  useEffect(() => {
    if (specialization !== undefined && data) {
      setFreeSlots(data);
    }
  }, [specialization, data]);

  useEffect(() => {
    if (freeSlots.length === 0) {
      setSelectedDay(null);
    }
  }, [freeSlots]);

  //   console.log(`freeslots from back`, freeSlots);

  const TwoMothPeriod = [];
  // створити обєкт на 3 мясяці починаючи з поточного
  for (let i = 0; i < 3; i++) {
    const year = today.getFullYear();
    const month = today.getMonth() + i;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      TwoMothPeriod.push(date);
    }
  }

  // Set all time to 0 and receive the number equivalent by getTime() function
  const formattedTwoMothPeriod = TwoMothPeriod.map((date) => {
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  });

  const formattedFreeSlots = freeSlots.map((item) => {
    const date = new Date(item.start);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  });

  //   створити масив всіх днів, які заброньовані
  const allBookedDates = formattedTwoMothPeriod.filter(
    (date) => !formattedFreeSlots.includes(date)
  );

  const formattedBookedDates = allBookedDates.map((date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    return new Date(year, month, day);
  });

  const isDisabled = (day: Date) => {
    return day > new Date();
  };

  const bookedDays = [
    ...formattedBookedDates,
    { before: new Date(), modifiers: { disabled: isDisabled } },
  ];
  // Todo :  hardcode, just an example till connection with backend

  //   фільтрую вільні слоти по даті
  const selectedDate = new Date(selectedDay);

  const filteredSlots = freeSlots.filter((slot) => {
    const slotDate = new Date(slot.start);
    return (
      slotDate.getDate() === selectedDate.getDate() &&
      slotDate.getMonth() === selectedDate.getMonth() &&
      slotDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  // Сортуємо слоти за часом
  filteredSlots.sort((a, b) => {
    const timeA = new Date(a.start).getTime();
    const timeB = new Date(b.start).getTime();
    return timeA - timeB;
  });

  console.log(`filteredSlots`, filteredSlots);

  // Фільтруємо та залишаємо унікальні слоти
  const uniqueSlots = [];
  const uniqueKeys = new Set();

  for (const slot of filteredSlots) {
    const slotDate = new Date(slot.start);

    if (
      slotDate.getDate() === selectedDate.getDate() &&
      slotDate.getMonth() === selectedDate.getMonth() &&
      slotDate.getFullYear() === selectedDate.getFullYear()
    ) {
      const key = `${slot.doctor.id}-${slot.start}-${slot.end}`;

      if (!uniqueKeys.has(key)) {
        uniqueSlots.push({
          doctor: slot.doctor.id,
          start: slot.start,
          end: slot.end,
        });
        uniqueKeys.add(key);
      }
    }
  }

  console.log(`uniqueSlots`, uniqueSlots);
  // трансофрмую в обєкт
  const transformedSlots = Object.entries(uniqueSlots).map(([key, value]) => ({
    doctor: value.doctor.id,
    start: value.start,
    end: value.end,
  }));

  // перетворити слоти на формат для селект інпуту
  function formatTimeRange(startTime, endTime) {
    const start = new Date(startTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const end = new Date(endTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${start}-${end}`;
  }

  const formattedAppointments = transformedSlots.map((appointment, index) => ({
    value: Number(index + 1),
    label: formatTimeRange(appointment.start, appointment.end),
  }));

  useEffect(() => {
    if (data && specialization !== undefined) {
      setAvalibleTimeRange(formattedAppointments);
    }
  }, [selectedDay, data, specialization]);

  // Todo: styles for days without empty slots. not sure if we need them at this moment, maybe in next sprint will be deleted or moved to styles
  const bookedStyle = { color: '#808080' };

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    onDayClick(day, modifiers);
    setSelectedDate(day)

  };

  const toggleState = (): void => {
    setShowCalendar(!showCalendar);
  };

  return {
    handleDayClick,
    toggleState,
    bookedDays,
    bookedStyle,
    selectedDay,
    // setSelectedDay,

    month,
    setMonth,
    currentStyle,
    showCalendar,
    formattedAppointments,
  };
};

export default useAppointmentCalendarHook;
