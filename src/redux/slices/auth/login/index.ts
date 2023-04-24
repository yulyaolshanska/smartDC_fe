import { createSlice } from '@reduxjs/toolkit';

const login = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    isLoading: false,
    token: null,
    error: null,
  },
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
