import { configureStore } from '@reduxjs/toolkit';
import signUp from '@redux/slices/auth/signUp';
import login from './slices/login';

export const store = configureStore({
  reducer: {
    login,
    signUp
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
