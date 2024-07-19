import axios from 'axios';

const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

instance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // TODO: api url update
    const REFRESH_API_URL = '/refresh-token';

    return instance.post(REFRESH_API_URL).then((response) => {
      const { accessToken } = response.data;

      sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return instance(error.config);
    });
  }
);

export default instance;
