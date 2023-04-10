import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './slices/ExampleSlice';
import signUp from './slices/auth/signUp';

export const store = configureStore({
  reducer: {
    exampleSlice,
    signUp,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
