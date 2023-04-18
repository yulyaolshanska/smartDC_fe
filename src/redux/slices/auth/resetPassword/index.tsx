import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI, AuthResetPasswordDto } from '@api/auth/auth.api';
import storage from 'redux-persist/lib/storage';
import { AxiosError } from 'axios';
import { persistReducer } from 'redux-persist';

const initialState = {
  password: '',
  isLoading: false,
  isSuccess: false,
  error: null,
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['isLoading'],
};

export const resetPasswordQuery = createAsyncThunk(
  'resetPassword/resetPasswordQuery',
  async (data: AuthResetPasswordDto, { rejectWithValue }) => {
    try {
      return await authAPI.resetPassword(data);
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
  }
);

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: {
    [resetPasswordQuery.pending.type]: (state) => {
      state.isLoading = true;
    },
    [resetPasswordQuery.fulfilled.type]: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.error = null;
    },
    [resetPasswordQuery.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, resetPassword.reducer);

export default persistedReducer;
