import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ISignUp } from '@components/Auth/type';
import { authAPI, AuthCheckEmailDto, AuthSignUpDto } from '@api/auth/auth.api';

import { AxiosError } from 'axios';

const initialState: ISignUp = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  role: '',
  specialization: 0,
  gender: '',
  country: '',
  city: '',
  birthDate: '',
  address: '',
  timeZone: '',
  isLoading: false,
  token: null,
  error: null,
};

export const signUpQuery = createAsyncThunk(
  'signUp/signUpQuery',
  async (data: AuthSignUpDto, { rejectWithValue }) => {
    try {
      return await authAPI.signUp(data);
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
  },
);

export const checkEmailQuery = createAsyncThunk(
  'signUp/signUpQuery',
  async (data: AuthCheckEmailDto, { rejectWithValue }) => {
    try {
      return await authAPI.checkEmail(data);
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
  },
);

const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setSignUpFirstStepData(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
  },
  extraReducers: {
    [signUpQuery.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signUpQuery.fulfilled.type]: (state, action) => {
      state.token = action.payload.accessToken;
      state.error = null;
      state.isLoading = false;
    },
    [signUpQuery.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [checkEmailQuery.pending.type]: (state) => {
      state.isLoading = true;
    },
    [checkEmailQuery.fulfilled.type]: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    [checkEmailQuery.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { reducer: signUpReducer, actions: signUpActions } = signUp;
