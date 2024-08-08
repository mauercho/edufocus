import axios from 'axios';
import useBoundStore from '../../store';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-type': 'application/json;charset=utf-8',
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const accessToken = useBoundStore.getState().token;

  if (accessToken) {
    config.headers.Authorization = `${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status !== 401 || error.request.responseURL.includes('/user/refresh')) {
      return Promise.reject(error);
    }

    const REFRESH_API_URL = '/user/refresh';

    return instance
      .post(REFRESH_API_URL)
      .then((response) => {
        const { accessToken } = response.data;

        console.log(accessToken);
        useBoundStore.setState({ token: accessToken });
        error.config.headers.Authorization = `${accessToken}`;
        return instance(error.config);
      })
      .catch((error) => {
        useBoundStore.setState({ token: null, userType: null });
        console.log(error);
        console.log('---로그아웃----');
        // TODO: redirect to home
        return Promise.reject(error);
      });
  }
);

export default instance;
