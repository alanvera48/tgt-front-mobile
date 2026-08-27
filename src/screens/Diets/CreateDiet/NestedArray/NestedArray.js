import React from 'react';
import {Controller, useFieldArray} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

import {COLORS} from '../../../../style/style';
import InputCustom from '../../../../components/Input/Input';
import {DropdownInput} from '../../../../components/DropdownInput/DropdownInput';
import TextBase from '../../../../components/Base/TextBase';
import ButtonSecundary from '../../../../components/Buttons/ButtonSecundary';
import {FOOD_DATABASE_DROPDOWN_ITEMS} from '../../../../constants/diets';
import {SearchableDropdownInput} from '../../../../components/SearchableDropdownInput';

export const FOOD_UNITS = [
  // {
  //   label: 'Gramos',
  //   value: 'gramos',
  // },
  {
    label: 'Kilos',
    value: 'kilos',
  },
  {
    label: 'Mililitros',
    value: 'ml',
  },
  {
    label: 'Litros',
    value: 'litros',
  },
  {
    label: 'Unidades',
    value: 'unidades',
  },
  {
    label: 'Tazas',
    value: 'tazas',
  },
  {
    label: 'Cucharadas',
    value: 'cucharadas',
  },
  {
    label: 'Cucharaditas',
    value: 'cucharaditas',
  },
  {
    label: 'Porciones',
    value: 'porciones',
  },
  {
    label: 'Rebanadas',
    value: 'rebanadas',
  },
];

export const NestedArray = ({nestIndex, control, errors, enabled}) => {
  const {fields, remove, append} = useFieldArray({
    control,
    name: `meals[${nestIndex}].food`,
    defaultValues: {
      food: undefined,
      quantity: undefined,
      unit: 'gramos',
    },
  });

  const placeholder = {
    label: 'Seleccionar',
    value: null,
  };

  const foodUnitDefaultValue = {
    label: 'Gramos',
    value: 'gramos',
  };

  return (
    <View>
      {fields?.map((item, k) => {
        return (
          <>
            {enabled && (
              <View style={{marginBottom: 18}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: 12,
                    height: 60,
                  }}>
                  <TextBase
                    text={`Comida ${k + 1}`}
                    fontFamily={'AirbnbCereal_W_Bk'}
                    size={18}
                    color={'#ffff'}
                  />
                  {k !== 0 && (
                    <TouchableOpacity
                      onPress={() => remove(k)}
                      style={{
                        margin: 20,
                        marginRight: 0,
                        justifyContent: 'center',
                      }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        color={COLORS.dark.textWhite}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <Controller
                    name={`meals[${nestIndex}].food[${k}].food`}
                    control={control}
                    rules={{
                      required: 'Este campo es requerido',
                    }}
                    render={({field: {onChange, value}}) => {
                      return (
                        <SearchableDropdownInput
                          items={FOOD_DATABASE_DROPDOWN_ITEMS}
                          labelText="Comida"
                          placeholder="Elige una comida."
                          value={value}
                          onValueChange={value => {
                            onChange(value);
                          }}
                          error={
                            errors?.meals
                              ? errors?.meals[nestIndex]?.food[k]?.food?.message
                              : undefined
                          }
                          searchPlaceholder="Buscar comidas..."
                          noResultsText="No se encontraron comidas"
                        />
                      );
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <Controller
                    name={`meals[${nestIndex}].food[${k}].quantity`}
                    control={control}
                    rules={{
                      required: 'Este campo es requerido',
                    }}
                    render={({field: {onChange, value}}) => {
                      return (
                        <InputCustom
                          label={'Cantidad'}
                          placeholder="Ingrese un número"
                          keyboardType={'numeric'}
                          value={value?.toString()}
                          onChangeText={value => {
                            onChange(Number(value));
                          }}
                          error={
                            errors?.meals
                              ? errors?.meals[nestIndex]?.food[k]?.quantity
                                  ?.message
                              : undefined
                          }
                        />
                      );
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <Controller
                    name={`meals[${nestIndex}].food[${k}].unit`}
                    control={control}
                    rules={{
                      required: 'Este campo es requerido',
                    }}
                    render={({field: {onChange, value}}) => {
                      return (
                        <DropdownInput
                          items={FOOD_UNITS}
                          labelText={'Unidades'}
                          placeholder={foodUnitDefaultValue}
                          error={
                            errors?.meals
                              ? errors?.meals[nestIndex]?.food[k]?.unit?.message
                              : undefined
                          }
                          onValueChange={value => {
                            onChange(value);
                          }}
                          value={value}
                        />
                      );
                    }}
                  />
                </View>
              </View>
            )}
          </>
        );
      })}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <ButtonSecundary
          text={'Agregar comida'}
          onPress={() =>
            append({
              food: '1',
              quantity: 0,
            })
          }
          style={{width: 200}}
        />
      </View>
    </View>
  );
};
