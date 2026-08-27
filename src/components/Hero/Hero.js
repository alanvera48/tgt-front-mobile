import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import Chip from '../Base/Chip';

import LinearGradient from 'react-native-linear-gradient';
import TextBase from '../Base/TextBase';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../style/style';

export default function Hero({item}) {
  return (
    <View style={styles.cardContainer}>
      <Chip text={'Today'} />
      <Image
        source={{
          uri: 'https://rusinol.com/wp-content/uploads/Rusinol-blog-dieta-proteica-que-es-menu-paso-a-paso.jpg',
        }}
        width={'100%'}
        height={'100%'}
        style={{position: 'absolute', borderRadius: 20}}
      />

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['transparent', 'rgba(0,0,0,0.70)', 'rgba(0,0,0,0.80)']}
        style={styles.containerGradient}>
        <View style={styles.textContainer}>
          <TextBase
            text={`${item?.description}`}
            size={14}
            lines={3}
            color={'#FFFFFF'}
            fontFamily="AirbnbCereal_W_Bk"
            style={{marginBottom: 5}}
          />
          <TextBase
            text={`${item?.name}`}
            lines={3}
            size={16}
            color={'#FFFFFF'}
            fontFamily="AirbnbCereal_W_Bd"
            style={{width: '80%'}}
          />
        </View>
      </LinearGradient>
      {/* TODO: Deshabilitado el rating por el momento */}
      {/* <View style={styles.containerAbsolute}>
        <TextBase
          size={12}
          text={'4.9'}
          color={'#ffff'}
          fontFamily="AirbnbCereal_W_Bk"
        />
        <FontAwesomeIcon icon={faStar} color={COLORS.dark.textPrimary} size={14} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginVertical: 10,
    height: 210,
    backgroundColor: COLORS.dark.backgroundCard,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'relative',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  containerAbsolute: {
    position: 'absolute',
    backgroundColor: '#454446',
    bottom: 10,
    right: 10,
    width: 60,
    paddingVertical: 3,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    zIndex: 99999,
  },
  containerGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    padding: 20,
    borderRadius: 20,
  },
});
