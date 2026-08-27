import {View, Text} from 'react-native';
import React from 'react';

export default function Container({children, style}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1C1C1E',
        paddingHorizontal: 20,
        paddingTop: 40,
        ...style,
      }}>
      {children}
    </View>
  );
}
