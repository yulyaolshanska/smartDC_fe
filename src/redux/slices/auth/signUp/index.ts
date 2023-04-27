import { createSlice } from '@reduxjs/toolkit';
import SignUpInitialState from '@redux/slices/auth/signUp/types';

const initialState: SignUpInitialState = {
  isLoading: false,
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
