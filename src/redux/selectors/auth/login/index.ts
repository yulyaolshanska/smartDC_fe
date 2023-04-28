import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

const selectLogin = createSelector(
  (state: RootState) => state,
  (state) => state.loginReducer,
);

export default selectLogin;
