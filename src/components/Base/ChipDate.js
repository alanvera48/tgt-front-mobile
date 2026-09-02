/* eslint-disable react/react-in-jsx-scope */
import {View} from 'react-native';
import TextBase from './TextBase';
import {COLORS} from '../../style/style';

const ChipColorText = enabled => {
  let color, text;
  if (!enabled) {
    color = COLORS.dark.primaryLight;
    text = 'Pendiente';
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
        paddingVertical: 4,
        paddingHorizontal: 10,
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
        color="#fff"
        fontFamily="AirbnbCereal_W_Bd"
      />
    </View>
  );
}
