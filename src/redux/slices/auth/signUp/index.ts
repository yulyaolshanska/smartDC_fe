import { createSlice } from '@reduxjs/toolkit';
import { IAuth } from '@components/general/type';

const initialState: IAuth = {
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

const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setSignUpFirstStepData(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
  },
});

export const { reducer: signUpReducer, actions: signUpActions } = signUp;
