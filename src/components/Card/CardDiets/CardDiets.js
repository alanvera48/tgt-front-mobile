import {Dimensions, View, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import TextBase from '../../Base/TextBase';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../../style/style';
import {getDietImage} from '../../../utils/diets';

const SCREEN_WIDTH = Dimensions.get('window').width;
const LIST_WIDTH = SCREEN_WIDTH - 70; // 20px padding on each side
const GRID_WIDTH = (SCREEN_WIDTH - 60) / 2; // 20px padding on sides, 20px gap between items

export default function CardDiets({
  item,
  onPress,
  index,
  screenWidth,
  customWidth,
}) {
  const cardWidth = customWidth || (screenWidth ? LIST_WIDTH : GRID_WIDTH);

  return (
    <Pressable
      style={[
        styles.cardContainer,
        // index % 2 === 0 ? {marginRight: 10} : {marginLeft: 10},
        // TODO: Confirmar si vamos a hacer una grid en el futuro para descomentar este código
        // Se podria extraer este condicional y pasarlo por una prop style
        {height: 220, width: cardWidth},
      ]}
      onPress={() => onPress(item.id)}>
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
      <Image
        alt="image-diet"
        source={{uri: getDietImage(item)}}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 20,
        }}
      />

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['transparent', 'rgba(0,0,0,0.70)', 'rgba(0,0,0,0.80)']}
        style={styles.linearGradingStyle}>
        <View style={styles.textContainer}>
          <TextBase
            text={`${item?.description}`}
            lines={3}
            size={14}
            color={'#FFFFFF'}
            fontFamily="AirbnbCereal_W_Bk"
            style={{marginBottom: 4}}
          />
          <TextBase
            text={`${item?.name}`}
            size={16}
            color={'#FFFFFF'}
            fontFamily="AirbnbCereal_W_Bd"
          />
        </View>
      </LinearGradient>
      {/* TODO: comentado por el momento */}
      {/* <View style={styles.containerRanking}>
        <TextBase
          size={12}
          text={'4.9'}
          color={'#ffff'}
          fontFamily="AirbnbCereal_W_Bk"
          style={{marginRight: 4, height: 14}}
        />
        <FontAwesomeIcon icon={faStar} size={14} color={COLORS.dark.textPrimary} />
      </View> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.dark.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'relative',
  },
  linearGradingStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    padding: 20,
    borderRadius: 20,
    borderWidth: 0,
  },
  image: {
    borderRadius: 100,
    position: 'absolute',
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  containerGradient: {
    position: 'absolute',
    backgroundColor: '#454446',
    bottom: 10,
    right: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    zIndex: 99999,
  },
  containerRanking: {
    width: 60,
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.dark.backgroundCard,
    flexDirection: 'row',
    borderRadius: 40,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
});
