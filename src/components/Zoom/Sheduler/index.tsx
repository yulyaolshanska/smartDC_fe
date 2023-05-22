import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const Scheduler = () => {
  const handleAppointmentStarted = () => {
    console.log('Appointment started. Displaying notification...');
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_REACT_APP_BASE_URL_SERVER); // Connect to the backend server

    socket.on('connect', () => {
      console.log('Connected to the backend');
      socket.emit('appointment'); // Emit the 'appointment' event to the server
      console.log('123123');
    });

    socket.on('appointmentStarted', handleAppointmentStarted);

    return () => {
      socket.disconnect(); // Disconnect from the server when the component unmounts
    };
  }, []);

  return <div></div>;
};

export default Scheduler;
