import { useAppDispatch } from '@redux/hooks';
import { socketAppointmentActions } from '@redux/slices/socketAppointmentsSlice';
import { store } from '@redux/store';
import { Socket, io } from 'socket.io-client';
import cookie from 'utils/functions/cookies';

type CreateSocketOptions = {
  socketIOUrl: string;
  state: any;
  actions: any;
};

const socketIOUrl = `${import.meta.env.VITE_REACT_APP_BASE_URL_SERVER}${
  import.meta.env.VITE_APPOINTMENT_NAMESPACE
}`;

const dispatch = store.dispatch;

export const createSocketWithHandlers = (): Socket => {
  const token = cookie.get('accessToken');
  console.log(`Creating socket with token: ${token}`);
  const socket = io(socketIOUrl, {
    auth: {
      token,
    },
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log(`Connected with socket ID: ${socket.id}.`);
  });

  socket.on('appointment_update', (nextAppointment) => {
    console.log('event: appointment_update', nextAppointment);
    dispatch(socketAppointmentActions.updateNextAppointment(nextAppointment));
  });

  return socket;
};
