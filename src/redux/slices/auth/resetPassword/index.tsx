import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  password: '',
  isLoading: false,
  isSuccess: false,
  error: null,
};

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
});

export const { reducer: resetPasswordReducer, actions: resetPasswordActions } =
  resetPassword;
