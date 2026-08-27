import {faEye} from '@fortawesome/free-regular-svg-icons';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, TextInput, View, StyleSheet, Pressable} from 'react-native';
import {COLORS} from '../../style/style';
import devConfig from '../../constants/devConfig';

const {dark: theme} = COLORS;

export default function InputPassword({
  placeholder = 'Enter your password',
  value,
  onChangeText,
  label,
  error,
  style,
}) {
  const [secureTextEntry, setSecureTextEntry] = React.useState(
    !devConfig.showPassword,
  );

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const errorColor = error ? COLORS.dark.error : undefined;
  const iconColor = errorColor || '#fff';

  return (
    <>
      <View
        style={[
          styles.inputContainer,
          errorColor && {borderColor: errorColor},
          style,
        ]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          style={[styles.input, errorColor && {color: errorColor}]}
          placeholder={placeholder}
          placeholderTextColor={errorColor || theme.gray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        <Pressable onPress={toggleSecureTextEntry}>
          <FontAwesomeIcon
            icon={secureTextEntry ? faEyeSlash : faEye}
            size={25}
            color={iconColor}
          />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.dark.backgroundInput,
    backgroundColor: COLORS.dark.backgroundCard,
    marginBottom: 10,
    position: 'relative',
    height: 56,
    paddingHorizontal: 16,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#fff',
    zIndex: 1,
    paddingHorizontal: 5,
    color: '#263238',
    fontSize: 12,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'AirbnbCereal_W_Bk',
    color: '#fff',
    marginRight: 10,
  },
});
