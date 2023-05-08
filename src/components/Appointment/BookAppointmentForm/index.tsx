import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import appointmentSchema from '@validation/bookAppointment.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppointmentFormValues } from '@components/general/type';
import { PATH } from '@router/index';
import { FormWrapper } from '@components/Appointment/BookAppointmentForm/styles';
import FirstStepAppointment from '@components/Appointment/BookAppointmentForm/FirstStep';
import SecondStepAppointment from '@components/Appointment/BookAppointmentForm/SecondStep';

const BookAppointmentForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    createBookAppointmentSchemaStepOne,
    createBookAppointmentSchemaStepTwo,
  } = appointmentSchema();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [step, setStep] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
  } = useForm<AppointmentFormValues>({
    mode: 'onChange',
    defaultValues: {
      specialization: '',
      date: selectedDate.toISOString(),
      appointmentTimeRange: '',
      doctor: '',
    },

    resolver: yupResolver(
      !step
        ? createBookAppointmentSchemaStepOne
        : createBookAppointmentSchemaStepTwo
    ),
  });

  //   to format a date in "June 02, 2022, Monday" type
  function formatDate(date: Date): string {
    const options = {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('en-US', options);

    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    return formattedDate.replace(',' + weekday, '').trim() + ', ' + weekday;
  }

  const handleCalendarDayClick = (day: Date, modifiers: Modifiers) => {
    if (modifiers.disabled) {
      return;
    }
    setSelectedDate(day);

    const appointmentDate = formatDate(day);
    setFormattedDate(appointmentDate);
  };

  const onSubmit = (data) => {
    console.log(data);

    toast.success(t('BookAppointment.appointmentCreated'), {
      position: toast.POSITION.TOP_CENTER,
    });
    setTimeout(() => {
      navigate(PATH.DASHBOARD);
    }, 2000);
  };

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
          />
        )}
      </FormWrapper>{' '}
      <ToastContainer />
    </>
  );
};

export default BookAppointmentForm;
