import { useTranslation } from 'react-i18next';
import useAppointmentCalendarHook from 'hooks/BookAppointment/useAppointmentCalendar.hook';
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
}

const DayPickerCalendar: React.FC<Props> = ({
  onDayClick,
  formattedDate,
  setFormattedDate,
}) => {
  const { t } = useTranslation();

  const {
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
  } = useAppointmentCalendarHook({ onDayClick });

  return (
    <CalendarWrapper>
      <SelectText onClick={toggleState}>
        {!formattedDate ? (
          t('BookAppointment.selectDay')
        ) : (
          <TextinCalendarInput>{formattedDate}</TextinCalendarInput>
        )}
        {formattedDate && <CancelIcon onClick={() => setFormattedDate('')} />}

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
            months: 'DayPicker-Months',
            month: 'DayPicker-Month',
          }}
        />
      )}
    </CalendarWrapper>
  );
};

export default DayPickerCalendar;
