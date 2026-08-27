/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {COLORS} from '../../style/style';
import TextBase from '../../components/Base/TextBase';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import {useVerifyRegistration} from '../../hooks/auth/queries';

export default function VerifyAccount() {
  const navigation = useNavigation();
  const route = useRoute();
  const [token, setToken] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);

  const {mutateAsync: verifyRegistration, isPending} = useVerifyRegistration();

  // Function to verify token with API
  const verifyToken = async receivedToken => {
    if (!receivedToken) {
      setError('No se encontró un token de verificación');
      return;
    }

    try {
      // Llamar al endpoint de verificación
      const result = await verifyRegistration(receivedToken);
      console.log('Verificación exitosa:', result);
      setIsVerified(true);
    } catch (error) {
      console.log('Error de verificación:', error);
      setError(error.response?.data?.message || 'Error al verificar la cuenta');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Error al verificar la cuenta',
      });
    }
  };

  useEffect(() => {
    // Extract token from route params
    const receivedToken = route.params?.token;
    if (receivedToken) {
      console.log('Token recibido:', receivedToken);
      setToken(receivedToken);
      verifyToken(receivedToken);
    } else {
      setError('No se encontró un token de verificación');
    }
  }, []);

  const handleContinue = () => {
    if (isVerified) {
      // Navegar a la pantalla para completar el registro con la contraseña
      navigation.navigate('CompleteRegistration', {token});
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={styles.container}>
      {isPending ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.dark.primary} />
          <TextBase
            text={'Verificando tu cuenta...'}
            fontFamily={'AirbnbCereal_W_Md'}
            size={16}
            color={COLORS.dark.textPrimary}
            style={{marginTop: 20}}
          />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <TextBase
            text={isVerified ? '¡Cuenta verificada!' : 'Verificación de cuenta'}
            fontFamily={'AirbnbCereal_W_Bd'}
            size={24}
            color={'#fff'}
            style={{marginBottom: 20}}
          />

          <TextBase
            text={
              isVerified
                ? 'Tu cuenta ha sido verificada exitosamente. Ahora puedes configurar tu contraseña.'
                : error ||
                  'No se pudo verificar tu cuenta. Por favor, intenta de nuevo.'
            }
            fontFamily={'AirbnbCereal_W_Md'}
            size={16}
            lines={4}
            color={'#fff'}
            style={{marginBottom: 40, textAlign: 'center'}}
          />

          <ButtonGradient
            text={isVerified ? 'Continuar' : 'Volver al inicio de sesión'}
            onPress={handleContinue}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
    paddingHorizontal: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
