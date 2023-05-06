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
import appointmentSchema from '@validation/bookAppointment.validate';
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

interface IProps {
  formattedDate: string;
  //   handleCalendarDayClick:function name(params:type) {

  //   }
  formattedTime: string;
  setFormattedTime: string;
  isValid: boolean;
  control: string;
  errors: string;
  setStep: string;
  step: boolean;
}

const FirstStepAppointment = ({
  formattedDate,
  handleCalendarDayClick,
  formattedTime,
  setFormattedTime,
  isValid,
  control,
  errors,
  setStep,
  step,
}: IProps) => {
  const { t } = useTranslation();
  console.log(`step`, step);
  return (
    <>
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
              onChange={(date: any) => field.onChange(date)}
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
          <StepBtn onClick={() => setStep(true)} disabled={!isValid}>
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
