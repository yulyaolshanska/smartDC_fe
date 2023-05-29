import { useTranslation } from 'react-i18next';
import useAppointmentCalendarHook from 'hooks/BookAppointment/useAppointmentCalendar.hook';
import { dayPickerMonths } from '@constants/other';
import {
  StyledDayPicker,
  CalendarWrapper,
  SelectText,
  TextinCalendarInput,
  ArrowIcon,
  ArrowIconShown,
  CancelIcon,
} from './styles';
import 'react-day-picker/dist/style.css';

interface Props {
  onDayClick: (day: Date) => void;
  formattedDate: string;
  setFormattedDate: React.Dispatch<React.SetStateAction<string>>;
  specialization: number;
  setAvalibleTimeRange: React.Dispatch<React.SetStateAction<any>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedDay: Date | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
}

const DayPickerCalendar: React.FC<Props> = ({
  onDayClick,
  formattedDate,
  setFormattedDate,
  specialization,
  setAvalibleTimeRange,
  selectedDay,
  setSelectedDay,
  setSelectedDate,
}) => {
  const { t } = useTranslation();

  const {
    handleDayClick,
    toggleState,
    bookedDays,
    bookedStyle,
    month,
    setMonth,
    currentStyle,
    showCalendar,
    onCancelClick,
  } = useAppointmentCalendarHook({
    onDayClick,
    specialization,
    setAvalibleTimeRange,
    selectedDay,
    setSelectedDay,
    setSelectedDate,
    setFormattedDate,
  });

  return (
    <CalendarWrapper>
      <SelectText onClick={toggleState}>
        {!formattedDate ? (
          t('BookAppointment.selectDay')
        ) : (
          <TextinCalendarInput>{formattedDate}</TextinCalendarInput>
        )}
        {formattedDate && <CancelIcon onClick={onCancelClick} />}
        {!showCalendar ? <ArrowIcon /> : <ArrowIconShown />}
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
            months: `${dayPickerMonths}`,
            month: `${dayPickerMonths}`,
          }}
        />
      )}
    </CalendarWrapper>
  );
};

export default DayPickerCalendar;
