import { createSlice } from '@reduxjs/toolkit';

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
  limit: 5,
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
    setSkipAmount(state) {
      state.skipAmount += 5;
    },
    clearSkipAmount(state) {
      state.skipAmount = 0;
    },
  },
});

export const { reducer: noteFilterReducer, actions: noteFilterActions } =
  noteFilterSlice;
