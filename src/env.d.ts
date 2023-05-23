interface ImportMetaEnv {
  readonly VITE_REACT_APP_SERVER_API_DEV: string;
  readonly VITE_REACT_APP_BASE_URL_SERVER: string;
  readonly VITE_REACT_APP_ACCESS_TOKEN_MAXAGE: number;
  readonly VITE_REACT_APP_GOOGLE_REDIRECT_URI: string;
  readonly VITE_REACT_APP_GOOGLE_ROOT_URL: string;
  readonly VITE_REACT_APP_GOOGLE_CLIENT_ID: string;
  readonly VITE_APPOINTMENT_NAMESPACE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
