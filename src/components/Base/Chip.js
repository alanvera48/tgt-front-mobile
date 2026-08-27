/* eslint-disable no-unreachable */
/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import TextBase from './TextBase';
import {COLORS} from '../../style/style';

const ChipColor = color => {
  switch (color) {
    case 'Today':
      return '#F0635A';
    case 'Premium':
      return '#F8C93B';
    default:
      return COLORS.dark.backgroundCard;
  }
};

const ChipColorText = stars => {
  let color, text;
  if (stars > 7 && stars <= 8) {
    color = '#059669';
    text = 'Destacado';
  } else if (stars >= 9) {
    color = '#EA580C';
    text = 'Top';
  } else {
    color = '#DCDBDB';
    text = 'Normal';
  }
  return {color, text};
};

export default function Chip({stars}) {
  const {color, text} = ChipColorText(stars);

  return (
    <View
      style={{
        position: 'absolute',
        width: 75,
        height: 28,
        backgroundColor: color,
        top: 10,
        left: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        zIndex: 9,
      }}>
      <TextBase
        size={12}
        text={text}
        color={'#000000'}
        fontFamily="AirbnbCereal_W_Bk"
      />
    </View>
  );
}
