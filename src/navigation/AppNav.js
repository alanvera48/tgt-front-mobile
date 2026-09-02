import React, {useEffect, useState} from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {Linking} from 'react-native';
import AuthStack from './AuthStack';
import {useAuthStore} from '../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import AppStack from './AppStack';
import Loading from '../screens/Loading';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  requestUserPermission,
  getFcmToken,
  setupNotificationListeners,
} from '../services/pushNotifications';
import {useRegisterPushToken} from '../hooks/notifications/queries';

export const navigationRef = createNavigationContainerRef();

export default function AppNav() {
  const {isAuthenticated, isReady, verifyToken} = useAuthStore(
    useShallow(state => ({
      isAuthenticated: state.isAuthenticated,
      isReady: state.isReady,
      verifyToken: state.verifyToken,
    })),
  );
  const [deepLinkToken, setDeepLinkToken] = useState(null);
  const registerPushTokenMutation = useRegisterPushToken();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    (async () => {
      const granted = await requestUserPermission();
      if (!granted) {
        return;
      }
      const token = await getFcmToken();
      if (token) {
        registerPushTokenMutation.mutate(token);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    const unsubscribe = setupNotificationListeners(navigationRef);
    return unsubscribe;
  }, []);

  // Define linking configuration
  const linking = {
    prefixes: ['thegoodtrainer://', 'https://thegoodtrainer.com'],
    config: {
      screens: {
        // AuthStack: {
        // screens: {
        VerifyAccount: 'verify/:token',
        CompleteRegistration: 'complete-registration/:token',
        // },
        // },
      },
    },
  };

  // Handle initial URL when app opens from a deep link
  useEffect(() => {
    const getInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        handleDeepLink({url});
      }
    };

    // Set up event listener for deep links while the app is running
    const subscription = Linking.addEventListener('url', handleDeepLink);
    getInitialURL();

    return () => {
      subscription.remove();
    };
  }, []);

  // Extract token from deep link URL
  const handleDeepLink = ({url}) => {
    if (!url) {
      return;
    }

    // Handle verify link format: thegoodtrainer://verify/TOKEN
    const verify = 'verify/';
    if (url.includes(verify)) {
      const token = url.split(verify)[1];
      if (token) {
        setDeepLinkToken(token);
      }
    }

    // Handle complete registration link format if needed
    const completeReg = 'complete-registration/';
    if (url.includes(completeReg)) {
      const token = url.split(completeReg)[1];
      if (token) {
        setDeepLinkToken(token);
      }
    }
  };

  if (!isReady) {
    return (
      <GestureHandlerRootView>
        <Loading />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView>
      <NavigationContainer ref={navigationRef} linking={linking}>
        {isAuthenticated ? (
          <AppStack />
        ) : (
          <AuthStack verifyToken={deepLinkToken || verifyToken} />
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
