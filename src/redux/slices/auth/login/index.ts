import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthLoginDto, authAPI } from '@auth/auth.api';
import { AxiosError } from 'axios';

export const loginQuery = createAsyncThunk(
  'login/loginQuery',
  async (data: AuthLoginDto, { rejectWithValue }) => {
    try {
      return await authAPI.login(data);
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
  extraReducers: {
    [loginQuery.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loginQuery.fulfilled.type]: (state, action) => {
      state.token = action.payload.accessToken;
      state.error = null;
      state.isLoading = false;
    },
    [loginQuery.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { reducer: loginReducer, actions: loginActions } = login;
