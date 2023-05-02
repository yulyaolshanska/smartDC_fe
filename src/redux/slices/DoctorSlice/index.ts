import cookie from 'utils/functions/cookies';
import { Dispatch, createSlice } from '@reduxjs/toolkit';

import { persistor } from '@redux/store';
import DoctorInitialState from '@redux/slices/DoctorSlice/types';

const initialState: DoctorInitialState = {};

const doctorSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    getDoctor(state, action) {
      return { ...state, ...action.payload };
    },
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      cookie.delete('accessToken');
      return initialState;
    },
  },
});

export const { reducer: doctorReducer, actions: doctorActions } = doctorSlice;

export const clearPersist = () => async (dispatch: Dispatch) => {
  dispatch(doctorActions.logout());
  await persistor.purge();
};
