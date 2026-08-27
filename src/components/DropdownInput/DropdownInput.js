import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {VStack} from '@gluestack-ui/themed';
import TextBase from '../../components/Base/TextBase';
import {COLORS} from '../../style/style';

export const DropdownInput = ({
  items,
  labelText,
  placeholder,
  onValueChange,
  value,
  error,
  styles,
  disabled = false,
}) => {
  return (
    <View style={styles}>
      <View
        style={{
          alignItems: 'flex-start',
          width: 200,
          height: 20,
        }}>
        {error && <TextBase text={error.message} style={style.error} />}
      </View>

      <VStack
        style={[
          style.containerPicker,
          {
            borderColor: error
              ? COLORS.dark.error
              : COLORS.dark.backgroundInput,
          },
        ]}>
        <TextBase text={labelText} style={style.labelPicker} />
        <RNPickerSelect
          items={items}
          placeholder={placeholder}
          onValueChange={onValueChange}
          value={value}
          disabled={disabled}
          pickerProps={{
            dropdownIconColor: '#FFFFFF',
          }}
          textInputProps={{
            color: value ? '#ffff' : COLORS.dark.gray,
            marginTop: 15,
            fontSize: 18,
            paddingHorizontal: 10,
          }}
          style={{
            color: '#ffff',
            inputIOS: {
              color: '#fff', // Color del ítem seleccionado en iOS
            },
            inputAndroid: {
              color: '#fff', // Color del ítem seleccionado en Android
              marginTop: 15,
              marginLeft: -5,
            },
            placeholder: {
              color: error ? COLORS.dark.error : COLORS.dark.gray,
            },
          }}
          doneText="Seleccionar"
          darkTheme={true}
        />
      </VStack>
    </View>
  );
};

const style = StyleSheet.create({
  error: {
    color: COLORS.dark.error,
    fontSize: 12,
  },
  labelPicker: {
    position: 'absolute',
    top: 10,
    left: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    paddingHorizontal: 5,
    color: COLORS.dark.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  containerPicker: {
    flex: 1,
    height: 72,
    marginBottom: 15,
    flexBasis: 'auto',
    justifyContent: 'center',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
});
