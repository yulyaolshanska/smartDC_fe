import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import SpecializationInput from '@components/Appointment/SpecializationSelect';
import Calendar from '@components/Appointment/Calendar';
import AppointmentTime from '@components/Appointment/TimeSelect';
import { date } from '@constants/other';
import { InputProps } from '@components/Patient/Inputs/type';
import { ReactComponent as ArrowRight } from '@assets/arrowRight.svg';
import CancelBtn from '@components/Appointment/CancelBtn';
import {
  StepWrapper,
  Text,
  FormFooter,
  BntWrapper,
  StepBtn,
} from '@components/Appointment/BookAppointmentForm/styles';
import {
  CalendarWrapper,
  FormInfo,
  YouSelected,
  SelectedDayTime,
  TextInfo,
} from '@components/Appointment/BookAppointmentForm/FirstStep/styles';
import { Date } from '@components/Notes/Note/styles';
import { use } from 'i18next';
import { useForm } from 'react-hook-form';
import Input from '@components/Input';

// import { Conroller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker';

interface Props {
  formattedDate: string;
  handleCalendarDayClick: (day: Date) => void;
  setFormattedDate: React.Dispatch<React.SetStateAction<string>>;
  formattedTime: string;
  setFormattedTime: React.Dispatch<React.SetStateAction<string>>;
  isValid: boolean;
  isDirty: boolean;
  control: Control;
  errors: FieldErrors;
  setStep: React.Dispatch<React.SetStateAction<boolean>>;
  setSpecialization: React.Dispatch<React.SetStateAction<number>>;
  specialization: number;
  setAvalibleTimeRange: React.Dispatch<React.SetStateAction<any>>;
  avalibleTimeRange: any;

  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;

  setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedDay: Date | null;

  //   onChange: any;
  register: (value: Date | null) => void;
  setValue: any;
  selectedDate: any;
}

const FirstStepAppointment = ({
  formattedDate,
  setFormattedDate,
  handleCalendarDayClick,
  formattedTime,
  setFormattedTime,
  isValid,
  isDirty,
  control,
  errors,
  setStep,
  setSpecialization,
  specialization,
  setAvalibleTimeRange,
  avalibleTimeRange,

  setSelectedDate,
  selectedDate,

  selectedDay,
  setSelectedDay,
  register,
  setValue,
}: //   onChange

InputProps & Props) => {
  const { t } = useTranslation();

  console.log(`FIRST`, selectedDate);
  useEffect(() => {
    setValue('date', selectedDate); // this will result a type error
  }, [selectedDate]);

  return (
    <>
      <TextInfo>{t('BookAppointment.instruction')}</TextInfo>
      <StepWrapper>
        <Text>{t('BookAppointment.stepOne')}</Text>
        <CancelBtn />
      </StepWrapper>
      <SpecializationInput
        control={control}
        errors={errors}
        setSpecialization={setSpecialization}
      />

      <Controller
        control={control}
        name="date"
        render={() => (
          <input
            {...register(`date`)}
            value={selectedDate}
           
          />
        )}
      />

      <CalendarWrapper>
        <Calendar
          // selected={field.value}
          //   onChange={(date: any) => {
          //     console.log(`Date`, date);

          //     setSelectedDate(date);
          //     // setValue(`date`, date);
          //     return field.onChange(date);
          //   }}
          // value={field.value}
          onDayClick={handleCalendarDayClick}
          formattedDate={formattedDate}
          setFormattedDate={setFormattedDate}
          specialization={specialization}
          setAvalibleTimeRange={setAvalibleTimeRange}
          setSelectedDate={setSelectedDate}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        {/* <Controller
                    control={control}
                    name="date1"
                    render={({ field }) => (
                        <Calendar
                            selected={field.value}
                            //   onChange={(date: any) => {
                            //     console.log(`Date`, date);

                            //     setSelectedDate(date);
                            //     // setValue(`date`, date);
                            //     return field.onChange(date);
                            //   }}
                            value={field.value}
                            onDayClick={handleCalendarDayClick}
                            formattedDate={formattedDate}
                            setFormattedDate={setFormattedDate}
                            specialization={specialization}
                            setAvalibleTimeRange={setAvalibleTimeRange}
                            setSelectedDate={setSelectedDate}
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                        />
                    )}
                /> */}
      </CalendarWrapper>

      {/* <Controller
        control={control}
        name="date-input"
        render={({ field }) => (
          <DatePicker
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value}
            // selected={date}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
          />
        )}
      /> */}

      <AppointmentTime
        control={control}
        errors={errors}
        formattedTime={formattedTime}
        setFormattedTime={setFormattedTime}
        avalibleTimeRange={avalibleTimeRange}
      />

      <FormFooter>
        <FormInfo>
          <YouSelected>{t('BookAppointment.youSelected')}</YouSelected>
          {formattedDate && (
            <SelectedDayTime>
              {t('BookAppointment.date')}
              <span>{formattedDate} </span>
              {formattedTime && <span>{formattedTime}</span>}
            </SelectedDayTime>
          )}
        </FormInfo>
        <BntWrapper>
          <StepBtn
            onClick={() => {
              setStep(true);
            }}
            disabled={!isValid || selectedDay === null}
          >
            {' '}
            {t('BookAppointment.nextStep')}
            <ArrowRight />
          </StepBtn>
        </BntWrapper>
      </FormFooter>
    </>
  );
};

export default FirstStepAppointment;
