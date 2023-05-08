import { useState } from 'react';
import { DayClickEventHandler } from 'react-day-picker';
import { addMonths } from 'date-fns';

type Props = {
  onDayClick: (day: Date) => void;
};

const useAppointmentCalendarHook = ({ onDayClick }: Props) => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonth);
  const currentStyle = { backgroundColor: '#4579EE' };

  const [showCalendar, setShowCalendar] = useState(false);

  // Todo :  hardcode, just an example till connection with backend
  const isDisabled = (day) => {
    return day > new Date();
  };
  const bookedDays = [
    new Date(2023, 4, 10),
    new Date(2023, 4, 12),
    new Date(2023, 5, 20),
    { before: new Date(), modifiers: { disabled: isDisabled } },
  ];

  // Todo: styles for days without empty slots. not sure if we need them at this moment, maybe in next sprint will be deleted or moved to styles
  const bookedStyle = { color: '#808080' };

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    onDayClick(day, modifiers);
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
    setSelectedDay,
    month,
    setMonth,
    currentStyle,
    showCalendar,
  };
};

export default useAppointmentCalendarHook;
