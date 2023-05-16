import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppointmentFormValues } from '@components/general/type';
import { PATH } from '@router/index';
import { FormWrapper } from '@components/Appointment/BookAppointmentForm/styles';
import FirstStepAppointment from '@components/Appointment/BookAppointmentForm/FirstStep';
import SecondStepAppointment from '@components/Appointment/BookAppointmentForm/SecondStep';
import appointmentSchema from '@validation/bookAppointment.validate';
import { appointmentApi } from '../../../services/BookAppointmetService';
import { useAppSelector } from '@redux/hooks';

import { parse, format } from 'date-fns';
import { Modifiers } from 'react-day-picker';

interface DateObject {
    appointmentTimeRange: string;
    date: Date;
    doctor: string;
    specialization: number;
  }


const BookAppointmentForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    createBookAppointmentSchemaStepOne,
    createBookAppointmentSchemaStepTwo,
  } = appointmentSchema();

  const today = new Date();
  const { id: patientId } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | string>();
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [specialization, setSpecialization] = useState(null);
  const [step, setStep] = useState<boolean>(false);
  const [avalibleTimeRange, setAvalibleTimeRange] = useState([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [createAppointment] = appointmentApi.useCreateAppointmentMutation();
  const doctorData = useAppSelector((state) => state.doctorReducer);

  console.log(doctorData);
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<AppointmentFormValues>({
    mode: 'onChange',
    resolver: yupResolver(
      !step
        ? createBookAppointmentSchemaStepOne
        : createBookAppointmentSchemaStepTwo
    ),
  });

  function formatDate(date: Date): string {
    const options :Intl.DateTimeFormatOptions= {
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
    const appointmentDate = formatDate(day);
    setSelectedDate(day);
    setFormattedDate(appointmentDate);
  };

  const onSubmit = async (data: DateObject) => {
    // Розбиваємо рядок appointmentTimeRange на початковий і кінцевий час
    const [startTime, endTime] = data.appointmentTimeRange.split('-');

    // Форматуємо час в рядку, додаємо дату і перетворюємо на об'єкти типу Date
    const start = parse(
      `${format(data.date, 'yyyy-MM-dd')} ${startTime.trim()}`,
      'yyyy-MM-dd hh:mm aa',
      new Date()
    );
    const end = parse(
      `${format(data.date, 'yyyy-MM-dd')} ${endTime.trim()}`,
      'yyyy-MM-dd hh:mm aa',
      new Date()
    );

    console.log('data', data);
    //
    const appointmentInfo = {
      localDoctorId: Number(doctorData.id),
      remoteDoctorId: Number(data?.doctor),
      patientId: Number(patientId),
      zoomLink: 'https://zoom.us/meetingid',
      endTime: end.toISOString(),
      startTime: start.toISOString(),
    };
    console.log(`appointmentInfo`, data);

    await createAppointment(appointmentInfo);
    console.log(`createAppointment`, createAppointment);
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
            setSpecialization={setSpecialization}
            specialization={specialization}
            setAvalibleTimeRange={setAvalibleTimeRange}
            avalibleTimeRange={avalibleTimeRange}
            setSelectedDate={setSelectedDate}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            register={register}
            setValue={setValue}
            selectedDate={selectedDate}
          />
        ) : (
          <SecondStepAppointment
            isValid={isValid}
            isDirty={isDirty}
            control={control}
            errors={errors}
            setStep={setStep}
            register={register}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            selectedDate={selectedDate}
            formattedTime={formattedTime}
          />
        )}
      </FormWrapper>{' '}
      <ToastContainer />
    </>
  );
};

export default BookAppointmentForm;
