import { createSlice } from '@reduxjs/toolkit';
import VideoClient from '@zoom/videosdk';

const initialState = {};

const ZoomSlice = createSlice({
  name: 'zoom',
  initialState,
  reducers: {},
});

export const { reducer: zoomReducer, actions: zoomActions } = ZoomSlice;
