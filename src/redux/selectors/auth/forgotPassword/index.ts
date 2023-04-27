import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

export const selectForgotPassword = createSelector(
  (state: RootState) => state,
  (state) => state.forgotPassword,
);

export const mock = '';
