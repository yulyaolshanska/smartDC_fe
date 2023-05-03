import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CancelButton,
  SendButton,
  ButtonContainer,
} from '@components/general/styles';
import { Form, InputInlineContainer, Text } from '@components/Patient/styles';
import { AppointmentFormValues, IPatient } from '@components/general/type';
import { patientSchema } from '@validation/patient.validate';
import { PATH } from '@router/index';
import { useNavigate } from 'react-router-dom';
import SpecializationInput from '@components/Appointment/SpecializationSelect';
import Calendar from '@components/Appointment/Calendar';
import AppointmentTime from '@components/Appointment/TimeSelect';

import { patientApi } from 'services/PatientService';
import { Controller } from 'react-hook-form';
import CalendarTest from '@components/Appointment/CalendarTests';

const BookAppointmentForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  console.log(`formattedTime`, formattedTime);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<AppointmentFormValues>({
    mode: 'onChange',
    defaultValues: {
      specialization: '',
      appointmentTimeRange: '',
      date: selectedDate,
    },

    // resolver: yupResolver(editPatientCardSchema),
  });

  //   const [updatePatient] = patientApi.useUpdatePatientMutation();

  const onSubmit = (data) => {
    console.log(data);
  };

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
    return formattedDate.replace(weekday, '').trim() + ', ' + weekday;
  }

  const handleCalendarDayClick = (day: Date, modifiers: Modifiers) => {
    if (modifiers.disabled) {
      return;
    }
    setSelectedDate(day);

    const appointmentDate = formatDate(day);
    setFormattedDate(appointmentDate);
    console.log(appointmentDate);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <SpecializationInput control={control} errors={errors} />

      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <Calendar
            onChange={(date) => field.onChange(date)}
            value={field.value}
            onDayClick={handleCalendarDayClick}
          />
        )}
      />

      <AppointmentTime
        control={control}
        errors={errors}
        formattedTime={formattedTime}
        onChange={(value) => {
          console.log(value);
          setFormattedTime(value);
        }}
      />

      <div>
        <p>{t('BookAppointment.youSelected')}</p>
        {formattedDate && (
          <p>
            {t('BookAppointment.date')}
            <span>{formattedDate} </span>
            {formattedTime && <span>{formattedTime}</span>}
          </p>
        )}
      </div>
      <ButtonContainer>
        <CancelButton to={PATH.DASHBOARD}>
          {t('Patient.cancel') ?? ''}
        </CancelButton>
        <SendButton
          disabled={!isValid}
          type="submit"
          value={t('Patient.save') ?? ''}
        />
      </ButtonContainer>
      <ToastContainer />
    </Form>
  );
};

export default BookAppointmentForm;
