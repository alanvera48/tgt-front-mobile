import {View, StyleSheet, Image} from 'react-native';
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import TextBase from '../Base/TextBase';
import {COLORS} from '../../style/style';
import {getDietImage} from '../../utils/diets';

export default function Hero({item}) {
  return (
    <View style={styles.cardContainer}>
      <Image
        alt="image-diet-hero"
        source={{uri: getDietImage(item)}}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 20,
        }}
      />

      {item?.category && (
        <View style={styles.categoryChip}>
          <TextBase
            size={12}
            text={item.category}
            color={'#000000'}
            fontFamily="AirbnbCereal_W_Bd"
          />
        </View>
      )}

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['transparent', 'rgba(0,0,0,0.70)', 'rgba(0,0,0,0.80)']}
        style={styles.containerGradient}>
        <View style={styles.textContainer}>
          <TextBase
            text={`${item?.name}`}
            lines={2}
            size={20}
            color={'#FFFFFF'}
            fontFamily="AirbnbCereal_W_Bd"
            style={{width: '85%'}}
          />
          {item?.objective && (
            <TextBase
              text={item.objective}
              size={14}
              lines={2}
              color={'#D8D8D8'}
              fontFamily="AirbnbCereal_W_Bk"
              style={{marginTop: 4}}
            />
          )}
        </View>
      </LinearGradient>
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
  categoryChip: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
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
