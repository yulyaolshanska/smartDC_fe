import axios from 'axios';

import cookie from 'utils/functions/cookies';

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_API_DEV,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${cookie.get('accessToken')}`;

  return config;
});

export default instance;
