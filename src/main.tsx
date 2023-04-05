import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import './translation/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1073480873881-9nf8712q3lcihcc82954d2ldqvqkvoig.apps.googleusercontent.com">
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
