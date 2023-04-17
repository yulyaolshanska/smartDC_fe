import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

export const selectSignUp = createSelector(
  (state: RootState) => state,
  (state) => state.signUp,
);
