import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI, AuthForgotPasswordDto } from '@api/auth/auth.api';
import storage from 'redux-persist/lib/storage';
import { AxiosError } from 'axios';
import { persistReducer } from 'redux-persist';

const initialState = {
  email: '',
  isLoading: false,
  isSuccess: false,
  error: null,
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['isLoading'],
};

export const forgotPasswordQuery = createAsyncThunk(
  'forgotPassword/forgotPasswordQuery',
  async (data: AuthForgotPasswordDto, { rejectWithValue }) => {
    try {
      return await authAPI.forgotPassword(data);
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

const forgotPassword = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: {
    [forgotPasswordQuery.pending.type]: (state) => {
      state.isLoading = true;
    },
    [forgotPasswordQuery.fulfilled.type]: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
    },
    [forgotPasswordQuery.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, forgotPassword.reducer);

export default persistedReducer;
