import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import TextBase from '../Base/TextBase';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {COLORS} from '../../style/style';

export default function ListHorizontal({
  title,
  handleToAll = () => {},
  showBrowseAll = false,
  children,
  style,
}) {
  return (
    <Animated.View
      style={[{marginVertical: 12}, style]}
      entering={FadeInDown.delay(300).duration(300)}>
      <View
        style={{
          paddingBottom: 10,
          paddingRight: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            paddingLeft: 24,
            paddingBottom: 4,
            fontSize: 18,
            fontWeight: 600,
            color: COLORS.dark.textMuted,
            fontFamily: 'AirbnbCereal_W_Bd',
          }}>
          {title}
        </Text>
        {showBrowseAll && (
          <TouchableOpacity onPress={() => handleToAll()}>
            <TextBase
              size={16}
              color={'#E34A01'}
              fontFamily={'AirbnbCereal_W_Bk'}
              text={'Ver todo'}
            />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </Animated.View>
  );
}
