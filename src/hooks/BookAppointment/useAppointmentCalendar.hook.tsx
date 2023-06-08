import { useState, useEffect, useMemo } from 'react';
import { DayClickEventHandler } from 'react-day-picker';
import { addMonths } from 'date-fns';
import { appointmentApi } from 'services/AppointmentService';
import { BLUE, HINT } from '@constants/colors';
import { getThreeMonthPeriod, formatTimeRange } from 'utils/functions/timeUtils';
interface Props {
  onDayClick: (day: Date) => void;
  specialization: number;
  setAvalibleTimeRange: React.Dispatch<React.SetStateAction<any>>;
  selectedDay: Date | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setFormattedDate: React.Dispatch<React.SetStateAction<string>>;
}

interface FreeSlotProps {
  doctor: {
    id: number;
    role: string;
    specialization: number;
  };
  start: string;
  end: string;
  id: number;
  title: string;
  uuid: string;
}

const useAppointmentCalendarHook = ({
  onDayClick,
  specialization,
  setAvalibleTimeRange,
  selectedDay,
  setSelectedDay,
  setSelectedDate,
  setFormattedDate,
}: Props) => {
  const today = new Date();
  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState<Date>(nextMonth);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [freeSlots, setFreeSlots] = useState<FreeSlotProps[]>([]);
  const currentStyle = { backgroundColor: `${BLUE}` };
  const bookedStyle = { color: `${HINT}` };
  const { data } = appointmentApi.useGetSpecializationByIdQuery(specialization);

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

  const threeMonthPeriod = useMemo(() => getThreeMonthPeriod(today), []);

  // Set all time to 0 and receive the number equivalent by getTime() function
  const formattedThreeMonthPeriod = threeMonthPeriod.map((date) => {
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  });

  const formattedFreeSlots = freeSlots.map((item) => {
    const date = new Date(item.start);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  });

  const allBookedDates = formattedThreeMonthPeriod.filter(
    (date) => !formattedFreeSlots.includes(date)
  );

  //array with not avalible dates
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

  const selectedDate = new Date(selectedDay);

  const filteredSlots = useMemo(() => {
    return freeSlots.filter((slot) => {
      const slotDate = new Date(slot.start);
      return (
        slotDate.getDate() === selectedDate.getDate() &&
        slotDate.getMonth() === selectedDate.getMonth() &&
        slotDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [freeSlots, selectedDate]);

  const sortedSlots = useMemo(() => {
    return [...filteredSlots].sort((a, b) => {
      const timeA = new Date(a.start).getTime();
      const timeB = new Date(b.start).getTime();
      return timeA - timeB;
    });
  }, [filteredSlots]);

  const uniqueSlots = useMemo(() => {
    const slots = [];
    const uniqueKeys = new Set();

    for (const slot of sortedSlots) {
      const slotDate = new Date(slot.start);

      if (
        slotDate.getDate() === selectedDate.getDate() &&
        slotDate.getMonth() === selectedDate.getMonth() &&
        slotDate.getFullYear() === selectedDate.getFullYear()
      ) {
        const key = `${slot.start}-${slot.end}`;

        if (!uniqueKeys.has(key)) {
          slots.push({
            doctor: slot.doctor.id,
            start: slot.start,
            end: slot.end,
          });
          uniqueKeys.add(key);
        }
      }
    }

    return slots;
  }, [sortedSlots, selectedDate]);

  const transformedSlots = Object.entries(uniqueSlots).map(([key, value]) => ({
    doctor: value.doctor.id,
    start: value.start,
    end: value.end,
  }));


  const formattedAppointments = transformedSlots.map((appointment, index) => ({
    value: Number(index + 1),
    label: formatTimeRange(appointment.start, appointment.end),
  }));

  useEffect(() => {
    if (data && specialization !== undefined) {
      setAvalibleTimeRange(formattedAppointments);
    }
  }, [selectedDay, data, specialization]);

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    onDayClick(day, modifiers);
    setSelectedDate(day);
  };

  const toggleState = (): void => {
    setShowCalendar(!showCalendar);
  };

  const onCancelClick = () => {
    setSelectedDay(null);
    setFormattedDate('');
  };
  return {
    handleDayClick,
    toggleState,
    bookedDays,
    bookedStyle,
    selectedDay,
    month,
    setMonth,
    currentStyle,
    showCalendar,
    formattedAppointments,
    onCancelClick,
  };
};

export default useAppointmentCalendarHook;
