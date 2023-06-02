import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 'dashboard',
};
const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { reducer: navigationReducer, actions: navigationActions } =
  navigationSlice;
