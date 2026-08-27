import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../style/style';

export const GrayCardSmall = ({children, onPress, style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        {
          width: 147,
          height: 177,
          marginHorizontal: 5,
          marginBottom: 15,
        },
        style,
      ]}>
      <View style={styles.card}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 20,
  },
  icon: {
    marginBottom: 10,
  },
  text: {
    color: '#ffff',
  },
});
