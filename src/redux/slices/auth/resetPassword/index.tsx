import { createSlice } from '@reduxjs/toolkit';
import ResetPasswordInitialState from '@redux/slices/auth/resetPassword/types';

const initialState: ResetPasswordInitialState = {
  isLoading: false,
  isSuccess: false,
};

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
});

export const { reducer: resetPasswordReducer, actions: resetPasswordActions } =
  resetPassword;
