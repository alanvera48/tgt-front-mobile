/* eslint-disable no-shadow */
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import InputCustom from '../../components/Input/Input';
import InputPassword from '../../components/Input/InputPassword';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import SocialButton from '../../components/Buttons/SocialButton';
import {faApple} from '@fortawesome/free-brands-svg-icons';
import {useForm, Controller} from 'react-hook-form';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import {
  useCreateUser,
  useLogInWithGoogle,
  useLogInWithApple,
} from '../../hooks/auth/queries';
import Toast from 'react-native-toast-message';
import {useAuthStore} from '../../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import TextBase from '../../components/Base/TextBase';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Svg, {Path} from 'react-native-svg';
import GoogleIcon from '../../components/Icon/GoogleIcon';
import AuthBackground from '../../components/Background/AuthBackground';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import devConfig from '../../constants/devConfig';
import {COLORS} from '../../style/style';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SignUp({navigation, route}) {
  const insets = useSafeAreaInsets();
  const {role} = route.params;
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
    watch,
    clearErrors,
  } = useForm({
    defaultValues: {
      firstName: devConfig.firstName,
      lastName: devConfig.lastName,
      email: devConfig.signUpEmail,
      password: devConfig.password,
      repeatPassword: devConfig.password,
      role: role,
    },
    mode: 'onSubmit',
  });

  const passwordVal = watch('password');
  const repeatPasswordVal = watch('repeatPassword');

  const {mutateAsync: mutationCreateUser, isPending: isPendingResponse} =
    useCreateUser();
  const {mutateAsync: mutationLoginGoogle, isPending: isPendingGoogle} =
    useLogInWithGoogle();
  const {mutateAsync: mutationLoginApple, isPending: isPendingApple} =
    useLogInWithApple();

  const onSubmit = async data => {
    const {repeatPassword, ...restOfDataUser} = data;

    const dataUser = {
      ...restOfDataUser,
      role,
      enabled: true,
    };
    mutationCreateUser(dataUser, {
      onSuccess: result => {
        updateUserState(result.createdUser);
        checkAuth();
        if (role === 'CHAMP') {
          navigation.navigate('OnboardingChamp', {screen: 'Gender'});
        } else {
          navigation.navigate('TrainerOnboarding', {
            screen: 'GeneralTrainer',
          });
        }
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error ?? 'Algo salió mal, por favor intenta de nuevo',
        });
      },
    });
  };

  const handleSocialAuthSuccess = data => {
    updateUserState(data.user);
    checkAuth();
    if (role === 'CHAMP') {
      navigation.navigate('OnboardingChamp', {screen: 'Gender'});
    } else {
      navigation.navigate('TrainerOnboarding', {
        screen: 'GeneralTrainer',
      });
    }
  };

  const onGoogleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('No se pudo obtener el token de Google');
      }

      await mutationLoginGoogle(
        {credential: idToken, role},
        {
          onSuccess: handleSocialAuthSuccess,
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
        text2: 'No se pudo continuar con Google, intenta de nuevo.',
      });
    }
  };

  const onAppleSignUp = async () => {
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
        {credential: identityToken, role},
        {
          onSuccess: handleSocialAuthSuccess,
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
        text2: 'No se pudo continuar con Apple, intenta de nuevo.',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          {paddingBottom: 220 + insets.bottom},
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled">
        <AuthBackground />
        {/* Header */}
        <View style={[styles.header, {paddingTop: insets.top + 10}]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <FontAwesomeIcon icon={faChevronLeft} size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <TextBase
            text="Crear Cuenta"
            color="#fff"
            size={32}
            fontFamily={'AirbnbCereal_W_Bd'}
          />
          <TextBase
            text="Ingresa tus datos para comenzar"
            color="#666"
            size={16}
            fontFamily={'AirbnbCereal_W_Bk'}
            style={styles.subtitle}
          />
        </View>

        {/* Social Login Section */}
        <View style={styles.socialSection}>
          <TextBase
            text="O regístrate con"
            color="#666"
            size={14}
            fontFamily={'AirbnbCereal_W_Bk'}
            style={styles.socialText}
          />
          <View style={styles.socialButtons}>
            <SocialButton
              size={50}
              isLoading={isPendingGoogle}
              onPress={onGoogleSignUp}>
              <GoogleIcon />
            </SocialButton>
            {Platform.OS === 'ios' && (
              <SocialButton
                size={50}
                isLoading={isPendingApple}
                onPress={onAppleSignUp}>
                <FontAwesomeIcon icon={faApple} color="#fff" size={20} />
              </SocialButton>
            )}
          </View>
          <View style={styles.divider}>
            <View style={styles.line} />
            <TextBase
              text="O"
              color="#666"
              size={14}
              fontFamily={'AirbnbCereal_W_Bk'}
              style={styles.orText}
            />
            <View style={styles.line} />
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.nameContainer}>
            <View style={styles.halfInput}>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <InputCustom
                    placeholder="Nombre"
                    value={value}
                    onChangeText={value => onChange(value)}
                    error={errors.firstName}
                  />
                )}
                name="firstName"
                rules={{required: 'El nombre es requerido'}}
              />
            </View>
            <View style={styles.halfInput}>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <InputCustom
                    placeholder="Apellido"
                    value={value}
                    onChangeText={value => onChange(value)}
                    error={errors.lastName}
                  />
                )}
                name="lastName"
                rules={{required: 'El apellido es requerido'}}
              />
            </View>
          </View>

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <InputCustom
                placeholder="Correo electrónico"
                value={value}
                error={errors.email}
                onChangeText={value => onChange(value)}
                style={styles.input}
              />
            )}
            name="email"
            rules={{
              required: 'El email es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            }}
          />

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <InputPassword
                placeholder="Contraseña"
                value={value}
                onChangeText={value => onChange(value)}
                error={errors.password}
                style={styles.input}
              />
            )}
            name="password"
            rules={{
              required: 'La contraseña es requerida',
              pattern: {
                value: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                message:
                  'La contraseña debe contener por lo menos una mayúscula, una minúscula, un número y un carácter especial',
              },
              validate: value => {
                if (value !== repeatPasswordVal) {
                  return 'Las contraseñas no coinciden';
                } else {
                  clearErrors('repeatPassword');
                }
              },
            }}
          />

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <InputPassword
                placeholder="Confirmar contraseña"
                value={value}
                onChangeText={value => onChange(value)}
                error={errors.repeatPassword}
                style={styles.input}
              />
            )}
            name="repeatPassword"
            rules={{
              required: 'La contraseña es requerida',
              pattern: {
                value: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                message:
                  'La contraseña debe contener por lo menos una mayúscula, una minúscula, un número y un carácter especial',
              },
              validate: value => {
                if (value !== passwordVal) {
                  return 'Las contraseñas no coinciden';
                } else {
                  clearErrors('password');
                }
              },
            }}
          />
        </View>

        {/* Footer Section */}
        <View style={[styles.footer, {paddingBottom: 20 + insets.bottom}]}>
          <Svg height="180" width={SCREEN_WIDTH} style={styles.bottomWave}>
            <Path
              d={`M0 50 Q ${
                SCREEN_WIDTH / 2
              } 0 ${SCREEN_WIDTH} 50 L${SCREEN_WIDTH} 180 L0 180 Z`}
              fill={COLORS.dark.backgroundCard}
            />
          </Svg>
          <ButtonGradient
            text="Crear Cuenta"
            onPress={handleSubmit(onSubmit)}
            isLoading={isPendingResponse}
            style={styles.button}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.loginLink}>
            <TextBase
              text="¿Ya tienes una cuenta? "
              color="#666"
              size={14}
              fontFamily={'AirbnbCereal_W_Bk'}
            />
            <TextBase
              text="Iniciar sesión"
              color={COLORS.dark.primary}
              size={14}
              fontFamily={'AirbnbCereal_W_Md'}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  subtitle: {
    marginTop: 4,
  },
  socialSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  socialText: {
    marginBottom: 8,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#666',
    opacity: 0.2,
  },
  orText: {
    marginHorizontal: 10,
  },
  formSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  halfInput: {
    flex: 1,
  },
  input: {
    marginBottom: 12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    position: 'absolute',
    height: 'auto',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    width: '100%',
    bottom: 24,
  },
  loginLink: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 180,
    marginTop: 'auto',
  },
});
