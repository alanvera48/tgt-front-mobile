import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function Logo({width, height}) {
  const styles = StyleSheet.create({
    icon: {
      width: width,
      height: height,
    },
  });

  return (
    <Image
      source={require('../../assets/image/logo.png')}
      style={styles.icon}
      resizeMode="contain"
      alt="logo"
    />
  );
}
