import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: Config.REACT_APP_BASE_URL,
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error retrieving token from AsyncStorage:', error);
      throw error;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const message =
      error?.response?.data?.message ||
      (error.code === 'ERR_NETWORK'
        ? 'No hay conexión a internet, revisa el estado de tu red.'
        : 'Algo salió mal, intenta más tarde.');
    return Promise.reject(new Error(message));
  },
);

export default axiosInstance;
