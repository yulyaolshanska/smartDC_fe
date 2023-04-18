interface ImportMetaEnv {
  readonly VITE_REACT_APP_SERVER_API_DEV: string;
  readonly VITE_REACT_APP_BASE_URL_SERVER: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
