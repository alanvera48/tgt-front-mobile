import {View, Dimensions, FlatList} from 'react-native';
// import GetLocation from 'react-native-get-location'
import React, {useEffect, useRef, useState} from 'react';
import TextBase from '../../components/Base/TextBase';
import ButtonSecundary from '../../components/Buttons/ButtonSecundary';
import {faMap} from '@fortawesome/free-solid-svg-icons';
import CardGym from '../../components/Card/CardGym/CardGym';

import GetLocation from 'react-native-get-location';
import {ASPECT_RATIO, getNearbyPlaces} from '../../utils/getPlaces';
import {COLORS} from '../../style/style';

export default function GymList({navigation}) {
  const [places, setPlaces] = useState([]);
  const [position, setPosition] = useState();

  const getPlacesCurrent = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });
      setPosition(location);
      const placesNear = await getNearbyPlaces(
        location.latitude,
        location.longitude,
        ASPECT_RATIO,
      );
      setPlaces(placesNear);
    } catch (error) {
      const {code, message} = error;
      console.warn(code, message);
    }
  };

  useEffect(() => {
    getPlacesCurrent();
  }, []);

  const onPressOmitir = () => navigation.navigate('UserDashboard');

  const onPressGym = gym_place_id => {
    navigation.navigate('TrainerList', {
      gym_place_id,
    });
  };
  // if (isPending) {
  //   return <LoadingScreen />;
  // }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1C1C1E',
        paddingHorizontal: 20,
        paddingTop: 40,
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <ButtonSecundary
          text={'Omitir'}
          onPress={onPressOmitir}
          style={{
            width: 120,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <ButtonSecundary
          icon={faMap}
          onPress={() => navigation.navigate('MapExplore')}
          iconColor={COLORS.dark.textPrimary}
          style={{
            width: 100,
            marginLeft: 10,
          }}
        />
      </View>
      <TextBase
        text={'Gimnasios cerca tuyo'}
        color={'#fff'}
        fontFamily={'AirbnbCereal_W_Bd'}
        size={24}
        style={{marginVertical: 20}}
      />

      <FlatList
        data={places}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <CardGym
              index={index}
              item={item}
              key={index}
              onPress={onPressGym}
            />
          );
        }}
      />
    </View>
  );
}
