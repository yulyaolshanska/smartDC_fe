import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  gender: '',
  country: '',
  city: '',
  birthDate: '',
  address: '',
  timeZone: '',
  overview: '',
  isLoading: false,
  token: null,
  error: null,
};

const createPatient = createSlice({
  name: 'createPatient',
  initialState,
  reducers: {},
});

export const { reducer: createPatientReducer, actions: createPatientActions } =
  createPatient;
