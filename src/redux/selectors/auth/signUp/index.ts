import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

const selectSignUp = createSelector(
  (state: RootState) => state,
  (state) => state.signUpReducer,
);
export default selectSignUp;
