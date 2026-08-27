import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

// TODO: implementar este componente en las otras pantallas que ya usan este codigo, ej SelectGym
export const BottomBlackFadeContainer = ({children}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
      opacity={1}
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 30,
      }}>
      {children}
    </LinearGradient>
  );
};
