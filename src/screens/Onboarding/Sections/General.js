import React from 'react';
import {Platform, ScrollView} from 'react-native';
import {VStack} from '@gluestack-ui/themed';
import {useForm, Controller} from 'react-hook-form';

import {BottomButtons} from './Gender';
import TextBase from '../../../components/Base/TextBase';
import {useUserContext} from '../../../context/UserContext/UserProvider';
import InputCustom from '../../../components/Input/Input';
import {DropdownInput} from '../../../components/DropdownInput/DropdownInput';
import {
  FAVORITE_TRAINING_PLACE,
  FOOD_PREFERENCES,
  FOOD_PER_DAY,
  TRAINING_DURATION,
  TRAININGS_PER_WEEK,
} from '../../../constants/inputs-options';
import devConfig from '../../../constants/devConfig';

const FontAkira = Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded';

const placeholder = {
  label: 'Selecciona una opción',
  value: null,
};

export default function General({navigation}) {
  const [generalValues, setGeneralValues] = React.useState({
    dietsPreferences: devConfig.dietPreferences,
    otherConsiderations: devConfig.otherConsiderations,
    foodPerDay: devConfig.foodPerDay,
    placeToTrain: devConfig.placeToTrain,
    lastInjuries: devConfig.lastInjuries,
    trainPerWeek: devConfig.trainPerWeek,
    trainDuration: devConfig.trainDuration,
  });
  const {handleOnboardingChampValues} = useUserContext();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      dietsPreferences: devConfig.dietPreferences,
      otherConsiderations: devConfig.otherConsiderations,
      foodPerDay: devConfig.foodPerDay,
      placeToTrain: devConfig.placeToTrain,
      lastInjuries: devConfig.lastInjuries,
      trainPerWeek: devConfig.trainPerWeek,
      trainDuration: devConfig.trainDuration,
    },
    mode: 'onSubmit',
  });

  const handleGeneralValues = (key, value) => {
    setGeneralValues(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onSubmit = async () => {
    handleOnboardingChampValues(generalValues);
    navigation.navigate('GeneralSecondPart');
  };

  return (
    <>
      <VStack flex={1} backgroundColor="#1C1C1E" paddingBottom={50}>
        <ScrollView
          style={{
            paddingHorizontal: 20,
            paddingTop: 40,
            marginBottom: 70,
          }}>
          <VStack marginTop={50} alignItems="center">
            <TextBase
              text={'CONTANOS UN POCO SOBRE VOS'}
              size={24}
              color={'#fff'}
              lines={2}
              style={{textAlign: 'center'}}
              fontFamily={FontAkira}
            />
            <TextBase
              text={
                'Estos datos generales nos ayudarán a ofrecerte la mejor experiencia posible.'
              }
              size={12}
              color={'#fff'}
              lines={3}
              style={{textAlign: 'center', marginTop: 10, marginBottom: 40}}
              fontFamily={FontAkira}
            />
          </VStack>

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <DropdownInput
                items={FOOD_PREFERENCES}
                labelText={'Preferencias alimenticias'}
                placeholder={placeholder}
                onValueChange={value => {
                  onChange(value);
                  handleGeneralValues('dietsPreferences', value);
                }}
                value={value}
                error={errors.dietsPreferences}
              />
            )}
            name="dietsPreferences"
            rules={{required: 'El campo es requerido'}}
          />

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <InputCustom
                label={'Otras consideraciones (alergias, intolerancias, etc)'}
                onChangeText={value => {
                  onChange(value);
                  handleGeneralValues('otherConsiderations', value);
                }}
                value={value}
                placeholder="Ej: Alergia a los frutos secos."
                style={{marginVertical: 10}}
                error={errors.otherConsiderations}
              />
            )}
            name="otherConsiderations"
            rules={{required: 'El campo es requerido'}}
          />

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <DropdownInput
                items={FOOD_PER_DAY}
                labelText={'Comidas por dia'}
                placeholder={placeholder}
                onValueChange={value => {
                  onChange(value);
                  handleGeneralValues('foodPerDay', value);
                }}
                value={value}
                error={errors.foodPerDay}
              />
            )}
            name="foodPerDay"
            rules={{required: 'El campo es requerido'}}
          />

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <DropdownInput
                items={FAVORITE_TRAINING_PLACE}
                labelText={'Lugar preferido de entrenamiento'}
                placeholder={placeholder}
                onValueChange={value => {
                  onChange(value);
                  handleGeneralValues('placeToTrain', value);
                }}
                value={value}
                error={errors.placeToTrain}
              />
            )}
            name="placeToTrain"
            rules={{required: 'El campo es requerido'}}
          />

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <InputCustom
                label={'Lesiones (opcional)'}
                onChangeText={value => {
                  onChange(value);
                  handleGeneralValues('lastInjuries', value);
                }}
                value={value}
                placeholder="Ej: Rotura de ligamentos cruzados."
                style={{marginVertical: 10}}
                error={errors.lastInjuries}
              />
            )}
            name="lastInjuries"
          />

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <DropdownInput
                items={TRAININGS_PER_WEEK}
                labelText={'Cantidad de entrenamientos por semana'}
                placeholder={placeholder}
                onValueChange={value => {
                  onChange(value);
                  handleGeneralValues('trainPerWeek', value);
                }}
                value={value}
                error={errors.trainPerWeek}
              />
            )}
            name="trainPerWeek"
            rules={{required: 'El campo es requerido'}}
          />

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <DropdownInput
                items={TRAINING_DURATION}
                labelText={'Duración de cada entrenamiento'}
                placeholder={placeholder}
                onValueChange={value => {
                  onChange(value);
                  handleGeneralValues('trainDuration', value);
                }}
                value={value}
                error={errors.trainDuration}
                styles={{paddingBottom: 50}}
              />
            )}
            name="trainDuration"
            rules={{required: 'El campo es requerido'}}
          />
        </ScrollView>
      </VStack>
      <BottomButtons handleNextScreen={handleSubmit(onSubmit)} />
    </>
  );
}
