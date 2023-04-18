import { createSlice } from '@reduxjs/toolkit';
import { doctorApi } from 'services/DoctorService';

const initialState = {
  address: undefined,
  birthDate: undefined,
  city: undefined,
  country: 'UA',
  email: undefined,
  firstName: undefined,
  gender: undefined,
  id: undefined,
  isVerified: undefined,
  lastName: undefined,
  phoneNumber: undefined,
  photoUrl: undefined,
  role: undefined,
  specialityId: undefined,
  timeZone: undefined,
};
const doctorSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    getDoctor(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { reducer: doctorReducer, actions: doctorActions } = doctorSlice;
