import React, {useState} from 'react';
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
import {
  faChevronLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import Toast from 'react-native-toast-message';
import {useChangePassword} from '../../hooks/auth/queries';
import {useForm, Controller} from 'react-hook-form';
import devConfig from '../../constants/devConfig';
import {COLORS} from '../../style/style';

const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const ResetNewPassword = ({navigation, route}) => {
  const {email, code} = route.params;
  const [showPassword, setShowPassword] = useState(devConfig.showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {mutateAsync: changePassword, isPending} = useChangePassword();

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

  console.log(errors, 'errorserrors');
  console.log(code, 'codecode');

  const password = watch('password');

  const onSubmit = async data => {
    try {
      await changePassword({
        email,
        code,
        newPassword: data.password,
      });

      Toast.show({
        type: 'success',
        text1: '¡Éxito!',
        text2: 'Tu contraseña ha sido actualizada',
      });

      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    } catch (error) {
      console.log(error, 'errorerror');

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error?.response?.data?.message ||
          'No se pudo actualizar la contraseña',
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} size={20} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.title}>Nueva Contraseña</Text>
            <Text style={styles.subtitle}>
              ¡Casi terminamos! Crea una nueva contraseña para proteger tu
              cuenta
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
                  isLoading={isPending}
                  text="Actualizar contraseña"
                  onPress={handleSubmit(onSubmit)}
                  disabled={isPending}
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
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
    zIndex: 1,
    padding: 8,
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

export default ResetNewPassword;
