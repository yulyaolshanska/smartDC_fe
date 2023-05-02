import { createSlice } from '@reduxjs/toolkit';
import AvailabilityInitialState from '@redux/slices/availabilitySlice/type';

const initialState: AvailabilityInitialState = { isLoading: false };

const getAvailability = createSlice({
  name: 'getAvailability',
  initialState,
  reducers: {},
});

export const { reducer: getAvailabilityReducer, actions: getAvailabilityActions } = getAvailability;
