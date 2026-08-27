/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import SplashScreen from 'react-native-splash-screen';
import {useAuthStore} from './src/store/authStore';
import AppNav from './src/navigation/AppNav';
import {UserLogic} from './src/context/UserContext/UserLogic';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/style/style';
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from './src/constants/googleAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
    },
  },
});

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  iosClientId: GOOGLE_IOS_CLIENT_ID,
  offlineAccess: false,
});

function App(): JSX.Element {
  const initAuth = useAuthStore(state => state.initAuth);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const setVerifyToken = useAuthStore(state => state.setVerifyToken);
  const [initialUrlHandled, setInitialUrlHandled] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    initAuth();
  }, [initAuth]);

  // Manejo manual del deep link si no está autenticado
  useEffect(() => {
    const handleUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url && !initialUrlHandled) {
        const match = url.match(/verify\/(.+)$/);
        if (match?.[1]) {
          const token = match[1];
          if (!isAuthenticated) {
            setVerifyToken(token);
            setInitialUrlHandled(true);
          }
        }
      }
    };

    handleUrl();
  }, [isAuthenticated, initialUrlHandled, setVerifyToken]);

  return (
    <UserLogic>
      <SafeAreaProvider style={{backgroundColor: 'black', paddingTop: 10}}>
        <QueryClientProvider client={queryClient}>
          <GluestackUIProvider config={config}>
            <AppNav />
          </GluestackUIProvider>
        </QueryClientProvider>
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </UserLogic>
  );
}

export default App;
