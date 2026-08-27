import React from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {COLORS} from '../../style/style';

export default function SocialButton({
  onPress,
  disabled,
  isLoading,
  size = 60,
  children,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      onPress={onPress}
      style={[
        styles.button,
        {width: size, height: size, borderRadius: size / 4},
      ]}>
      {isLoading ? <ActivityIndicator color="#fff" size="small" /> : children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.dark.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
