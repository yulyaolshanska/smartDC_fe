import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { socketAppointmentActions } from '@redux/slices/socketAppointmentsSlice';
import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import cookie from 'utils/functions/cookies';
import {
  CallInfo,
  DetailsBtn,
  DoctorInfo,
  El,
  Info,
  NotificationContainer,
  PatientInfo,
  Title,
} from './styles';
import moment from 'moment';
import { Appointment } from 'services/types/appointment.type';
import { useTranslation } from 'react-i18next';
import { local } from '@constants/other';
import { female } from '@constants/patient';

const token = cookie.get('accessToken');

export const Notification = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState(0);

  const { patient, startTime, endTime, remoteDoctor, localDoctor } =
    useAppSelector((state) => state.socketAppointmenttReducer.nextAppointment);
  const doctor = useAppSelector((state) => state.doctorReducer);

  const formattedCurrentTime = moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const diffTime =
    new Date(startTime).getTime() - new Date(formattedCurrentTime).getTime();
  const isOpenNotificatin = diffTime < 300000 && diffTime > 1000;
  const isOpenNotif =
    new Date().getTime() < new Date(startTime).getTime() &&
    new Date().getTime() < new Date(endTime).getTime();

  const deadline = new Date(startTime);
  const diff = deadline.getTime() - new Date().getTime() || 0;
  const minutes = diff > 0 ? Math.floor(timer / 60) % 60 : 0;
  const seconds = diff > 0 ? Math.floor(timer % 60) : 0;

  useEffect(() => {
    const initialTimer = Number(diff / 1000);
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    if (initialTimer) {
      setTimer(initialTimer);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime]);

  useEffect(() => {
    const socket = io(
      `${import.meta.env.VITE_REACT_APP_BASE_URL_SERVER}appointment`,
      {
        auth: {
          token,
        },
        transports: ['websocket', 'polling'],
      }
    );

    socket.on('connect', () => {
      console.log('Connected ---------');
    });

    socket.on('appointment_update', handleAppointmentStarted);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAppointmentStarted = (data: Appointment) => {
    if (data) {
      dispatch(socketAppointmentActions.updateNextAppointment(data));
    }
  };

  const getNotificationText = isOpenNotificatin
    ? `${t('Notification.youHaveVideoCallIn')}  ${`${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`} minutes
            with:`
    : `${t('Notification.youCurrentlyHaveMeeting')}`;

  const getPatient = useMemo(() => {
    const gender =
      patient?.gender === female
        ? `${t('Notification.Ms')}`
        : `${t('Notification.Mr')}`;
    return `${gender} ${patient?.lastName}`;
  }, [patient]);

  const getDoctor = useMemo(
    () =>
      `${t('Appointments.doctor')} ${
        doctor.role === local ? remoteDoctor.lastName : localDoctor.lastName
      }`,
    [remoteDoctor, doctor, localDoctor]
  );

  return (
    <>
      {isOpenNotif && (
        <NotificationContainer>
          <Info>
            <Title>{getNotificationText}</Title>
            <CallInfo>
              <PatientInfo
                to={`/patient/${patient?.id}`}
              >{`${getPatient}  `}</PatientInfo>
              <El>{t('Notification.and')}</El>
              <DoctorInfo>{getDoctor}</DoctorInfo>
            </CallInfo>
          </Info>
          <DetailsBtn to={`/patient/${patient?.id}`}>
            {isOpenNotificatin
              ? `${t('Notification.details')}`
              : `${t('Notification.goToMeetingRoom')}`}
          </DetailsBtn>
        </NotificationContainer>
      )}
    </>
  );
};
