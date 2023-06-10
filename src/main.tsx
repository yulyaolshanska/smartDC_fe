import { PersistGate } from 'redux-persist/integration/react';
import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { persistor, store } from '@redux/store';
import 'styles.scss';

import AppRouter from './router';
import './translation/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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
