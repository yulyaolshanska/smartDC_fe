import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isLoading: false,
  isSuccess: false,
  error: null,
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
