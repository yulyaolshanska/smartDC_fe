import { createSlice } from '@reduxjs/toolkit';
import LoginInitialState from '@redux/slices/auth/login/types';

const initialState: LoginInitialState = {
  isLoading: false,
};

const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.error = null;
      state.isLoading = false;
      localStorage.clear();
    },
  },
});

export const { reducer: loginReducer, actions: loginActions } = login;
