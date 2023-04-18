const api = import.meta.env.VITE_REACT_APP_SERVER_API_DEV;

const API_URLS = {
  signUp: `${api}auth/registration`,
  login: `${api}auth/login`,
  base: api,
};

export default API_URLS;
