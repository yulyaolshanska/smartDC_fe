import { createSlice } from '@reduxjs/toolkit';
import { DoctorSubmitValue } from '@components/Auth/SignUpSecondForm/types';

const initialState: DoctorSubmitValue = {
  role: '',
  specialization: '',
  gender: '',
  country: '',
  city: '',
  date_of_birth: '',
  address: '',
  timezone: '',
};
const signUpSecondStepSlice = createSlice({
  name: 'signUpSecondStepSlice',
  initialState,
  reducers: {
    setSignUpSecondStepData(state, action) {
      state.role = action.payload.role;
      state.specialization = action.payload.specialization;
      state.gender = action.payload.gender;
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.date_of_birth = action.payload.date_of_birth;
      state.address = action.payload.address;
      state.timezone = action.payload.timezone;
    }
  },
});
export const {
  setSignUpSecondStepData  } = signUpSecondStepSlice.actions;

export default signUpSecondStepSlice.reducer;
