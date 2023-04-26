import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { signUpReducer } from '@redux/slices/auth/signUp';
import forgotPassword from '@redux/slices/auth/forgotPassword';
import resetPassword from '@redux/slices/auth/resetPassword';
import { doctorApi } from 'services/DoctorService';
import { authApi } from 'services/AuthService';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginReducer } from '@redux/slices/auth/login';
import activationAccount from '@redux/slices/auth/activation';
import { noteApi } from 'services/NoteService';
import { navigationReducer } from './slices/NavigationSlice';
import { doctorReducer } from './slices/DoctorSlice';
import { noteFilterReducer } from './slices/NoteFilterSlice';

const rootReducer = combineReducers({
  loginReducer,
  signUpReducer,
  navigationReducer,
  doctorReducer,
  forgotPassword,
  resetPassword,
  activationAccount,
  noteFilterReducer,
  [noteApi.reducerPath]: noteApi.reducer,
  [doctorApi.reducerPath]: doctorApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'navigationReducer',
    'activationAccount',
    'resetPassword',
    'forgotPassword',
    'loginReducer',
    'signUpReducer',
    'noteFilterReducer',
    'authApi',
    'noteApi',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(doctorApi.middleware, authApi.middleware, noteApi.middleware),
});
export const store = setupStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
