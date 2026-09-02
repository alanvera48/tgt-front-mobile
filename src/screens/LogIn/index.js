import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import TextBase from '../../components/Base/TextBase';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import SocialButton from '../../components/Buttons/SocialButton';
import {faApple} from '@fortawesome/free-brands-svg-icons';
import InputCustom from '../../components/Input/Input';
import InputPassword from '../../components/Input/InputPassword';
import {Controller, useForm} from 'react-hook-form';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import {
  useLogIn,
  useLogInWithGoogle,
  useLogInWithApple,
} from '../../hooks/auth/queries';
import {useAuthStore} from '../../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import Svg, {Path} from 'react-native-svg';
import GoogleIcon from '../../components/Icon/GoogleIcon';
import AuthBackground from '../../components/Background/AuthBackground';
import {HStack} from '@gluestack-ui/themed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import devConfig from '../../constants/devConfig';
import axiosInstance from '../../helpers/api';
import {COLORS} from '../../style/style';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function LogIn({navigation}) {
  const insets = useSafeAreaInsets();
  const {updateUserState, checkAuth} = useAuthStore(
    useShallow(state => ({
      updateUserState: state.updateUserState,
      checkAuth: state.checkAuth,
    })),
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: devConfig.email,
      password: devConfig.password,
    },
    mode: 'onChange',
  });

  const {mutateAsync: mutationLogin, isPending: isPendingLogin} = useLogIn();
  const {mutateAsync: mutationLoginGoogle, isPending: isPendingLoginGoogle} =
    useLogInWithGoogle();
  const {mutateAsync: mutationLoginApple, isPending: isPendingLoginApple} =
    useLogInWithApple();

  const handleAuthSuccess = data => {
    AsyncStorage.setItem('USER_PASS_FIRST', 'true');
    updateUserState(data.user);
    checkAuth();
    navigation.navigate(
      data.user.role === 'TRAINER' ? 'TrainerDashboard' : 'UserDashboard',
    );
  };

  const onSubmit = async user => {
    await mutationLogin(user, {
      onSuccess: handleAuthSuccess,
      onError: error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      },
    });
  };

  const onGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('No se pudo obtener el token de Google');
      }

      await mutationLoginGoogle(
        {credential: idToken, role: 'CHAMP'},
        {
          onSuccess: handleAuthSuccess,
          onError: error => {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: error.message,
            });
          },
        },
      );
    } catch (error) {
      if (
        isErrorWithCode(error) &&
        error.code === statusCodes.SIGN_IN_CANCELLED
      ) {
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo iniciar sesión con Google, intenta de nuevo.',
      });
    }
  };

  const onAppleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const {identityToken} = appleAuthRequestResponse;
      if (!identityToken) {
        throw new Error('No se pudo obtener el token de Apple');
      }

      await mutationLoginApple(
        {credential: identityToken, role: 'CHAMP'},
        {
          onSuccess: handleAuthSuccess,
          onError: error => {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: error.message,
            });
          },
        },
      );
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo iniciar sesión con Apple, intenta de nuevo.',
      });
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        styles.container,
        {paddingBottom: insets.bottom + 180},
      ]}>
      <AuthBackground />
      <View style={[styles.header, {paddingTop: insets.top + 12}]}>
        <View style={styles.titleContainer}>
          <TextBase
            text="Iniciar Sesión"
            color="#fff"
            size={32}
            fontFamily="AirbnbCereal_W_Bd"
          />
          <TextBase
            text="con tu"
            color={COLORS.dark.textMuted}
            size={16}
            fontFamily="AirbnbCereal_W_Bk"
            style={{marginRight: 4}}
          />
        </View>
        <View style={styles.subtitleContainer}>
          <TextBase
            text="Cuenta"
            color={COLORS.dark.textMuted}
            size={20}
            fontFamily="AirbnbCereal_W_Bk"
          />
        </View>
      </View>

      <View style={styles.socialButtons}>
        <SocialButton isLoading={isPendingLoginGoogle} onPress={onGoogleLogin}>
          <GoogleIcon />
        </SocialButton>
        {Platform.OS === 'ios' && (
          <SocialButton isLoading={isPendingLoginApple} onPress={onAppleLogin}>
            <FontAwesomeIcon icon={faApple} color="#fff" size={22} />
          </SocialButton>
        )}
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          render={({field}) => (
            <InputCustom
              placeholder="tuemail@mail.com"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.email}
              leftIcon="email"
            />
          )}
          name="email"
          rules={{required: 'Email es requerido'}}
        />

        <Controller
          control={control}
          render={({field}) => (
            <InputPassword
              placeholder="Contraseña"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.password}
              style={{marginTop: 16}}
            />
          )}
          name="password"
          rules={{required: 'Contraseña es requerida'}}
        />

        <TouchableOpacity
          hitSlop={10}
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotPassword}>
          <TextBase
            text="Olvidaste tu contraseña?"
            color={COLORS.dark.textMuted}
            size={14}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSection}>
        <Svg height={180} width={SCREEN_WIDTH} style={styles.bottomWave}>
          <Path
            d={`M0 50 Q ${
              SCREEN_WIDTH / 2
            } 0 ${SCREEN_WIDTH} 50 L${SCREEN_WIDTH} 180 L0 180 Z`}
            fill={COLORS.dark.backgroundCard}
          />
        </Svg>
        <HStack alignItems="center" justifyContent="center">
          <ButtonGradient
            text="Iniciar Sesion"
            onPress={handleSubmit(onSubmit)}
            isLoading={isPendingLogin}
            style={styles.loginButton}
          />
        </HStack>
        <TouchableOpacity
          style={[styles.registerButton, {bottom: 40 + insets.bottom}]}
          // TODO: Volver a habilitar selección de rol cuando agregemos versión mobile para trainers
          // onPress={() => navigation.navigate('Onboarding')}
          onPress={() => navigation.navigate('SignUp', {role: 'CHAMP'})}>
          <View style={styles.registerContent}>
            <TextBase
              text="No tenes una cuenta?"
              color="#ffff"
              size={16}
              fontFamily="AirbnbCereal_W_Bk"
            />
            <View style={styles.registerNowContainer}>
              <TextBase
                text="Registrate"
                color={COLORS.dark.primaryLight}
                size={16}
                fontFamily="AirbnbCereal_W_Bd"
                style={{marginRight: 8}}
              />
              <View style={styles.arrowContainer}>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  color="#9DA8C3"
                  size={16}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TextBase
          text={`${axiosInstance.defaults.baseURL} - 11-04-2026`}
          color={COLORS.dark.textMuted}
          size={12}
          style={{
            position: 'absolute',
            bottom: 10 + insets.bottom,
            alignSelf: 'center',
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark.background,
    padding: 24,
    flexGrow: 1,
  },
  header: {},
  titleContainer: {
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#323337',
  },
  form: {
    marginTop: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 12,
    marginBottom: 24,
  },
  loginButton: {
    top: 10,
    height: 56,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
  },
  registerButton: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
  },
  registerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  registerNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    backgroundColor: '#323337',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
