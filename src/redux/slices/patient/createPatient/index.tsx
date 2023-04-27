import { createSlice } from '@reduxjs/toolkit';
import CreatePatientInitialState from '@redux/slices/patient/createPatient/types';

const initialState: CreatePatientInitialState = { isLoading: false };

const createPatient = createSlice({
  name: 'createPatient',
  initialState,
  reducers: {},
});

export const { reducer: createPatientReducer, actions: createPatientActions } =
  createPatient;
