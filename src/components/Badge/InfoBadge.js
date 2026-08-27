import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextBase from '../Base/TextBase';
import { text } from '@fortawesome/fontawesome-svg-core';

/**
 * Badge informativo con borde y fondo
 * @param {string} message - Texto a mostrar en el badge
 * @param {string} color - Color intenso para el borde y texto
 */
export default function InfoBadge({message, color}) {
  const backgroundColor = `${color}20`; // Agrega transparencia al color para el fondo

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: color,
          backgroundColor: backgroundColor,
        },
      ]}>
      <TextBase
        text={message}
        color={color}
        lines={2}
        size={14}
        fontFamily="AirbnbCereal_W_Bd"
        style={{textAlign: 'center'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    textAlign: 'center',
  },
});
