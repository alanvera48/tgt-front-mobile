import {View, StyleSheet, SafeAreaView} from 'react-native';
import {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapView from 'react-native-maps';

import React, {useEffect, useRef, useState} from 'react';
import {
  ITEM_PREVIEW,
  ITEM_PREVIEW_HEIGHT,
  ITEM_SPACING,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  screen,
} from '../../utils/getPlaces';

import AppIntroSlider from 'react-native-app-intro-slider';

import LinearGradient from 'react-native-linear-gradient';
import {mapCustomStyle} from '../../style/style';

import ButtonSecundary from '../../components/Buttons/ButtonSecundary';
import {faList} from '@fortawesome/free-solid-svg-icons';
import CardGym from '../../components/Card/CardGym/CardGym';
import {
  useGetCurrentLocation,
  useGetNearbyPlaces,
} from '../../hooks/gym/queries';
import TextBase from '../../components/Base/TextBase';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import {COLORS} from '../../style/style';

const {dark: theme} = COLORS;

export default function MapExplore({navigation}) {
  const [currentPlace, setCurrentPlace] = useState();

  const onPressGym = gym_place_id => {
    navigation.navigate('TrainerList', {
      gym_place_id,
    });
  };

  const onPressOmitir = () => navigation.navigate('UserDashboard');

  const sliderRef = useRef(null);
  const mapView = useRef(null);

  const avatars = [
    {
      src: 'https://example.com.jpg',
      alt: 'Sandeep Srivastva',
      color: '$emerald600',
    },
    {src: 'https://example.com.jpg', alt: 'Arjun Kapoor', color: '$cyan600'},
    {
      src: 'https://example.com.jpg',
      alt: 'Ritik Sharma ',
      color: '$indigo600',
    },
    {src: 'https://example.com.jpg', alt: 'Akhil Sharma', color: '$gray600'},
    {src: 'https://example.com.jpg', alt: 'Rahul Sharma ', color: '$red400'},
  ];
  const extraAvatars = avatars.slice(3);
  const remainingCount = extraAvatars.length;

  useEffect(() => {
    if (currentPlace) {
      mapView.current.animateToRegion(
        {
          latitude: currentPlace.geometry.location.lat,
          longitude: currentPlace.geometry.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        2000,
      );
    }
  }, [currentPlace]);

  const {
    data: location,
    isLoading: isLoadingLocation,
    error: locationError,
    refetch: refetchLocation,
  } = useGetCurrentLocation();
  const {data: gyms, isLoading: isLoadingPlaces} = useGetNearbyPlaces(
    location?.latitude,
    location?.longitude,
  );

  if (isLoadingLocation || isLoadingPlaces) {
    return <LoadingScreen backgroundColor={theme.background} />;
  }

  // Si no activamos la ubicación en el dispositivo
  if (locationError) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#1C1C1E',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextBase
          text={
            'Activa la ubicación en la configuración de tu dispositivo para continuar'
          }
          fontFamily={'AirbnbCereal_W_Bd'}
          lines={3}
          size={24}
          color={theme.textWhite}
          style={{marginHorizontal: 20, marginBottom: 50, textAlign: 'center'}}
        />
        <ButtonGradient
          text={'Buscar gimnasios cerca de tu ubicación'}
          isLoading={isLoadingPlaces}
          onPress={() => refetchLocation()}
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          zIndex: 9999,
          top: 40,
          right: 10,
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
          icon={faList}
          onPress={() => navigation.navigate('GymList')}
          iconColor={COLORS.dark.textPrimary}
          style={{
            width: 100,
            marginLeft: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        followsUserLocation={true}
        ref={mapView}
        customMapStyle={mapCustomStyle}
        region={
          // new AnimatedRegion({
          //   latitude: position?.latitude || 0,
          //   longitude: position?.longitude || 0,
          //   latitudeDelta: LATITUDE_DELTA || LATITUDE_DELTA,
          //   longitudeDelta: LONGITUDE_DELTA || LONGITUDE_DELTA,
          // })
          {
            latitude: location?.latitude || 0,
            longitude: location?.longitude || 0,
            latitudeDelta: LATITUDE_DELTA || 0.0922,
            longitudeDelta: LONGITUDE_DELTA || 0.0421,
          }
        }
        initialRegion={{
          latitude: -34.60376,
          longitude: -58.38162,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {gyms?.map((marker, i) => {
          return (
            <Marker
              key={marker.id}
              title={marker.name}
              coordinate={{
                latitude: Number(marker.geometry.location.lat),
                longitude: Number(marker.geometry.location.lng),
              }}
              onPress={() => {
                setCurrentPlace(gyms[i]);
                sliderRef.current.goToSlide(i);
              }}
            />
          );
        })}
      </MapView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['transparent', 'rgba(0,0,0,0.30)', 'rgba(0,0,0,0.20)']}
        style={styles.itemCarousel}>
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'relative',
          }}>
          <AppIntroSlider
            ref={sliderRef}
            data={gyms}
            renderItem={({item, index}) => {
              return (
                <CardGym
                  avatars={avatars}
                  index={index}
                  item={item}
                  remainingCount={remainingCount}
                  styles={styles.item}
                  key={index}
                  onPress={onPressGym}
                />
              );
            }}
            showDoneButton={false}
            showNextButton={false}
            showSkipButton={false}
            showPrevButton={false}
            dotStyle={{display: 'none'}}
            activeDotStyle={{display: 'none'}}
            onSlideChange={index => setCurrentPlace(gyms[index])}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  itemContainer: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    paddingHorizontal: ITEM_SPACING / 2 + ITEM_PREVIEW,
    position: 'absolute',
    height: 300,
    paddingTop: screen.height - ITEM_PREVIEW_HEIGHT - 64,
  },
  map: {
    backgroundColor: 'transparent',
    ...StyleSheet.absoluteFillObject,
  },
  itemCarousel: {
    position: 'absolute',
    width: '100%',
    height: 250,
    bottom: 0,
    padding: 20,
  },
});
