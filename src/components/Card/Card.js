import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TextBase from '../Base/TextBase';
import {Card as Cardle, Image} from '@gluestack-ui/themed';
import {VStack} from '@gluestack-ui/themed';
import {DEVICE_WIDTH} from '../../constants';
import {getRutineImage} from '../../utils/rutines';

const LIST_WIDTH = DEVICE_WIDTH - 70; // 20px padding on each side
const GRID_WIDTH = (DEVICE_WIDTH - 60) / 2; // 20px padding on sides, 20px gap between items

export default function Card({item, navigate, index, screenWidth}) {
  const cardWidth = screenWidth ? LIST_WIDTH : GRID_WIDTH;
  return (
    <Pressable
      onPress={navigate}
      style={[
        {flex: 1, borderRadius: 20},
        //index % 2 === 0 ? {marginRight: 10} : {marginLeft: 10},
        // TODO: Confirmar si vamos a hacer una grid en el futuro para descomentar este código
        // Se podria extraer este condicional y pasarlo por una prop style
      ]}>
      <Cardle
        padding={0}
        borderRadius={'$3xl'}
        maxWidth={360}
        position="relative"
        style={{flex: 1}}
        w={cardWidth}
        h={220}>
        <Image
          source={{uri: getRutineImage(item)}}
          resizeMethod="resize"
          resizeMod
          e="contain"
          h={220}
          width="$full"
          borderRadius={20}
          alt="image-card"
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['transparent', 'rgba(0,0,0,0.70)', 'rgba(0,0,0,0.80)']}
          style={styles.gradientContainer}>
          <VStack
            h={'$full'}
            w={'$full'}
            flexDirection={'column'}
            justifyContent="flex-end"
            alignItems="flex-start">
            <TextBase
              text={item.name}
              lines={2}
              size={16}
              color={'#ffff'}
              fontFamily="AirbnbCereal_W_Bd"
            />
            <TextBase
              text={item.shortDescription}
              size={16}
              lines={3}
              color={'#fff'}
              fontFamily="AirbnbCereal_W_Bk"
            />
          </VStack>
        </LinearGradient>
      </Cardle>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 20,
    borderRadius: 20,
  },
});
