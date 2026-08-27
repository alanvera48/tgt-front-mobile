import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function ButtonSecundary({
  onPress,
  text,
  icon,
  style,
  iconColor,
}) {
  return (
    <Pressable
      onPress={onPress}
      color={'#0000'}
      style={[styles.buttonColor, style]}
      colorScheme="primary"
      variant="subtle">
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.text}>{text}</Text>
        {icon && <FontAwesomeIcon icon={icon} size={20} color={iconColor} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'AirbnbCereal_W_Md',
    fontSize: 18,
  },
  buttonColor: {
    // marginTop: 19,
    backgroundColor: '#FFF',
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 30,
    borderColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: 280,
    maxWidth: 280,
  },
});
