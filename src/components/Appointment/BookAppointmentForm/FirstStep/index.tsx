import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import SpecializationInput from '@components/Appointment/SpecializationSelect';
import Calendar from '@components/Appointment/Calendar';
import AppointmentTime from '@components/Appointment/TimeSelect';
import { InputProps } from '@components/Patient/Inputs/type';
import { ReactComponent as ArrowRight } from '@assets/arrowRight.svg';
import CancelBtn from '@components/Appointment/CancelBtn';
import { date } from 'constants/other';
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
  HiddenInput,
} from '@components/Appointment/BookAppointmentForm/FirstStep/styles';

interface AvalibleTimeRange {
  label: string;
  value: number;
}

interface Props {
  formattedDate: string;
  handleCalendarDayClick: (day: Date) => void;
  setFormattedDate: React.Dispatch<React.SetStateAction<string>>;
  formattedTime: string;
  setFormattedTime: React.Dispatch<React.SetStateAction<string>>;
  isValid: boolean;
  control: Control;
  errors: FieldErrors;
  setStep: React.Dispatch<React.SetStateAction<boolean>>;
  setSpecialization: React.Dispatch<React.SetStateAction<number>>;
  specialization: number;
  setAvalibleTimeRange: React.Dispatch<
    React.SetStateAction<AvalibleTimeRange[]>
  >;
  avalibleTimeRange: AvalibleTimeRange[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedDay: Date | null;
  register: (value: Date | null) => void;
  setValue: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedDate: Date;
}

const FirstStepAppointment = ({
  formattedDate,
  setFormattedDate,
  handleCalendarDayClick,
  formattedTime,
  setFormattedTime,
  isValid,
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
}: InputProps & Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    setValue(`${date}`, selectedDate);
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
          <HiddenInput {...register(`${date}`)} value={selectedDate} />
        )}
      />
      <CalendarWrapper>
        <Calendar
          onDayClick={handleCalendarDayClick}
          formattedDate={formattedDate}
          setFormattedDate={setFormattedDate}
          specialization={specialization}
          setAvalibleTimeRange={setAvalibleTimeRange}
          setSelectedDate={setSelectedDate}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </CalendarWrapper>
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
