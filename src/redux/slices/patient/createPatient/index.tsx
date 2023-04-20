import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { AxiosError } from 'axios';
import { persistReducer } from 'redux-persist';
import { CreatePatientDto, patientAPI } from '@auth/patient.api';
import { signUpQuery } from '@redux/slices/auth/signUp';

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

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['isLoading'],
};

export const createPatientQuery = createAsyncThunk(
  'createPatient/createPatientQuery',
  async (data: CreatePatientDto, { rejectWithValue }) => {
    try {
      return await patientAPI.createPatient(data);
    } catch (err) {
      const error = err as Error;
      if (error instanceof AxiosError && error.response) {
        const { status, data } = error.response;
        return rejectWithValue({
          status: status.toString(),
          message: data.message || 'Something went wrong.',
        });
      }
      throw err;
    }
  }
);

const createPatient = createSlice({
  name: 'createPatient',
  initialState,
  reducers: {},
  extraReducers: {
    [createPatientQuery.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signUpQuery.fulfilled.type]: (state, action) => {
      state.token = action.payload.accessToken;
      state.error = null;
      state.isLoading = false;
    },
    [createPatientQuery.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, createPatient.reducer);

export default persistedReducer;
