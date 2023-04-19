import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { signUpReducer } from '@redux/slices/auth/signUp';
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
import { loginReducer } from './slices/login';
import { navigationReducer } from './slices/NavigationSlice';
import { doctorReducer } from './slices/DoctorSlice';

const rootReducer = combineReducers({
  loginReducer,
  signUpReducer,
  navigationReducer,
  doctorReducer,
  [doctorApi.reducerPath]: doctorApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['navigationReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(doctorApi.middleware, authApi.middleware),
});
export const store = setupStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
