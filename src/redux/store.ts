import { configureStore, combineReducers } from '@reduxjs/toolkit';
import signUp from '@redux/slices/auth/signUp';
import { doctorApi } from 'services/DoctorService';
import { authApi } from 'services/AuthService';
import login from './slices/login';
import { navigationReducer } from './slices/NavigationSlice';
import { doctorReducer } from './slices/DoctorSlice';

const rootReducer = combineReducers({
  login,
  signUp,
  navigationReducer,
  doctorReducer,
  [doctorApi.reducerPath]: doctorApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(doctorApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
