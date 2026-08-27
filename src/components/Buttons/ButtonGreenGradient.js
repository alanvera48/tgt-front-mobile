import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TextBase from '../Base/TextBase';

export default function ButtonGreenGradient({
  onPress,
  text,
  isPending = false,
}) {
  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      colors={['#033124', '#0D5C47', '#00B383']}
      style={{
        width: 200,
        height: 55,
        borderRadius: 30,
      }}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 55,
        }}
        onPress={onPress}>
        {isPending ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <TextBase
            text={text}
            size={20}
            color="#fff"
            fontFamily="AirbnbCereal_W_Bd"
          />
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}
