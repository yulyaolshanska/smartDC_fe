import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
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
