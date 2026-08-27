import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import TextBase from '../Base/TextBase';
import {COLORS} from '../../style/style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBan, faLock} from '@fortawesome/free-solid-svg-icons';

export const CardImage = ({title, subtitle, image, disabled = false}) => {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={[styles.image, disabled && styles.disabledImage]}
        resizeMode="contain"
        alt="image-card"
      />
      <View style={styles.contentContainer}>
        <TextBase
          text={title}
          color={disabled ? 'grey' : COLORS.dark.textWhite}
          lines={2}
          style={{marginBottom: 6}}
        />
        <TextBase
          text={subtitle}
          color={disabled ? 'grey' : COLORS.dark.textWhite}
          lines={2}
        />
      </View>

      {disabled && (
        <View style={styles.disabledOverlay}>
          <FontAwesomeIcon icon={faBan} color="#FFFFFF" size={24} />
          <TextBase
            text="No disponible"
            color={COLORS.dark.textWhite}
            fontFamily="AirbnbCereal_W_Bd"
            size={14}
            style={{marginTop: 8}}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 220,
    borderRadius: 20,
    position: 'relative',
  },
  image: {
    width: 150,
    height: 220,
    borderRadius: 20,
  },
  disabledImage: {
    opacity: 0.6,
  },
  contentContainer: {
    position: 'absolute',
    width: 150,
    height: 220,
    justifyContent: 'flex-end',
    padding: 12,
    paddingRight: 18,
  },
  disabledOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
