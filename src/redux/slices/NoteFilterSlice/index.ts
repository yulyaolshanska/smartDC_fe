import cookie from 'utils/functions/cookies';
import { createSlice } from '@reduxjs/toolkit';

import { persistor } from '@redux/store';

export interface INoteFilter {
  sortBy: string;
  sortOrder: 'desc' | 'asc';
  searchString: '';
  limit: number;
  skipAmount: 0;
}

const initialState: INoteFilter = {
  searchString: '',
  sortBy: 'Date',
  sortOrder: 'desc',
  limit: 4,
  skipAmount: 0,
};
const noteFilterSlice = createSlice({
  name: 'noteFilter',
  initialState,
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setSearchString(state, action) {
      state.searchString = action.payload;
    },
    setSkipAmount(state, action) {
      state.skipAmount += action.payload;
    },
    clearSkipAmount(state) {
      state.skipAmount = 0;
    },
  },
});

export const { reducer: noteFilterReducer, actions: noteFilterActions } = noteFilterSlice;
