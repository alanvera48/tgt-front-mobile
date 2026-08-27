import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import TextBase from '../../components/Base/TextBase';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import InputCustom from '../../components/Input/Input';
import {Controller, useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {HStack} from '@gluestack-ui/themed';
import {useRequestConfirmationCode} from '../../hooks/auth/queries';
import {COLORS} from '../../style/style';

export default function ForgotPassword({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const {mutateAsync: requestCode, isPending} = useRequestConfirmationCode();

  const onSubmit = async data => {
    console.log(data, 'Dasdsadsadsada');

    try {
      await requestCode(data.email);
      Toast.show({
        type: 'success',
        text1: 'Código enviado',
        text2: 'Se ha enviado un código a tu correo electrónico',
      });
      navigation.navigate('VerificationCode', {email: data.email});
    } catch (error) {
      console.log(error, 'errorerror');

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.message || 'No se pudo enviar el código',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faChevronLeft} size={20} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.header}>
          <TextBase
            lines={3}
            text={'Recuperar contraseña'}
            style={styles.title}
          />
          <TextBase
            lines={2}
            text={
              'Ingresa tu correo y recibirás un código para restablecer tu contraseña'
            }
            style={styles.subtitle}
          />
        </View>

        <HStack
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          // height={'$full'}
        >
          <View style={[styles.inputContainer]}>
            <Controller
              control={control}
              render={({field}) => (
                <InputCustom
                  placeholder="Correo electrónico"
                  value={field.value}
                  onChangeText={field.onChange}
                  error={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
              rules={{
                required: 'El correo es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              }}
            />
          </View>

          <ButtonGradient
            isLoading={isPending}
            text={'Enviar código'}
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          />
        </HStack>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 8,
  },
  container: {
    // flex: 1,
    height: '100%',
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded',
    color: '#FFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFF',
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    height: 'auto',
  },
  button: {
    height: 56,
    marginTop: 12,
  },
});
