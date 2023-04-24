import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  isLoading: false,
  isSuccess: false,
  error: null,
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
