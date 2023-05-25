import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { socketAppointmentActions } from '@redux/slices/socketAppointmentsSlice';
import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import cookie from 'utils/functions/cookies';
import {
  CallInfo,
  DetailsBtn,
  DoctorInfo,
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

  const appointment = useAppSelector(
    (state) => state.socketAppointmenttReducer.nextAppointment
  );
  const doctor = useAppSelector((state) => state.doctorReducer);

  const handleAppointmentStarted = (data: Appointment) => {
    if (data) {
      dispatch(socketAppointmentActions.updateNextAppointment(data));
    }
  };

  const formattedCurrentTime = moment(new Date()).format(
    'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
  );
  const diffTime =
    new Date(appointment?.startTime).getTime() -
    new Date(formattedCurrentTime).getTime();
  const isOpenNotificatin = diffTime < 300000 && diffTime > 1000;
  const isOpenNotif =
    new Date().getTime() < new Date(appointment?.startTime).getTime() &&
    new Date().getTime() < new Date(appointment?.endTime).getTime();

  const deadline = new Date(appointment?.startTime);
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
  }, [appointment]);

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
      console.log('Connected ---------Jul');
    });

    socket.on('appointment_update', handleAppointmentStarted);

    return () => {
      socket.disconnect();
    };
  }, []);

  const getNotificationText = isOpenNotificatin
    ? ` You will have a video-call in ${`0${minutes}:${seconds}`} minutes
            with:`
    : `You currently have meeting with:`;

  const getPatient = useMemo(() => {
    const gender = appointment?.patient?.gender === female ? 'Ms.' : 'Mr.';
    return `${gender} ${appointment?.patient?.lastName}`;
  }, [appointment]);

  const getDoctor = useMemo(
    () =>
      `${t('Appointments.doctor')} ${
        doctor.role === local
          ? appointment.remoteDoctor.lastName
          : appointment.localDoctor.lastName
      }`,
    [appointment]
  );

  return (
    <>
      {isOpenNotif && (
        <NotificationContainer>
          <Info>
            <Title>{getNotificationText}</Title>
            <CallInfo>
              <PatientInfo
                to={`/patient/${appointment?.patient?.id}`}
              >{`${getPatient} and `}</PatientInfo>
              <DoctorInfo>{getDoctor}</DoctorInfo>
            </CallInfo>
          </Info>
          <DetailsBtn to={`/patient/${appointment?.patient?.id}`}>
            {isOpenNotificatin ? 'Details' : 'Go to the meeting room'}
          </DetailsBtn>
        </NotificationContainer>
      )}
    </>
  );
};
