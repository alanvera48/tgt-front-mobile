import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import Toast from 'react-native-toast-message';
import {
  useVerifyRegistration,
  useCompleteRegistration,
} from '../../hooks/auth/queries';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthStore} from '../../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import devConfig from '../../constants/devConfig';
import {COLORS} from '../../style/style';

const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const CompleteRegistration = ({navigation, route}) => {
  const {token} = route.params;
  const [showPassword, setShowPassword] = useState(devConfig.showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {updateUserState, checkAuth, setTrainerData} = useAuthStore(
    useShallow(state => ({
      updateUserState: state.updateUserState,
      checkAuth: state.checkAuth,
      setTrainerData: state.setTrainerData,
    })),
  );
  const {mutateAsync: verifyRegistration, isPending: isVerifying} =
    useVerifyRegistration();
  const {mutateAsync: completeRegistration, isPending: isCompleting} =
    useCompleteRegistration();

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      password: devConfig.password,
      confirmPassword: devConfig.password,
    },
  });

  const password = watch('password');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await verifyRegistration(token);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'El enlace de registro no es válido o ha expirado',
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }
    };

    verifyToken();
  }, [token, verifyRegistration, navigation]);

  const onSubmit = async data => {
    try {
      const response = await completeRegistration({
        token,
        password: data.password,
      });

      // Guardar el token
      await AsyncStorage.setItem('USER_TOKEN', response.token);
      updateUserState(response.user);
      checkAuth();

      console.log(response, 'responseresponse');

      Toast.show({
        type: 'success',
        text1: '¡Éxito!',
        text2: 'Tu cuenta ha sido creada exitosamente',
      });
      setTrainerData(true);

      // Navegar al onboarding
      navigation.reset({
        index: 0,
        routes: [{name: 'OnboardingChamp'}],
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error?.response?.data?.message || 'No se pudo completar el registro',
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          <View style={styles.content}>
            <Text style={styles.title}>Crear Contraseña</Text>
            <Text style={styles.subtitle}>
              Crea una contraseña segura para proteger tu cuenta
            </Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: 'La contraseña es requerida',
                    minLength: {
                      value: 8,
                      message: 'La contraseña debe tener al menos 8 caracteres',
                    },
                    pattern: {
                      value: PASSWORD_REGEX,
                      message:
                        'La contraseña debe contener al menos una mayúscula, una minúscula y un número o carácter especial',
                    },
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      style={[
                        styles.input,
                        errors.password && styles.inputError,
                      ]}
                      placeholder="Nueva contraseña"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      secureTextEntry={!showPassword}
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}>
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    size={20}
                    color="rgba(255, 255, 255, 0.5)"
                  />
                </TouchableOpacity>
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: 'Confirma tu contraseña',
                    validate: value =>
                      value === password || 'Las contraseñas no coinciden',
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      style={[
                        styles.input,
                        errors.confirmPassword && styles.inputError,
                      ]}
                      placeholder="Confirmar contraseña"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      secureTextEntry={!showConfirmPassword}
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                    size={20}
                    color="rgba(255, 255, 255, 0.5)"
                  />
                </TouchableOpacity>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              <Text style={styles.requirements}>La contraseña debe tener:</Text>
              <View style={styles.requirementsList}>
                <Text style={styles.requirementItem}>
                  • Mínimo 8 caracteres
                </Text>
                <Text style={styles.requirementItem}>
                  • Una letra mayúscula
                </Text>
                <Text style={styles.requirementItem}>
                  • Una letra minúscula
                </Text>
                <Text style={styles.requirementItem}>
                  • Un número o carácter especial
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <ButtonGradient
                  isLoading={isCompleting}
                  text="Crear cuenta"
                  onPress={handleSubmit(onSubmit)}
                  disabled={isCompleting || isVerifying}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  title: {
    fontFamily: 'AkiraExpanded-SuperBold',
    fontSize: 24,
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputError: {
    borderColor: '#FF4D4F',
  },
  errorText: {
    color: '#FF4D4F',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 15,
  },
  requirements: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 16,
  },
  requirementsList: {
    marginTop: 8,
    gap: 4,
  },
  requirementItem: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
});

export default CompleteRegistration;
