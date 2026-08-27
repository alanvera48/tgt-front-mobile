import React, {useState} from 'react';
import {VStack} from '@gluestack-ui/themed';
import {Image, Platform, ScrollView, View} from 'react-native';
import {useOnboardingTrainer} from '../../../hooks/user/queries';
import TextBase from '../../../components/Base/TextBase';
import InputCustom from '../../../components/Input/Input';
import {BottomButtons} from './Gender';
import {DropdownInput} from '../../../components/DropdownInput/DropdownInput';
import InputDate from '../../../components/Input/InputDate';
import {useForm, Controller} from 'react-hook-form';
import {DropdownMultiInput} from '../../../components/DropdownMultiInput/DropdownMultiInput';
import {
  SPECIALTIES_MULTISELECT_OPTIONS,
  SEX_SELECT_OPTIONS,
  EXPERIENCE_YEARS_OPTIONS,
  PROVINCES_OPTIONS,
} from '../../../constants/inputs-options';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import Toast from 'react-native-toast-message';
import devConfig from '../../../constants/devConfig';

export default function GeneralTrainer({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      dateOfBirth: devConfig.dateOfBirth,
      gender: devConfig.gender,
      mobileNumber: devConfig.mobileNumber,
      specialties: devConfig.specialties,
      experienceYears: devConfig.experienceYears,
      address: devConfig.address,
      city: devConfig.city,
      zipCode: devConfig.zipCode,
      apartment: devConfig.apartment,
      province: devConfig.province,
    },
    mode: 'onSubmit',
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const placeholder = {
    label: 'Seleccionar',
    value: null,
  };
  const {mutateAsync: onboardingTrainerMutateAsync, isPending} =
    useOnboardingTrainer();

  const onSubmit = async data => {
    await onboardingTrainerMutateAsync(data, {
      onSuccess: result => {
        navigation.navigate('TrainerOnboarding', {screen: 'SelectGym'});
      },
      onError: error => {
        console.log(error, 'error');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Algo salió mal, por favor intenta de nuevo',
        });
      },
    });
  };

  const handleSelectItem = item => {
    setSelectedItems(prev => [...prev, item.value]);
  };

  const handleRemoveItem = item => {
    setSelectedItems(prev =>
      prev.filter(selectedItem => selectedItem !== item.value),
    );
  };

  return (
    <VStack flex={1} backgroundColor="#1C1C1E">
      {isPending && <LoadingScreen />}
      <ScrollView
        style={{
          paddingHorizontal: 20,
          paddingTop: 40,
        }}>
        <VStack alignItems="center">
          <Image
            source={require('../../../assets/image/logo.png')}
            style={{
              alignSelf: 'flex-end',
              width: 23,
              height: 43,
              marginBottom: 16,
              marginRight: 10,
            }}
            resizeMode="center"
          />
          <TextBase
            text={'Contanos más sobre vos!'}
            size={24}
            color={'#fff'}
            lines={2}
            style={{textAlign: 'center', marginBottom: 16}}
            fontFamily={
              Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded'
            }
          />
        </VStack>

        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
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
          </View>
          <View style={{width: '50%'}}>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <DropdownInput
                  items={SEX_SELECT_OPTIONS}
                  labelText={'Sexo'}
                  placeholder={placeholder}
                  value={value}
                  onValueChange={value => onChange(value)}
                  error={errors.gender}
                />
              )}
              name="gender"
              rules={{required: 'El sexo es requerido'}}
            />
          </View>
        </View>

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputCustom
              label={'Teléfono'}
              placeholder="Teléfono"
              value={value}
              keyboardType={'numeric'}
              onChangeText={value => onChange(value)}
              error={errors.mobileNumber}
              style={{marginTop: 10}}
            />
          )}
          name="mobileNumber"
          rules={{required: 'El teléfono es requerido'}}
        />

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <View style={{width: '50%'}}>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <DropdownMultiInput
                  label={'Especialidad'}
                  items={SPECIALTIES_MULTISELECT_OPTIONS}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  selectedItems={selectedItems}
                  handleSelectItem={item => {
                    handleSelectItem(item);
                    onChange([...selectedItems, item.value]);
                  }}
                  handleRemoveItem={item => {
                    handleRemoveItem(item);
                    onChange(
                      selectedItems.filter(selected => selected !== item.value),
                    );
                  }}
                  error={errors.specialties}
                />
              )}
              name="specialties"
              rules={{required: 'La especialidad es requerida'}}
            />
          </View>
          <View style={{width: '50%'}}>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <DropdownInput
                  items={EXPERIENCE_YEARS_OPTIONS}
                  labelText={'Años de experiencia'}
                  placeholder={placeholder}
                  value={value}
                  onValueChange={value => onChange(value)}
                  error={errors.experienceYears}
                />
              )}
              name="experienceYears"
              rules={{
                required: 'El campo es requerido',
                validate: value => value !== 0 || 'El campo es requerido',
              }}
            />
          </View>
        </View>

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputCustom
              label={'Dirección'}
              placeholder="Escriba su dirección"
              value={value}
              onChangeText={value => onChange(value)}
              error={errors.address}
              style={{marginVertical: 10}}
            />
          )}
          name="address"
          rules={{required: 'La dirección es requerida'}}
        />

        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <InputCustom
                  label={'Ciudad'}
                  placeholder="Escriba su ciudad"
                  value={value}
                  onChangeText={value => onChange(value)}
                  error={errors.city}
                  style={{marginVertical: 10}}
                />
              )}
              name="city"
              rules={{required: 'La ciudad es requerida'}}
            />
          </View>
          <View style={{width: '50%'}}>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <InputCustom
                  label={'Código postal'}
                  placeholder="Escriba su código"
                  keyboardType={'numeric'}
                  value={value}
                  onChangeText={value => onChange(value)}
                  error={errors.zipCode}
                  style={{marginVertical: 10}}
                />
              )}
              name="zipCode"
              rules={{required: 'El código postal es requerido'}}
            />
          </View>
        </View>

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputCustom
              label={'Piso y Depto (opcional)'}
              placeholder="Escriba su piso y depto"
              value={value}
              onChangeText={value => onChange(value)}
              error={errors.apartment}
              style={{marginVertical: 10}}
            />
          )}
          name="apartment"
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
              styles={{marginVertical: 10, marginBottom: 150}}
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
