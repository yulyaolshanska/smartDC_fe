import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './slices/ExampleSlice';
import login from './slices/login';

export const store = configureStore({
  reducer: {
    exampleSlice,
    login
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
}),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
