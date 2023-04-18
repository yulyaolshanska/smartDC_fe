import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

const selectSignUp = createSelector(
  (state: RootState) => state,
  (state) => state.signUp,
);
export default selectSignUp;
