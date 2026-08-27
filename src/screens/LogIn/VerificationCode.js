import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import Toast from 'react-native-toast-message';
import {
  useRequestConfirmationCode,
  useVerifyCode,
} from '../../hooks/auth/queries';
import {COLORS} from '../../style/style';

const CELL_COUNT = 6;

const VerificationCode = ({navigation, route}) => {
  const {email} = route.params;
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const {mutateAsync: requestCode, isPending: isResending} =
    useRequestConfirmationCode();
  const {mutateAsync: verifyCode, isPending: isVerifying} = useVerifyCode();

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = Array(CELL_COUNT)
      .fill()
      .map((_, i) => inputRefs.current[i] || React.createRef());
  }, []);

  // Handle input change
  const handleChange = (text, index) => {
    if (text.length > 1) {
      // If pasting multiple digits, distribute them
      const digits = text.split('').slice(0, CELL_COUNT - index);
      const newPin = [...pin];

      digits.forEach((digit, i) => {
        if (index + i < CELL_COUNT) {
          newPin[index + i] = digit;
        }
      });

      setPin(newPin);

      // Focus on the next empty input or the last one
      const nextIndex = Math.min(index + digits.length, CELL_COUNT - 1);
      if (nextIndex < CELL_COUNT) {
        inputRefs.current[nextIndex].focus();
      }
    } else {
      // Handle single digit input
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      // Auto-focus next input if a digit was entered
      if (text && index < CELL_COUNT - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
      // If current input is empty and backspace is pressed, focus previous input
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = pin.join('');
    if (code.length !== CELL_COUNT) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor ingresa los 6 dígitos del código',
      });
      return;
    }

    try {
      await verifyCode({
        email,
        code,
      });

      Toast.show({
        type: 'success',
        text1: 'Código verificado',
        text2: 'Ahora puedes crear tu nueva contraseña',
      });

      navigation.navigate('ResetNewPassword', {email, code});
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.response?.data?.message || 'Código inválido',
      });
    }
  };

  const handleResend = async () => {
    try {
      await requestCode(email);
      Toast.show({
        type: 'success',
        text1: 'Código enviado',
        text2: 'Se ha enviado un nuevo código a tu correo',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.message || 'No se pudo enviar el código',
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
            <Text style={styles.title}>Verificación</Text>
            <Text style={styles.subtitle}>
              Revisa tu bandeja de entrada. Te enviamos un código de 6 dígitos
              para verificar tu identidad.
            </Text>

            <View style={styles.pinContainer}>
              {pin.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)}
                  style={[styles.pinInput, digit && styles.pinInputFilled]}
                  value={digit}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  autoFocus={index === 0}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setPin(['', '', '', '', '', ''])}>
              <Text style={styles.clearButtonText}>Borrar código</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <ButtonGradient
                text={isVerifying ? 'Verificando...' : 'Verificar'}
                onPress={handleVerify}
                disabled={pin.some(digit => !digit) || isVerifying}
              />

              <TouchableOpacity
                style={[
                  styles.resendButton,
                  isResending && styles.resendButtonDisabled,
                ]}
                onPress={handleResend}
                disabled={isResending}>
                <Text style={styles.resendButtonText}>
                  {isResending ? 'Enviando...' : 'Reenviar código'}
                </Text>
              </TouchableOpacity>
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
  emailText: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  pinInput: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  pinInputFilled: {
    borderColor: '#FF6B00',
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
  },
  clearButton: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  clearButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    alignItems: 'center',
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendButtonText: {
    color: '#FF6B00',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificationCode;
