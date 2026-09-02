import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import TextBase from '../../Base/TextBase';
import {COLORS} from '../../../style/style';
import {getDietImage} from '../../../utils/diets';

export default function CardDietsList({item, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(item.id)}
      style={styles.container}>
      <Image
        alt="image-diet"
        source={{uri: getDietImage(item)}}
        resizeMode="cover"
        style={styles.thumb}
      />
      <View style={styles.textContainer}>
        <TextBase
          text={item?.name}
          size={15}
          lines={1}
          color={'#fff'}
          fontFamily="AirbnbCereal_W_Bd"
        />
        {!!item?.description && (
          <TextBase
            text={item.description}
            size={13}
            lines={2}
            color={COLORS.dark.textMuted}
            fontFamily="AirbnbCereal_W_Bk"
            style={{marginTop: 3}}
          />
        )}
      </View>
      <FontAwesomeIcon
        icon={faChevronRight}
        color={COLORS.dark.textMuted}
        size={14}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 16,
    padding: 12,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
});
