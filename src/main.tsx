import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import AppRouter from './router';
import './translation/i18n';
import { Provider } from 'react-redux';
import { setupStore } from '@redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log(import.meta.env.VITE_REACT_APP_SERVER_API_DEV);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={setupStore()}>
        <GoogleOAuthProvider clientId="1073480873881-9nf8712q3lcihcc82954d2ldqvqkvoig.apps.googleusercontent.com">
          <AppRouter />
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
