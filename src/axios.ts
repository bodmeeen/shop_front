import axios, { type InternalAxiosRequestConfig, type AxiosError } from 'axios';
import router from '@/router'; 

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Додавання токену до кожного запиту
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Глобальна обробка помилок (401 і 403)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('Неавторизовано. Очищаємо дані...');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        router.push('/login');
      }
      
      if (error.response.status === 403) {
        console.warn('Доступ заборонено (немає прав адміна).');
        router.push('/');
      }
    }
    return Promise.reject(error);
  }
);

export default api;