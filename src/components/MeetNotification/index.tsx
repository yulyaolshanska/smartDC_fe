import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { socketAppointmentActions } from '@redux/slices/socketAppointmentsSlice';
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
import { Appointment } from 'services/types/appointment.type';
import { local } from '@constants/other';
import { female } from '@constants/patient';
import { notificationCurrentTime } from '@constants/format';
import { fiveMinutes, sec } from '@constants/notification';

const token = cookie.get('accessToken');

export const MeetNotification = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState(0);

  const { patient, startTime, endTime, remoteDoctor, localDoctor } =
    useAppSelector((state) => state.socketAppointmentReducer.nextAppointment);
  const doctor = useAppSelector((state) => state.doctorReducer);

  const formattedCurrentTime = moment().format(notificationCurrentTime);
  const diffTimeStart =
    new Date(startTime).getTime() - new Date(formattedCurrentTime).getTime();
  const diffTimeEnd =
    new Date(endTime).getTime() - new Date(formattedCurrentTime).getTime();
  const isTimerRun = diffTimeStart < fiveMinutes && diffTimeStart > sec;
  const isMeetInProgress = diffTimeEnd > 0 && diffTimeEnd <= fiveMinutes;
  const isNotifOpen = isTimerRun || isMeetInProgress;

  const deadline = new Date(startTime);
  const diff = deadline.getTime() - new Date().getTime() || 0;
  const minutes = diff > 0 ? Math.floor(timer / 60) % 60 : 0;
  const seconds = diff > 0 ? Math.floor(timer % 60) : 0;

  useEffect(() => {
    const diffStart = deadline.getTime() - new Date().getTime();
    const diffEnd = new Date(endTime).getTime() - new Date().getTime();

    const initialTimer = isTimerRun
      ? Math.floor(diffTimeStart / sec)
      : Math.floor(diffEnd / sec);

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, sec);

    if (initialTimer > 0) {
      setTimer(initialTimer);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, endTime, diffTimeStart, diffTimeEnd]);

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

  const getNotificationText = isTimerRun
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
      {isNotifOpen && (
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
            {isTimerRun
              ? `${t('Notification.details')}`
              : `${t('Notification.goToMeetingRoom')}`}
          </DetailsBtn>
        </NotificationContainer>
      )}
    </>
  );
};
