import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {authenticateUser} from '../hooks/auth/endpoints';

export const useAuthStore = create(set => ({
  userInfo: null,
  trainerData: null,
  isAuthenticated: false,
  isFirstTime: false,
  isReady: false,
  verifyToken: null,

  checkAuth: () => set({isAuthenticated: true}),
  updateUserState: userInfo => set({userInfo}),
  setTrainerData: trainerData => set({trainerData}),
  setVerifyToken: verifyToken => set({verifyToken}),

  logOut: async () => {
    set({userInfo: null, isAuthenticated: false, trainerData: null});
    await AsyncStorage.removeItem('USER_TOKEN');
    await AsyncStorage.removeItem('USER_DATA');
  },

  // Se llama una sola vez al arrancar la app (ver App.tsx).
  initAuth: async () => {
    const startedAt = Date.now();
    const token = await AsyncStorage.getItem('USER_TOKEN');
    const isFirst = await AsyncStorage.getItem('USER_PASS_FIRST');
    set({isFirstTime: isFirst === 'true'});

    if (token) {
      try {
        const userInfo = await authenticateUser();
        set({userInfo, isAuthenticated: true});
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error de red',
          text2: 'Revisá tu conexión a internet',
        });
      }
    }

    // Aseguramos un mínimo de tiempo visible para el loader animado,
    // ya que sin token esta función resuelve casi instantáneamente.
    const MIN_LOADING_MS = 900;
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_LOADING_MS) {
      await new Promise(resolve =>
        setTimeout(resolve, MIN_LOADING_MS - elapsed),
      );
    }

    set({isReady: true});
  },
}));
