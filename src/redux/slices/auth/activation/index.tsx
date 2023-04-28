import { createSlice } from '@reduxjs/toolkit';
import ActivationInitialState from '@redux/slices/auth/activation/types';

const initialState: ActivationInitialState = {
  isLoading: false,
  isSuccess: false,
};

const activationAccount = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
});

export const {
  reducer: activationAccountReducer,
  actions: activationAccountActions,
} = activationAccount;
