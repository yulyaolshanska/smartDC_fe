import { useEffect, useMemo } from 'react';
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
import { Appointment } from 'services/types/appointment.type';
import { local } from '@constants/other';
import { female } from '@constants/patient';
import { fiveMinutes } from '@constants/notification';
import useTimer from 'utils/hooks/useTimer';
import cookie from 'utils/functions/cookies';
import useNotificationText from 'utils/hooks/useNotificationText';
import { getCurrentFormattedTime } from 'utils/functions/timeUtils';

const token = cookie.get('accessToken');

const MeetNotification = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { patient, startTime, endTime, remoteDoctor, localDoctor } =
    useAppSelector((state) => state.socketAppointmentReducer.nextAppointment);
    
  const doctor = useAppSelector((state) => state.doctorReducer);

  const { timer, minutes, seconds } = useTimer(startTime);

  const { isTimerRun, getNotificationText } = useNotificationText(
    t,
    minutes,
    seconds,
    timer
  );

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
    () =>
      new Date(endTime).getTime() -
      new Date(getCurrentFormattedTime()).getTime(),
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
