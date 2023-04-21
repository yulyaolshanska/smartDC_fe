import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthLoginDto, authAPI } from '@auth/auth.api';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AxiosError } from 'axios';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['isLoading'],
};

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

const persistedReducer = persistReducer(persistConfig, login.reducer);

export default persistedReducer;
