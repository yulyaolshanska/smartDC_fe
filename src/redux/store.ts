import { configureStore } from '@reduxjs/toolkit';
import signUp from '@redux/slices/auth/signUp';
import forgotPassword from '@redux/slices/auth/forgotPassword';
import resetPassword from '@redux/slices/auth/resetPassword';

export const store = configureStore({
  reducer: {
    signUp,
    forgotPassword,
    resetPassword,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
