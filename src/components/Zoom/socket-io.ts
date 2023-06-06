import { Socket, io } from 'socket.io-client';
import { store } from '@redux/store';
import { socketAppointmentActions } from '@redux/slices/socketAppointmentsSlice';
import cookie from 'utils/functions/cookies';

const socketIOUrl = `${import.meta.env.VITE_REACT_APP_BASE_URL_SERVER}${
  import.meta.env.VITE_APPOINTMENT_NAMESPACE
}`;

const dispatch = store.dispatch;

export const createSocketWithHandlers = (): Socket => {
  const token = cookie.get('accessToken');
  const socket = io(socketIOUrl, {
    auth: {
      token,
    },
    transports: ['websocket', 'polling'],
  });

  socket.on('appointment_update', (nextAppointment) => {
    dispatch(socketAppointmentActions.updateNextAppointment(nextAppointment));
  });

  return socket;
};
