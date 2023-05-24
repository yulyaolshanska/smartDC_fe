import { AppointmentFormValues } from '@components/general/type';
import { useAppDispatch } from '@redux/hooks';
import { socketAppointmentActions } from '@redux/slices/socketAppointmentsSlice';
import { useEffect } from 'react';
import { createSocketWithHandlers } from '@components/Zoom/socket-io';
import { io, Socket } from 'socket.io-client';
import cookie from 'utils/functions/cookies';

const token = cookie.get('accessToken');

const Scheduler = () => {
  const dispatch = useAppDispatch();
  const handleAppointmentStarted = (data) => {
    console.log('Appointment started. Displaying notification...', data);
    dispatch(socketAppointmentActions.updateNextAppointment(data));
  };

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
      console.log('Connected to the backend');
      console.log('123123');
    });

    socket.on('appointment_update', handleAppointmentStarted);

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div></div>;
};

export default Scheduler;
