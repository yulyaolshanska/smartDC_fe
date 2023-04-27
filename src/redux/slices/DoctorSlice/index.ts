import cookie from 'utils/functions/cookies';
import { createSlice } from '@reduxjs/toolkit';

import { persistor } from '@redux/store';
import DoctorInitialState from './types';

const initialState: DoctorInitialState = {
  address: undefined,
  birthDate: undefined,
  city: undefined,
  country: undefined,
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
    logout() {
      localStorage.clear();
      cookie.delete('accessToken');
      persistor.purge();
      return initialState;
    },
  },
});

export const { reducer: doctorReducer, actions: doctorActions } = doctorSlice;
