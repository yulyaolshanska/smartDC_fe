import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '@redux/store';

export const selectSignUpFirstStepData = createSelector(
  (state: RootState) => state,
  (state) => state.signUpFirstStepSlice,
);

export const selectSignUpSecondStepData = createSelector(
  (state: RootState) => state,
  (state) => state.signUpSecondStepSlice,
);
