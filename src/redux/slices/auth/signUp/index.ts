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
const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState,
  reducers: {
    setAllData(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    }
  },
});
export const {
  setAllData  } = signUpSlice.actions;

export default signUpSlice.reducer;
