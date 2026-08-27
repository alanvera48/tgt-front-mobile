import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {useCreateUserChamp} from '../../hooks/auth/queries';
import {COLORS} from '../../style/style';
import TextBase from '../../components/Base/TextBase';
import InputCustom from '../../components/Input/Input';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import AvatarCircleWithInitials from '../../components/Avatar/AvatarCircleWithInitials';
import InDashboard from '../../layouts/InDashboard';

// Formulario Crear CHAMP desde una cuenta de TRAINER
export default function CreateChamp() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
    },
    mode: 'onSubmit',
  });

  const firstName = watch('firstName');
  const lastName = watch('lastName');

  const {mutateAsync, isPending} = useCreateUserChamp();

  const onSubmit = async data => {
    mutateAsync(data, {
      onSuccess: result => {
        Toast.show({
          type: 'success',
          text1: 'Champ creado',
          text2: 'El champ ha sido creado correctamente',
        });
        navigation.navigate('ChampsStack', {screen: 'Champs'});
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response.data.message,
        });
      },
    });
  };

  return (
    <InDashboard>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.dark.background,
          paddingHorizontal: 30,
          paddingBottom: 70,
        }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View>
              <View style={{alignItems: 'center'}}>
                <AvatarCircleWithInitials
                  fullName={
                    firstName !== '' || lastName !== ''
                      ? `${firstName} ${lastName}`
                      : 'U U'
                  }
                />
              </View>
              <TextBase
                text={'Información Personal'}
                fontFamily={'AirbnbCereal_W_Bd'}
                size={12}
                color={COLORS.dark.textPrimary}
                style={{marginTop: 20, marginBottom: 10}}
              />
              <View style={styles.twoColumnsRow}>
                <View style={{width: 130}}>
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
                    rules={{required: 'El campo es requerido'}}
                  />
                </View>
                <View style={{width: 130}}>
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
                    rules={{required: 'El campo es requerido'}}
                  />
                </View>
              </View>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <InputCustom
                    placeholder="Nombre de usuario"
                    value={value}
                    onChangeText={value => onChange(value)}
                    error={errors.username}
                  />
                )}
                name="username"
                rules={{required: 'El campo es requerido'}}
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <InputCustom
                    placeholder="Email"
                    value={value}
                    onChangeText={value => onChange(value)}
                    error={errors.email}
                  />
                )}
                name="email"
                rules={{required: 'El campo es requerido'}}
              />
            </View>

            <View style={styles.bottomButtonContainer}>
              <ButtonGradient
                text={'Crear Champ'}
                onPress={handleSubmit(onSubmit)}
                isLoading={isPending}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </InDashboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
    paddingHorizontal: 30,
    height: Dimensions.get('window').height,
  },
  twoColumnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 20,
  },
});
