import { PersistGate } from 'redux-persist/integration/react';
import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { persistor, setupStore, store } from '@redux/store';

import AppRouter from './router';
import './translation/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log(import.meta.env.VITE_REACT_APP_SERVER_API_DEV);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Suspense fallback={null}>
            <AppRouter />
          </Suspense>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
