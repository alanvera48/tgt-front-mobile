import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import TextBase from '../../Base/TextBase';

import {Rating} from 'react-native-ratings';
import {COLORS} from '../../../style/style';

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};

const getfirstLetter = name => {
  return name.charAt(0);
};

const screen = Dimensions.get('window');
const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function CardGym({index, item, onPress}) {
  // const extraAvatars =
  //   item.userGyms > 3
  //     ? item.userGyms.slice(3).map(user => {
  //         return {
  //           src: 'https://example.com.jpg',
  //           alt: user?.user?.firstName
  //             ? getfirstLetter(user?.user?.firstName)
  //             : 'U',
  //           color: generateColor(),
  //         };
  //       })
  //     : item.userGyms.map(user => {
  //         return {
  //           src: 'https://example.com.jpg',
  //           alt: user?.user?.firstName
  //             ? getfirstLetter(user?.user?.firstName)
  //             : 'U',
  //           color: generateColor(),
  //         };
  //       });

  //const remainingCount = item.userGyms > 3 ? extraAvatars.length : null;

  return (
    <AnimatedTouchable
      key={index}
      activeOpacity={1}
      style={styles.item}
      onPress={() => onPress(item.place_id)}>
      <TextBase
        text={item.name}
        fontFamily={'AirbnbCereal_W_Bd'}
        color={'#fff'}
        size={16}
        style={{marginBottom: 0}}
      />
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginVertical: 5,
        }}>
        <Rating
          defaultRating={item.rating}
          imageSize={20}
          tintColor={COLORS.dark.backgroundInput}
        />
      </View>

      <TextBase
        text={item.formatted_address}
        fontFamily={'AirbnbCereal_W_Bk'}
        lines={3}
        color={COLORS.dark.textMuted}
      />
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        {/* {item.userGyms.length > 0 ? (
          <>
            <TextBase
              text={'Entrenadores'}
              color={COLORS.dark.textPrimary}
              style={{margin: 5}}
            />
            <AvatarGroupPeople
              extraAvatars={extraAvatars}
              remainingCount={remainingCount}
            />
          </>
        ) : (
          <TextBase
            text={'No hay entrenadores'}
            color={COLORS.dark.textPrimary}
            style={{margin: 5}}
          />
        )} */}
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 180,
    width: ITEM_WIDTH,
    backgroundColor: COLORS.dark.backgroundInput,
    overflow: 'hidden',
    borderRadius: 20,
    elevation: 5,
    padding: 20,
    borderColor: '#000',
  },
});
