import {View, StyleSheet, ImageBackground, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import ButtonSecundary from '../../components/Buttons/ButtonSecundary';
import TextBase from '../../components/Base/TextBase';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import LinearGradient from 'react-native-linear-gradient';
import {useAuthStore} from '../../store/authStore';

export default function Explore({navigation}) {
  const trainerData = useAuthStore(state => state.trainerData);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true; // Esto previene el comportamiento por defecto de ir atrás
      },
    );

    return () => backHandler.remove();
  }, []);

  const onPress = () => {
    navigation.navigate('MapExplore');
  };

  const navigateToHome = () => {
    navigation.navigate('UserDashboard');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/explore_screen.webp')}
        alt="image-explore"
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['transparent', 'rgba(0,0,0,0.70)', 'rgba(0,0,0,0.80)']}
          style={styles.gradientContainer}>
          <TextBase
            text={'Entrenadores cerca tuyo'}
            color={'#fff'}
            fontFamily={'AirbnbCereal_W_Bd'}
            size={24}
          />
          <TextBase
            fontFamily={'AirbnbCereal_W_Bk'}
            lines={3}
            color={'#fff'}
            size={16}
            style={{
              textAlign: 'center',
              paddingHorizontal: 20,
              paddingBottom: 20,
              paddingTop: 6,
            }}
            text={
              'Aprende con expertos en fitness, a tu propio ritmo y con contenidos 100% actualizados.'
            }
          />

          {trainerData === null && (
            <ButtonSecundary
              onPress={onPress}
              text={'Explora'}
              style={{marginBottom: 24}}
            />
          )}
          <ButtonGradient text={'Continuar'} onPress={navigateToHome} />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  gradientContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    padding: 20,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 100,
    alignItems: 'center',
  },
});
