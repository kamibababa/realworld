import axios from 'axios';
import { storage } from '@/utils/storage';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API as string,
});

instance.interceptors.request.use(
  (config) => {
    const userStorage = storage('user');
    const token = userStorage.get();
    if (token) {
      const newConfig = { ...config };
      newConfig.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  ({ data }) => data,
  ({ message, response }) => Promise.reject(response ? response.data : message)
);

export default instance;
