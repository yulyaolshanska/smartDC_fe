import { createSlice } from '@reduxjs/toolkit';
import { ISignUp } from '@components/Auth/type';

const initialState: ISignUp = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: ''
};
const signUpFirstStepSlice = createSlice({
  name: 'signUpFirstStepSlice',
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
});
export const {
  setSignUpFirstStepData  } = signUpFirstStepSlice.actions;

export default signUpFirstStepSlice.reducer;
