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
import {Avatar, AvatarImage} from '@gluestack-ui/themed';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../../style/style';

const screen = Dimensions.get('window');
const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function CardTrainer({index, item: {user}, onPress}) {
  const specialtiesText = user?.onboardingTrainer?.specialties
    ?.join(', ')
    ?.replaceAll('_', ' ');

  return (
    <AnimatedTouchable
      key={index}
      activeOpacity={1}
      style={styles.item}
      onPress={() => onPress(user.id)}>
      <View style={{paddingRight: 20}}>
        <Avatar size="lg">
          <AvatarImage
            alt="image-avatar"
            size="lg"
            source={
              user?.imageUrl !== null
                ? {uri: user?.imageUrl}
                : user?.onboardingTrainer?.gender === 'FEMENINO'
                ? require('../../../assets/image/placeholder-female.png')
                : require('../../../assets/image/placeholder-male.png')
            }
          />
        </Avatar>
      </View>
      <View style={{display: 'flex', justifyContent: 'center'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: COLORS.dark.backgroundInput,
          }}>
          <TextBase
            text={`${user.firstName} ${user.lastName}`}
            fontFamily={'AirbnbCereal_W_Bd'}
            color={'#fff'}
            size={16}
            style={{marginBottom: 5, textTransform: 'capitalize'}}
          />
        </View>
        <Rating
          ratingCount={5}
          imageSize={20}
          readonly
          tintColor={COLORS.dark.backgroundInput}
          style={{
            borderColor: 'transparent',
            borderWidth: 2,
            padding: 3,
            marginBottom: 4,
            width: 110,
            marginLeft: -7,
          }}
          ratingColor={COLORS.dark.textPrimary}
        />

        {specialtiesText && (
          <TextBase
            text={specialtiesText}
            fontFamily={'AirbnbCereal_W_Bk'}
            color={'#fff'}
            lines={2}
            size={16}
            style={{marginBottom: 0, width: ITEM_WIDTH - 120}}
          />
        )}
        <TextBase
          text={`${
            user.onboardingTrainer?.experienceYears ?? 0
          } años de experiencia`}
          fontFamily={'AirbnbCereal_W_Md'}
          color={COLORS.dark.textPrimary}
          size={16}
          style={{marginTop: 5}}
        />
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{marginLeft: 0, paddingVertical: 15}}>
        <FontAwesomeIcon icon={faChevronRight} size={22} color={'#fff'} />
      </TouchableOpacity>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  item: {
    width: ITEM_WIDTH,
    backgroundColor: COLORS.dark.backgroundInput,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 20,
    elevation: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: '#000',
    marginBottom: 10,
  },
});
