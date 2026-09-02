import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
}

export async function getFcmToken() {
  try {
    return await messaging().getToken();
  } catch (error) {
    console.log('Error obteniendo el FCM token:', error);
    return null;
  }
}

function navigateFromNotification(navigationRef, remoteMessage) {
  const data = remoteMessage?.data;
  if (!navigationRef?.isReady?.() || !data) {
    return;
  }

  if (data.type === 'RUTINE_ASSIGNED' && data.rutineId) {
    navigationRef.navigate('RutineDetail', {id: data.rutineId});
  }
}

export function setupNotificationListeners(navigationRef) {
  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    console.log('Push recibido en foreground:', remoteMessage);
  });

  const unsubscribeOnOpened = messaging().onNotificationOpenedApp(
    remoteMessage => {
      navigateFromNotification(navigationRef, remoteMessage);
    },
  );

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        navigateFromNotification(navigationRef, remoteMessage);
      }
    });

  return () => {
    unsubscribeOnMessage();
    unsubscribeOnOpened();
  };
}
