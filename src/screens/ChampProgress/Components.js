import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import TextBase from '../../components/Base/TextBase';
import {COLORS} from '../../style/style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

export const EmptyCard = ({isBig, isChamp, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={isChamp ? 0.9 : 1}
      onPress={onPress}
      style={{
        backgroundColor: COLORS.dark.backgroundCard,
        height: isBig ? 301 : 136,
        width: isBig ? 198 : 109,
        borderRadius: 10,
        margin: 6,
        padding: isBig ? 30 : 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4a5056',
        borderStyle: 'dashed',
      }}>
      {isChamp && (
        <Image
          alt="upload-file"
          source={require('../../assets/image/upload-file.png')}
          resizeMode="contain"
          style={{
            width: isBig ? 60 : 26,
            height: isBig ? 60 : 26,
            marginBottom: 10,
          }}
        />
      )}
      {!isChamp && (
        <FontAwesomeIcon
          size={isBig ? 36 : 16}
          icon={faImage}
          style={{marginBottom: 10}}
          color="#fff"
        />
      )}
      <TextBase
        text={isChamp ? 'Agregar Foto' : 'Sin foto disponible'}
        lines={4}
        fontFamily={'AirbnbCereal_W_Bk'}
        size={isBig ? 20 : 12}
        color={'#ffff'}
        style={{textAlign: 'center', marginBottom: isBig ? 10 : 0}}
      />
      {isChamp && isBig && (
        <TextBase
          text={'Soporte máximo 10 Mb'}
          lines={4}
          fontFamily={'AirbnbCereal_W_Bk'}
          size={14}
          color={COLORS.dark.textMuted}
          style={{textAlign: 'center'}}
        />
      )}
    </TouchableOpacity>
  );
};

export const PictureCard = ({index, imageUri, isBig = false, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Image
        alt="image-card"
        source={{
          uri: imageUri,
        }}
        width={isBig ? 198 : 109}
        height={isBig ? 301 : 136}
        style={styles.picture}
      />
    </TouchableOpacity>
  );
};

export const TextCard = ({text, isBig = false}) => {
  return (
    <TextBase
      text={text}
      lines={2}
      fontFamily={'AirbnbCereal_W_Bk'}
      size={isBig ? 22 : 18}
      color={'#ffff'}
      style={{
        textAlign: 'center',
        width: isBig ? 198 : 109,
        marginTop: 10,
      }}
    />
  );
};

export const PreviousArrow = ({onPress, disabled, style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.arrowButton, style]}
      disabled={disabled}>
      <FontAwesomeIcon
        size={24}
        icon={faChevronLeft}
        color={COLORS.dark.textPrimary}
        style={{marginTop: 5}}
      />
    </TouchableOpacity>
  );
};

export const NextArrow = ({onPress, disabled, style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.arrowButton, style]}
      disabled={disabled}>
      <FontAwesomeIcon
        size={24}
        icon={faChevronRight}
        color={COLORS.dark.textPrimary}
        style={{marginTop: 5}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  picture: {
    borderRadius: 10,
    margin: 6,
    borderWidth: 2,
    borderColor: '#2a2724',
  },
  arrowButton: {
    marginHorizontal: 20,
  },
});
