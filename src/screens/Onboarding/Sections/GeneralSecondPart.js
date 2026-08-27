import React from 'react';
import {Platform, ScrollView} from 'react-native';
import {VStack} from '@gluestack-ui/themed';
import TextBase from '../../../components/Base/TextBase';
import InputCustom from '../../../components/Input/Input';
import {BottomButtons} from './Gender';
import {DropdownInput} from '../../../components/DropdownInput/DropdownInput';
import {PROVINCES_OPTIONS} from '../../../constants/inputs-options';
import {useForm, Controller} from 'react-hook-form';
import {useCreateOnboardingUser} from '../../../hooks/user/queries';
import {useUserContext} from '../../../context/UserContext/UserProvider';
import {useAuthStore} from '../../../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import InputDate from '../../../components/Input/InputDate';
import devConfig from '../../../constants/devConfig';
import Toast from 'react-native-toast-message';

const FontAkira = Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded';

export default function GeneralSecondPart({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      dateOfBirth: devConfig.dateOfBirth,
      mobileNumber: devConfig.mobileNumber,
      address: devConfig.address,
      apartment: devConfig.apartment,
      zipCode: devConfig.zipCode,
      city: devConfig.city,
      province: devConfig.province,
    },
    mode: 'onSubmit',
  });

  const placeholder = {
    label: 'Selecciona una opción',
    value: null,
  };

  const {onboardingChamp} = useUserContext();
  const {userInfo, updateUserState} = useAuthStore(
    useShallow(state => ({
      userInfo: state.userInfo,
      updateUserState: state.updateUserState,
    })),
  );

  const {mutateAsync: createUserOnboarding, isPending} =
    useCreateOnboardingUser();

  const onSubmit = async data => {
    const {role, ...dataWithoutRole} = onboardingChamp;
    const dataToSubmit = {
      ...dataWithoutRole,
      ...data,
      dateOfBirth: devConfig.dateOfBirth || data.dateOfBirth,
    };
    await createUserOnboarding(dataToSubmit, {
      onSuccess: result => {
        updateUserState({
          ...userInfo,
          onboardingUser: result,
        });
        navigation.navigate('ExploreStack', {screen: 'Explore'});
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.message,
        });
      },
    });
  };

  return (
    <VStack flex={1} backgroundColor="#1C1C1E">
      <ScrollView
        style={{
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 100,
          marginBottom: 100,
        }}>
        {isPending && <LoadingScreen />}
        <VStack marginTop={50} alignItems="center">
          <TextBase
            text={'Contanos más sobre vos!'}
            size={24}
            color={'#fff'}
            lines={2}
            style={{textAlign: 'center', marginBottom: 20}}
            fontFamily={FontAkira}
          />
        </VStack>

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputDate
              label={'Fecha de nacimiento'}
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.dateOfBirth}
            />
          )}
          name="dateOfBirth"
          rules={{required: 'El campo es requerido'}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputCustom
              label={'Teléfono'}
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.mobileNumber}
              keyboardType={'numeric'}
              placeholder="Escriba su número de celular"
              style={{marginVertical: 10}}
            />
          )}
          name="mobileNumber"
          rules={{required: 'El campo es requerido'}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputCustom
              label={'Dirección'}
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.address}
              placeholder="Escriba su dirección"
              style={{marginVertical: 10}}
            />
          )}
          name="address"
          rules={{required: 'El campo es requerido'}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputCustom
              label={'Departamento (opcional)'}
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.apartment}
              placeholder="Escriba su piso y departamento"
              style={{marginVertical: 10}}
            />
          )}
          name="apartment"
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputCustom
              label={'Código postal'}
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.zipCode}
              placeholder="Escriba su código postal"
              keyboardType={'numeric'}
              style={{marginVertical: 10}}
            />
          )}
          name="zipCode"
          rules={{required: 'El campo es requerido'}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputCustom
              label={'Ciudad'}
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.city}
              placeholder="Escriba su ciudad"
              style={{marginVertical: 10}}
            />
          )}
          name="city"
          rules={{required: 'El campo es requerido'}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <DropdownInput
              items={PROVINCES_OPTIONS}
              labelText={'Provincia'}
              placeholder={placeholder}
              value={value}
              onValueChange={value => onChange(value)}
              error={errors.province}
              styles={{marginVertical: 10, marginBottom: 80}}
            />
          )}
          name="province"
          rules={{required: 'La provincia es requerida'}}
        />
      </ScrollView>
      <BottomButtons handleNextScreen={handleSubmit(onSubmit)} />
    </VStack>
  );
}
