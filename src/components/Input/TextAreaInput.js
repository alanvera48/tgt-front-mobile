import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../style/style';

export default function TextAreaInput({
  placeholder = 'Ingrese valor del campo',
  value,
  onChangeText,
  icon,
  label,
  error,
  style,
  keyboardType,
  readOnly = false,
  numberOfLines,
  maxLength,
}) {
  const errorColor = error ? COLORS.dark.error : undefined;
  const dynamicHeight = numberOfLines * 42;

  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            width: 200,
            height: 20,
          }}>
          <Text style={styles.errorText}>{error ? error.message : ''}</Text>
        </View>
        <View
          style={[
            styles.inputContainer,
            {minHeight: dynamicHeight},
            errorColor && {borderColor: errorColor},
            style,
          ]}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            multiline
            numberOfLines={numberOfLines}
            style={[
              styles.input,
              {minHeight: dynamicHeight},
              errorColor && {color: errorColor},
            ]}
            placeholder={placeholder}
            placeholderTextColor={errorColor || COLORS.dark.gray}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize={'none'}
            keyboardType={keyboardType ?? 'default'}
            editable={!readOnly}
            autoCorrect={false}
            textAlignVertical="top"
            maxLength={maxLength}
          />
          {icon && <Icon name={icon} />}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.dark.backgroundInput,
    backgroundColor: 'transparent',
    position: 'relative',
    padding: 0,
    paddingTop: 10,
  },
  label: {
    position: 'absolute',
    top: 8,
    left: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    paddingHorizontal: 5,
    color: COLORS.dark.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 17,
    fontFamily: 'AirbnbCereal_W_Bk',
    color: '#fff',
    textAlignVertical: 'top',
    paddingTop: 20,
  },
  errorText: {
    color: COLORS.dark.error,
    fontSize: 12,
    marginTop: 4,
  },
});
