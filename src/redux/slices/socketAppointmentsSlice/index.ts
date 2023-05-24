import { createSlice } from '@reduxjs/toolkit';
import CreatePatientInitialState from '@redux/slices/patient/createPatient/types';

const initialState = { nextAppointment: null };

const socketAppointment = createSlice({
  name: 'socketAppointment',
  initialState,
  reducers: {
    updateNextAppointment(state, action) {
      state.nextAppointment = action.payload;
    },
  },
});

export const {
  reducer: socketAppointmenttReducer,
  actions: socketAppointmentActions,
} = socketAppointment;
