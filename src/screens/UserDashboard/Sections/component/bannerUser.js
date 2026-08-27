import {View, Text, Pressable, Dimensions} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonGradient from '../../../../components/Buttons/ButtonGradient';
import TextBase from '../../../../components/Base/TextBase';
import {useNavigation} from '@react-navigation/native';

export default function BannerUser() {
  const navigation = useNavigation();
  const widthDimension = Dimensions.get('window').width - 20;
  return (
    <Pressable
      style={{width: '100%', position: 'relative'}}
      // onPress={navigate}
    >
      {/* <Chip text={'Premium'} /> */}
      <Image
        alt="image-banner"
        source={require('../../../../assets/image/explorer.png')}
        //   height={210}
        width={widthDimension}
        height={200}
        style={{borderRadius: 20, width: '100%', height: 200, zIndex: 0}}
        //src={require(item.item.rutineImage)}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['transparent', 'rgba(0,0,0,0.70)', 'rgba(0,0,0,0.80)']}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',

          padding: 20,
          borderRadius: 20,
        }}>
        <View
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <TextBase
            text={'Entrenadores cerca tuyo'}
            size={20}
            color={'#ffff'}
            fontFamily="AirbnbCereal_W_Bd"
            style={{marginBottom: 15}}
          />
          <ButtonGradient
            text={'Explorar ahora'}
            icon={false}
            onPress={() => {
              navigation.navigate('ExploreStack');
            }}
            style={{
              width: 160,
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          />
        </View>
      </LinearGradient>
    </Pressable>
  );
}
