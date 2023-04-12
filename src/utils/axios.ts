import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { toastWarning } from '@/utils/toasts';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  // if url do not end with / adds / to the end
  if (!config.url.endsWith('/') && !config.url.includes('?')) {
    config.url += '/';
  }

  const token = useAuthStore.getState().token;

  console.log(token);

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      useAuthStore.getState().logout();
    }

    if (error.response.status === 403) {
      toastWarning('Você não tem permissão para acessar essa informação.');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
