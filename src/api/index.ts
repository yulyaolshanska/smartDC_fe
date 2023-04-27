const api = import.meta.env.VITE_REACT_APP_SERVER_API_DEV;

const API_URLS = {
  signUp: `${api}auth/registration`,
  checkEmail: `${api}auth/checkEmail`,
  forgotPassword: `${api}auth/forgotPassword`,
  resetPassword: `${api}auth/resetPassword`,
  login: `${api}auth/login`,
  activation: (link: string) => `${api}auth/activation/${link}`,
  base: api,
};

export default API_URLS;
