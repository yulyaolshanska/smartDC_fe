import { Socket, io } from 'socket.io-client';
import { store } from '@redux/store';
import { socketAppointmentActions } from '@redux/slices/socketAppointmentsSlice';
import cookie from 'utils/functions/cookies';

<<<<<<< HEAD
=======
// not in use

type CreateSocketOptions = {
  socketIOUrl: string;
  state: any;
  actions: any;
};

>>>>>>> e131e8a8c60813053615f3c6d351ce1a4590c1d8
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

<<<<<<< HEAD
=======
  socket.on('connect', () => {});

>>>>>>> e131e8a8c60813053615f3c6d351ce1a4590c1d8
  socket.on('appointment_update', (nextAppointment) => {
    dispatch(socketAppointmentActions.updateNextAppointment(nextAppointment));
  });

  return socket;
};
