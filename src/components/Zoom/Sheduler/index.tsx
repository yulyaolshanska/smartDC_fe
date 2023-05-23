import { useEffect } from 'react';
import { createSocketWithHandlers } from 'socket-io';
import { io, Socket } from 'socket.io-client';
import cookie from 'utils/functions/cookies';

const token = cookie.get('accessToken');

const Scheduler = () => {
  const handleAppointmentStarted = () => {
    console.log('Appointment started. Displaying notification...');
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
    ); // Connect to the backend server

    socket.on('connect', () => {
      console.log('Connected to the backend');
      console.log('123123');
    });

    socket.on('appointment_update', handleAppointmentStarted);

    return () => {
      socket.disconnect(); // Disconnect from the server when the component unmounts
    };
  }, []);

  return <div></div>;
};

export default Scheduler;
