import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../style/style';

export default function InputCustom({
  placeholder = 'Enter your email',
  value,
  onChangeText,
  icon,
  label,
  error,
  style,
  keyboardType,
  readOnly = false,
  maxLength,
  multiline = false,
  numberOfLines,
}) {
  const errorColor = error ? COLORS.dark.error : undefined;

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
            multiline && styles.inputContainerMultiline,
            errorColor && {borderColor: errorColor},
            style,
          ]}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            style={[
              styles.input,
              multiline && styles.inputMultiline,
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
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={multiline ? 'top' : 'center'}
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
    alignItems: 'center',
    minHeight: 56,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.dark.backgroundInput,
    backgroundColor: COLORS.dark.backgroundCard,
    position: 'relative',
    paddingHorizontal: 16,
  },
  inputContainerMultiline: {
    alignItems: 'flex-start',
    paddingVertical: 14,
    minHeight: 90,
  },
  label: {
    position: 'absolute',
    top: -5,
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
    fontSize: 17,
    fontFamily: 'AirbnbCereal_W_Bk',
    color: '#fff',
    height: 54,
  },
  inputMultiline: {
    height: undefined,
    minHeight: 60,
    paddingTop: 18,
  },
  errorText: {
    color: COLORS.dark.error,
    fontSize: 12,
    marginTop: 4,
  },
});
