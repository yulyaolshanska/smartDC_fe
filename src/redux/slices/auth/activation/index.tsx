import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthActivationDto, authAPI } from '@api/auth/auth.api';
import storage from 'redux-persist/lib/storage';
import { AxiosError } from 'axios';
import { persistReducer } from 'redux-persist';

const initialState = {
  isLoading: false,
  isSuccess: false,
  error: null,
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['isLoading'],
};

export const activationAccountQuery = createAsyncThunk(
  'activationAccount/activationAccountQuery',
  async (data: AuthActivationDto, { rejectWithValue }) => {
    try {
      return await authAPI.activation(data);
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

const activationAccount = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: {
    [activationAccountQuery.pending.type]: (state) => {
      state.isLoading = true;
    },
    [activationAccountQuery.fulfilled.type]: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.error = null;
    },
    [activationAccountQuery.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const persistedReducer = persistReducer(
  persistConfig,
  activationAccount.reducer
);

export default persistedReducer;
