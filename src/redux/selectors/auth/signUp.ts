import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '@redux/store';
import { ISignUp } from '@components/Auth/type';

export const selectAllData = createSelector(
  (state: RootState) => state,
  (state) => state.signUpSlice,
);
