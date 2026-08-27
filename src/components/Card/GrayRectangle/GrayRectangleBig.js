import React from 'react';
import {TouchableOpacity} from 'react-native';
import {DEVICE_WIDTH} from '../../../constants';
import {COLORS} from '../../../style/style';

const LIST_WIDTH = DEVICE_WIDTH - 70; // 20px padding on each side
const GRID_WIDTH = (DEVICE_WIDTH - 60) / 2; // 20px padding on sides, 20px gap between items

export const GrayCardBig = ({children, onPress, style, screenWidth}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        {
          backgroundColor: COLORS.dark.backgroundCard,
          height: 220,
          width: screenWidth ? LIST_WIDTH : GRID_WIDTH,
          maxWidth: 360,
          borderRadius: 24,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};
