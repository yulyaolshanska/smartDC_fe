import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

export const selectResetPassword = createSelector(
  (state: RootState) => state,
  (state) => state.resetPassword,
);
