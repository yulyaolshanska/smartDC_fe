import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DayClickEventHandler } from 'react-day-picker';

import { StyledDayPicker, CalendarWrapper, SelectText } from './styles';
import { addMonths } from 'date-fns';
import { ReactComponent as ArrowMui } from '@assets/arrowMui.svg';

import 'react-day-picker/dist/style.css';

type Props = {
  onDayClick: (day: Date) => void;
  formattedDate: string;
};

const DayPickerCalendar: React.FC<Props> = ({ onDayClick, formattedDate }) => {
  const { t } = useTranslation();
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonth);
  const currentStyle = { backgroundColor: '#4579EE' };

  const [showCalendar, setShowCalendar] = useState(false);

  //   hardcode, just an example
  const bookedDays = [
    new Date(2023, 4, 10),
    new Date(2023, 4, 12),
    new Date(2023, 5, 20),
  ];

  // just an example
  //  styles for days without empty slots. not sure if we need them, maybe in next sprint will be deleted or moved to styles
  const bookedStyle = { color: '#808080' };

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    onDayClick(day, modifiers);
  };

  const toggleState = (): void => {
    setShowCalendar(!showCalendar);
  };

  return (
    <CalendarWrapper>
      <SelectText onClick={toggleState}>
        {!formattedDate ? (
          t('BookAppointment.selectDay')
        ) : (
          <span>{formattedDate}</span>
        )}

        <ArrowMui />
      </SelectText>
      {showCalendar && (
        <StyledDayPicker
          onDayClick={handleDayClick}
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
          numberOfMonths={2}
          month={month}
          onMonthChange={setMonth}
          showOutsideDays
          disabled={bookedDays}
          modifiers={{ current: selectedDay, booked: bookedDays }}
          modifiersStyles={{ current: currentStyle, booked: bookedStyle }}
          classNames={{
            months: 'DayPicker-Months',
            month: 'DayPicker-Month',
          }}
        />
      )}
    </CalendarWrapper>
  );
};

export default DayPickerCalendar;
