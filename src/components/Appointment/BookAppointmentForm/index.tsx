import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppointmentFormValues } from '@components/general/type';
import { FormWrapper } from '@components/Appointment/BookAppointmentForm/styles';
import FirstStepAppointment from '@components/Appointment/BookAppointmentForm/FirstStep';
import SecondStepAppointment from '@components/Appointment/BookAppointmentForm/SecondStep';
import appointmentSchema from '@validation/bookAppointment.validate';
import useAppointmentBookFormHook from 'hooks/BookAppointment/useAppointmentBookForm.hook';

interface AvalibleTimeRange {
  label: string;
  value: number;
}
const BookAppointmentForm: React.FC = () => {
  const {
    createBookAppointmentSchemaStepOne,
    createBookAppointmentSchemaStepTwo,
  } = appointmentSchema();

  const [formattedTime, setFormattedTime] = useState<string>('');
  const [specialization, setSpecialization] = useState<number | null>(null);
  const [step, setStep] = useState<boolean>(false);
  const [avalibleTimeRange, setAvalibleTimeRange] = useState<
    AvalibleTimeRange[]
  >([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<AppointmentFormValues>({
    mode: 'onChange',
    resolver: yupResolver(
      !step
        ? createBookAppointmentSchemaStepOne
        : createBookAppointmentSchemaStepTwo
    ),
  });

  const {
    selectedDate,
    setSelectedDate,
    formattedDate,
    setFormattedDate,
    handleCalendarDayClick,
    onSubmit,
  } = useAppointmentBookFormHook();

  return (
    <>
      <FormWrapper>
        {!step ? (
          <FirstStepAppointment
            formattedDate={formattedDate}
            setFormattedDate={setFormattedDate}
            handleCalendarDayClick={handleCalendarDayClick}
            formattedTime={formattedTime}
            setFormattedTime={setFormattedTime}
            isValid={isValid}
            control={control}
            errors={errors}
            setStep={setStep}
            setSpecialization={setSpecialization}
            specialization={specialization}
            setAvalibleTimeRange={setAvalibleTimeRange}
            avalibleTimeRange={avalibleTimeRange}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            register={register}
            setValue={setValue}
          />
        ) : (
          <SecondStepAppointment
            isValid={isValid}
            control={control}
            errors={errors}
            setStep={setStep}
            register={register}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            selectedDate={selectedDate}
            formattedTime={formattedTime}
            specialization={specialization}
          />
        )}
      </FormWrapper>{' '}
      <ToastContainer />
    </>
  );
};

export default BookAppointmentForm;
