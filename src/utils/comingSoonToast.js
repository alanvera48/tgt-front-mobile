import Toast from 'react-native-toast-message';

export const comingSoonToast = () => {
  Toast.show({
    type: 'info',
    text1: 'Información',
    text2: 'Esta funcionalidad estará disponible pronto!',
    visibilityTime: 2500,
  });
};
