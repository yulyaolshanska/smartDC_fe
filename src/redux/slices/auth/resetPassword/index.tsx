import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
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
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response) {
          const { status, data } = err.response;
          return rejectWithValue({
            status: status.toString(),
            message: data.message || 'Something went wrong.',
          } as SerializedError);
        }
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
