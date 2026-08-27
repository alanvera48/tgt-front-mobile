import {Dimensions, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../style/style';

export default function LoadingScreen({backgroundColor}) {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 3,
        flex: 1,
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: backgroundColor ?? 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={COLORS.dark.textPrimary} />
    </View>
  );
}
