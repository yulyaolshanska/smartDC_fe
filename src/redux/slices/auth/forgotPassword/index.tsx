import { createSlice } from '@reduxjs/toolkit';
import ForgotPasswordInitialState from '@redux/slices/auth/forgotPassword/types';

const initialState: ForgotPasswordInitialState = {
  isLoading: false,
  isSuccess: false,
};

const forgotPassword = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
});

export const {
  reducer: forgotPasswordReducer,
  actions: forgotPasswordActions,
} = forgotPassword;
