import { configureStore } from '@reduxjs/toolkit';
import signUp from '@redux/slices/auth/signUp';

export const store = configureStore({
  reducer: {
    signUp,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
