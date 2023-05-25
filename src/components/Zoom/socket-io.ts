import { useAppDispatch } from '@redux/hooks';
import { socketAppointmentActions } from '@redux/slices/socketAppointmentsSlice';
import { store } from '@redux/store';
import { Socket, io } from 'socket.io-client';
import cookie from 'utils/functions/cookies';

// not in use

type CreateSocketOptions = {
  socketIOUrl: string;
  state: any;
  actions: any;
};

const socketIOUrl = `${import.meta.env.VITE_REACT_APP_BASE_URL_SERVER}${
  import.meta.env.VITE_APPOINTMENT_NAMESPACE
}`;

const { dispatch } = store;

export const createSocketWithHandlers = (): Socket => {
  const token = cookie.get('accessToken');
  const socket = io(socketIOUrl, {
    auth: {
      token,
    },
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {});

  socket.on('appointment_update', (nextAppointment) => {
    dispatch(socketAppointmentActions.updateNextAppointment(nextAppointment));
  });

  return socket;
};
