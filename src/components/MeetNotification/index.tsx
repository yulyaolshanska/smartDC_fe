import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { socketAppointmentActions } from '@redux/slices/socketAppointmentsSlice';
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
import { local } from '@constants/other';
import { female } from '@constants/patient';
import { fiveMinutes,sec, SEC_PER_MIN } from '@constants/notification';
import cookie from 'utils/functions/cookies';
import useNotificationText from 'utils/hooks/useNotificationText';
import { calculateInitialTimer, getDiffTime } from 'utils/functions/timeUtils';
import {  nextAppointment } from '@components/general/type';

const token = cookie.get('accessToken');

const MeetNotification = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState<number>(0);
  const minutes = Math.floor(timer / SEC_PER_MIN) % SEC_PER_MIN;
  const seconds = Math.floor(timer % SEC_PER_MIN);

  const { patient, startTime, endTime, remoteDoctor, localDoctor } =
  useAppSelector((state) => state.socketAppointmentReducer.nextAppointment);
  
const doctor = useAppSelector((state) => state.doctorReducer);

    useEffect(() => {
      const initialTimer = calculateInitialTimer(startTime);
  
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, sec);
  
      if (initialTimer > 0) {
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

    socket.on('appointment_update', handleAppointmentStarted);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAppointmentStarted = (data: nextAppointment) => {
    if (data) {
      dispatch(socketAppointmentActions.updateNextAppointment(data.nextAppointment));
    }
  };

  const { isTimerRun, getNotificationText } = useNotificationText(
    t,
    minutes,
    seconds,
    timer
  );

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

  const diffTimeEnd = useMemo(
    () => getDiffTime(endTime),
    [endTime, seconds]
  );

  const isMeetInProgress = useMemo(
    () => diffTimeEnd > 0 && diffTimeEnd <= fiveMinutes,
    [diffTimeEnd]
  );

  const isNotifOpen = useMemo(
    () => isTimerRun || isMeetInProgress,
    [isTimerRun, isMeetInProgress]
  );

  return (
    <>
      {isNotifOpen && (
        <NotificationContainer>
          <Info>
            <Title>{getNotificationText}</Title>
            <CallInfo>
              <PatientInfo to={`/patient/${patient?.id}`}>
                {`${getPatient}  `}
              </PatientInfo>
              <El>{t('Notification.and')}</El>
              <DoctorInfo>{getDoctor}</DoctorInfo>
            </CallInfo>
          </Info>
          <DetailsBtn to={`/patient/${patient?.id}`}>
            {`${t('Notification.details')}`}
          </DetailsBtn>
        </NotificationContainer>
      )}
    </>
  );
};

export default MeetNotification;
