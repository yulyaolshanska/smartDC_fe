import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './slices/ExampleSlice';

export const store = configureStore({
  reducer: {
    exampleSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
