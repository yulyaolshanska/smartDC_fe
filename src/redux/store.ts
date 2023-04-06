import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './slices/ExampleSlice';
import signUpSlice from './slices/auth/signUp';

export const store = configureStore({
  reducer: {
    exampleSlice,
    signUpSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
