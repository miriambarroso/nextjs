import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  // if url do not end with / adds / to the end
  if (!config.url.endsWith('/')) {
    config.url += '/';
  }

  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

export default axiosInstance;
