import React from 'react';
import {View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {IS_ANDROID} from '../../constants/index';
import {INITIAL_YEAR} from './Constants';
import {COLORS} from '../../style/style';

export const DropdownYear = ({items, value, onValueChange}) => {
  return (
    <View style={{width: 120, height: 50, marginLeft: 52}}>
      <RNPickerSelect
        items={items}
        placeholder={{
          label: INITIAL_YEAR.toString(),
          value: INITIAL_YEAR,
        }}
        doneText="Seleccionar"
        onValueChange={onValueChange}
        value={value}
        pickerProps={{
          dropdownIconColor: '#FFFFFF',
        }}
        textInputProps={{
          color: value ? '#ffff' : COLORS.dark.gray,
        }}
        style={{
          color: '#ffff',
          inputIOS: {
            color: '#fff', // Color del ítem seleccionado en iOS
            marginLeft: IS_ANDROID ? 0 : 16,
            marginTop: IS_ANDROID ? 0 : 8,
          },
          inputAndroid: {
            color: '#fff', // Color del ítem seleccionado en Android
          },
          placeholder: {
            color: COLORS.dark.gray,
          },
        }}
        darkTheme={true}
      />
    </View>
  );
};
