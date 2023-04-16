const api = import.meta.env.VITE_REACT_APP_SERVER_API_DEV;

export const API_URLS = {
  signUp: `${api}auth/registration`,
  forgotPassword: `${api}auth/forgotPassword`,
  resetPassword: `${api}auth/resetPassword`,
  base: api,
};
