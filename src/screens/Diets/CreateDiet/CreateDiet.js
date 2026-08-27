import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import {Accordion, VStack} from '@gluestack-ui/themed';

import {
  useCreateOrUpdateDiet,
  useGetDietById,
} from '../../../hooks/diets/queries';
import InDashboard from '../../../layouts/InDashboard';
import InputCustom from '../../../components/Input/Input';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';
import {FieldArray} from './FieldArray/FieldArray';
import {DropdownInput} from '../../../components/DropdownInput/DropdownInput';
import {DURATION_UNIT} from '../../../constants/inputs-options';
import {useKeyboardVisible} from '../../../hooks/useKeyboardVisible';
import {COLORS} from '../../../style/style';

const placeholderUnitDuration = {
  label: 'días',
  value: 'días',
};

export default function CreateDiet({navigation, route}) {
  const mealsNames = [
    'Desayuno',
    'Media Mañana',
    'Almuerzo',
    'Merienda',
    'Media Tarde',
    'Cena',
    'Colación',
    'Pre-Entreno',
    'Post-Entreno',
  ];

  const [body, setBody] = useState(undefined);
  const isKeyboardVisible = useKeyboardVisible();

  const {data} = useGetDietById(route?.params?.diet_id);

  const {mutateAsync: mutationCreateDiet, status: statusCreateDiet} =
    useCreateOrUpdateDiet(route?.params?.diet_id || null);

  const defaultValues = {
    name: '',
    numberDuration: '30',
    unitDuration: 'días',
    alert: '2024-06-25',
    description: '',
    isTemplate: false,
    templateId: null,
    meals: [
      {
        name: 'Desayuno',
        food: [{food: undefined, quantity: undefined, unit: 'gramos'}],
        time: '08:00',
        order: 1,
        enabled: true,
      },
      {
        name: 'Media Mañana',
        food: [{food: undefined, quantity: undefined, unit: 'gramos'}],
        time: '10:30',
        order: 2,
        enabled: false,
      },
      {
        name: 'Almuerzo',
        food: [{food: undefined, quantity: undefined, unit: 'gramos'}],
        time: '13:00',
        order: 3,
        enabled: true,
      },
      {
        name: 'Merienda',
        food: [{food: undefined, quantity: undefined, unit: 'gramos'}],
        time: '16:00',
        order: 4,
        enabled: true,
      },
      {
        name: 'Media Tarde',
        food: [{food: undefined, quantity: undefined, unit: 'gramos'}],
        time: '18:00',
        order: 5,
        enabled: false,
      },
      {
        name: 'Cena',
        food: [{food: undefined, quantity: undefined, unit: 'gramos'}],
        time: '20:00',
        order: 6,
        enabled: true,
      },
      {
        name: 'Colación',
        food: [{food: undefined, quantity: undefined, unit: 'gramos'}],
        time: '22:00',
        order: 7,
        enabled: false,
      },
      {
        name: 'Pre-Entreno',
        food: [{food: undefined, quantity: undefined, unit: 'gramos'}],
        time: 'pre-workout',
        order: 8,
        enabled: false,
      },
      {
        name: 'Post-Entreno',
        food: [{food: undefined, quantity: undefined, unit: 'gramos'}],
        time: 'post-workout',
        order: 9,
        enabled: false,
      },
    ],
  };

  const mealTimes = {
    Desayuno: '08:00',
    'Media Mañana': '10:30',
    Almuerzo: '13:00',
    Merienda: '16:00',
    'Media Tarde': '18:00',
    Cena: '20:00',
    Colación: '22:00',
    'Pre-Entreno': 'pre-workout',
    'Post-Entreno': 'post-workout',
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
  } = useForm({
    defaultValues,
  });

  const mealsValue = watch('meals');

  const onSubmit = async data => {
    const duration = `${data.numberDuration} ${data.unitDuration}`;

    setBody({
      ...data,
      meals: mealsValue.filter(item => item.enabled === true),
      duration: duration,
    });
  };

  useEffect(() => {
    if (body?.meals[0]?.food[0].food !== undefined) {
      mutationCreateDiet(body, {
        onSuccess: result => {
          if (result === undefined) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Ha ocurrido un error, vuelva a intentarlo',
            });
          } else {
            navigation.navigate('TrainerDashboard');
            Toast.show({
              type: 'success',
              text1: `Dieta ${data ? 'actualizada' : 'creada'}`,
              text2: `La dieta se ${data ? 'actualizó' : 'creó'} correctamente`,
            });
          }
        },
        onError: error => {
          console.log(error, 'error');
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.response.data.message,
          });
          setBody(undefined);
        },
      });
    }
  }, [body]);

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('description', data.description);
      setValue('numberDuration', data.duration.split(' ')[0]);
      setValue('unitDuration', data.duration.split(' ')[1]);

      const formattedMeals = [];
      mealsNames.map((mealName, index) => {
        const existingMeal = data?.meals?.filter(
          meal => meal.name === mealName,
        )[0];

        if (existingMeal) {
          formattedMeals.push({
            name: existingMeal?.name,
            time: mealTimes[existingMeal?.name],
            food: existingMeal?.items?.map(item => ({
              food: item?.food || undefined,
              quantity: item?.quantity || undefined,
              unit: item?.unit || undefined,
            })),
            enabled: true,
            order: index + 1,
          });
        } else {
          formattedMeals.push({
            name: mealName,
            food: [{food: undefined, quantity: undefined}],
            time: mealTimes[mealName],
            enabled: false,
            order: index + 1,
          });
        }
      });

      setValue('meals', formattedMeals, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [data, setValue]);

  return (
    <>
      <InDashboard>
        <VStack
          paddingHorizontal={10}
          flexDirection="column"
          marginBottom={120}>
          <Controller
            name="name"
            control={control}
            rules={{required: 'Este campo es requerido'}}
            render={({field: {onChange, value}}) => (
              <InputCustom
                label={'Nombre de la dieta'}
                placeholder="Nombre de la dieta"
                style={{marginVertical: 10}}
                error={errors?.name}
                value={value}
                onChangeText={value => onChange(value)}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{required: 'Este campo es requerido'}}
            render={({field: {onChange, value}}) => (
              <InputCustom
                label={'Descripcion de la dieta'}
                placeholder="Descripción de la dieta"
                style={{marginVertical: 10}}
                error={errors?.description}
                value={value}
                onChangeText={value => onChange(value)}
              />
            )}
          />
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: '50%',
              }}>
              <Controller
                name="numberDuration"
                control={control}
                rules={{required: 'Este campo es requerido'}}
                render={({field: {onChange, value}}) => (
                  <InputCustom
                    label={'Duración'}
                    placeholder="3"
                    style={{marginVertical: 10, marginTop: 15}}
                    error={errors.numberDuration}
                    value={value}
                    onChangeText={value => onChange(value)}
                  />
                )}
              />
            </View>

            <View
              style={{
                width: '50%',
              }}>
              <Controller
                name="unitDuration"
                control={control}
                rules={{required: 'Este campo es requerido'}}
                render={({field: {onChange, value}}) => (
                  <DropdownInput
                    items={DURATION_UNIT}
                    placeholder={placeholderUnitDuration}
                    error={errors.unitDuration}
                    onValueChange={value => {
                      onChange(value);
                    }}
                    value={value}
                  />
                )}
              />
            </View>
          </View>

          <Accordion
            width="100%"
            size="md"
            backgroundColor={COLORS.dark.background}
            variant="filled"
            type="multiple"
            marginVertical={10}
            isCollapsible={true}
            isDisabled={false}>
            <FieldArray control={control} errors={errors} />
          </Accordion>
        </VStack>
      </InDashboard>
      {!isKeyboardVisible && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <ButtonGradient
            text={`${data ? 'Actualizar' : 'Crear'} Dieta`}
            isLoading={statusCreateDiet === 'pending'}
            style={{height: 55, marginBottom: 0}}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      )}
    </>
  );
}
