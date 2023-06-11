import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const ZoomSlice = createSlice({
  name: 'zoom',
  initialState,
  reducers: {},
});

export const { reducer: zoomReducer, actions: zoomActions } = ZoomSlice;
