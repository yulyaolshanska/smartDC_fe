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
import { Form } from '@components/Patient/styles';
import { AppointmentFormValues, IPatient } from '@components/general/type';
import patientSchema from '@validation/patient.validate';
import { PATH } from '@router/index';
import { useNavigate } from 'react-router-dom';
import SpecializationInput from '@components/Appointment/SpecializationSelect';
import Calendar from '@components/Appointment/Calendar';
import AppointmentTime from '@components/Appointment/TimeSelect';

import { patientApi } from 'services/PatientService';
import { Controller } from 'react-hook-form';
import CancelBtn from '@components/Appointment/CancelBtn';
import {
  FormWrapper,
  StepWrapper,
  Text,
  CalendarWrapper,
  FormFooter,
  FormInfo,
  BntWrapper,
  StepBtn,
  YouSelected,
  SelectedDayTime,
} from '@components/Appointment/BookAppointmentForm/styles';

import { ReactComponent as ArrowRight } from '@assets/arrowRight.svg';

const BookAppointmentForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [step, setStep] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
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
    console.log(appointmentDate);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <FormWrapper>
        <StepWrapper>
          <Text>{t('BookAppointment.stepOne')}</Text>
          <CancelBtn />
        </StepWrapper>
        <SpecializationInput control={control} errors={errors} />
        <CalendarWrapper>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <Calendar
                onChange={(date) => field.onChange(date)}
                value={field.value}
                onDayClick={handleCalendarDayClick}
                formattedDate={formattedDate}
              />
            )}
          />
        </CalendarWrapper>

        <AppointmentTime
          control={control}
          errors={errors}
          formattedTime={formattedTime}
          onChange={(value) => {
            console.log(value);
            setFormattedTime(value);
          }}
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
              onClick={() => console.log(`+`)}
              disabled={!isValid || !isDirty}
            >
              {' '}
              {t('BookAppointment.nextStep')}
              <ArrowRight />
            </StepBtn>
          </BntWrapper>
        </FormFooter>

        <button type="submit" onClick={handleSubmit(onSubmit)}>
          submit
        </button>
      </FormWrapper>
    </>
  );
};

export default BookAppointmentForm;
