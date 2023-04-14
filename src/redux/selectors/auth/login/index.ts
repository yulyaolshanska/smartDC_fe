import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

export const selectLogin = createSelector(
  (state: RootState) => state,
  (state) => state.login,
);
