import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { ISignUp } from '@components/Auth/type';
import { authAPI, AuthSignUpDto } from '@api/auth/auth.api';
import storage from 'redux-persist/lib/storage';
import { AxiosError } from 'axios';
import { plus } from '@constants/auth';
import { persistReducer } from 'redux-persist';

const initialState: ISignUp = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  role: '',
  specialization: 0,
  gender: '',
  country: '',
  city: '',
  birthDate: '',
  address: '',
  timeZone: '',
  isLoading: false,
  token: null,
  error: null,
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['isLoading'],
};

export const signUpQuery = createAsyncThunk(
  'signUp/signUpQuery',
  async (data: AuthSignUpDto, { rejectWithValue }) => {
    try {
      return await authAPI.signUp(data);
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

const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setSignUpFirstStepData(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phoneNumber = plus + action.payload.phoneNumber;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
  },
  extraReducers: {
    [signUpQuery.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signUpQuery.fulfilled.type]: (state, action) => {
      state.token = action.payload.accessToken;
      state.error = null;
      state.isLoading = false;
    },
    [signUpQuery.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { reducer: signUpReducer, actions: signUpActions } = signUp;
