/* eslint-disable react/react-in-jsx-scope */
import {View} from 'react-native';
import TextBase from './TextBase';

const ChipColorText = enabled => {
  let color, text;
  if (!enabled) {
    color = '#059669';
    text = 'Deshabilitado';
  }
  return {color, text};
};

export default function ChipDate({enabled}) {
  const {color, text} = ChipColorText(enabled);

  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        padding: 5,
        // width: '75',
        // height: 28,
        backgroundColor: color,
        top: 10,
        left: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        zIndex: 9,
      }}>
      <TextBase size={12} text={text} fontFamily="AirbnbCereal_W_Bk" />
    </View>
  );
}
