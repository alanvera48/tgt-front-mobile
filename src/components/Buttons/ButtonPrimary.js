import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ButtonPrimary({onPress, text, isLoading, icon}) {
  return (
    <Pressable
      onPress={onPress}
      color={'#fff'}
      style={styles.buttonColor}
      variant="subtle">
      {isLoading ? <ActivityIndicator color="#fff" size={20} /> : null}
      {!isLoading && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Text style={styles.text}>{text}</Text>
          {icon && (
            <Icon
              name={icon}
              size={30}
              color={'#ffff'}
              style={{marginLeft: 10}}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Satoshi-Bold',
    fontSize: 18,
  },
  buttonColor: {
    // marginTop: 19,
    backgroundColor: '#2B2521',
    paddingHorizontal: 28,
    paddingVertical: 20,
    borderRadius: 30,
    width: 280,
    minWidth: 280,
    flexDirection: 'row',
    justifyContent: 'center',

    alignItems: 'center',
  },
});
