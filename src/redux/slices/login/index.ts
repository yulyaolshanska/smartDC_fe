import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { AuthLoginDto, authAPI } from 'api/auth/auth.api';

export const loginQuery: any = createAsyncThunk(
    'login/loginQuery',
    async (data: AuthLoginDto, { rejectWithValue }) => {
      try {
        return await authAPI.login(data);
      } catch (err: any) {
        if (!err.response) {
          throw err;
        }

        return rejectWithValue(err.response.data);
      }
    },
);

const login = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    isLoading: false,
    token: JSON.parse(<string>localStorage.getItem('token')),
    error: null
  },
  reducers: {
    logout(state) {
      state.token = '';
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
      localStorage.setItem('token', JSON.stringify(state.token));
      state.error = null;
      state.isLoading = false;
    },
    [loginQuery.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default login.reducer;