import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authAPI, AuthSignUpDto} from "../../../../api/auth/auth.api";
import {ISignUp} from "@components/Auth/type";

const initialState: ISignUp = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  role: '',
  specialization: '',
  gender: '',
  country: '',
  city: '',
  date_of_birth: '',
  address: '',
  time_zone: '',
  isLoading: false,
  token: JSON.parse(<string>localStorage.getItem('token')),
  error: null,
};


export const signUpQuery: any = createAsyncThunk(
    'signUp/signUpQuery',
    async (data: AuthSignUpDto, { rejectWithValue }) => {
      try {
        return await authAPI.signUp(data);
      } catch (err: any) {
        if (!err.response) {
          throw err;
        }

        return rejectWithValue(err.response.data);
      }
    },
);

const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setSignUpFirstStepData(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
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
      localStorage.setItem('token', JSON.stringify(state.token));
      state.error = null;
      state.isLoading = false;
    },
    [signUpQuery.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
export const {
  setSignUpFirstStepData  } = signUp.actions;

export default signUp.reducer;
