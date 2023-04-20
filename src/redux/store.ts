import { configureStore } from '@reduxjs/toolkit';
import signUp from '@redux/slices/auth/signUp';
import forgotPassword from '@redux/slices/auth/forgotPassword';
import resetPassword from '@redux/slices/auth/resetPassword';
import login from '@redux/slices/auth/login';
import activationAccount from '@redux/slices/auth/activation';
import createPatient from '@redux/slices/patient/createPatient';

export const store = configureStore({
  reducer: {
    login,
    signUp,
    forgotPassword,
    resetPassword,
    activationAccount,
    createPatient,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
