import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './slices/ExampleSlice';
import signUpFirstStepSlice from './slices/auth/signUpFirstStep';
import signUpSecondStepSlice from './slices/auth/signUpSecondStep';

export const store = configureStore({
  reducer: {
    exampleSlice,
    signUpFirstStepSlice,
    signUpSecondStepSlice

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
