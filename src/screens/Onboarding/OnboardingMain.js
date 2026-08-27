import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextBase from '../../components/Base/TextBase';
import AppIntroSlider from 'react-native-app-intro-slider';

import ButtonSecundary from '../../components/Buttons/ButtonSecundary';
import axiosInstance from '../../helpers/api';
import {HStack} from '@gluestack-ui/themed';
import {useAuthStore} from '../../store/authStore';
import {COLORS} from '../../style/style';

const FontAkira = Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded';

const onboardingPages = [
  {
    backgroundColor: '#fff',
    image: 'onboardingone',
    title: 'COMENZA EL GRAN CAMBIO',
    subtitle: 'CON NUESTROS EXPERTOS',
  },
  {
    backgroundColor: '#fff',
    image: 'onboardingtwo',
    title: 'CREA TU PROPIO PLAN',
    subtitle: 'MANTENTE EN FORMA',
  },
  {
    backgroundColor: '#fff',
    image: 'onboardingthree',
    title: 'ACTION IS THE',
    subtitle: 'KEY TO ALL SUCCESS',
  },
];

const onboardingImages = {
  onboardingone: require('../../assets/image/onboarding-2.png'),
  onboardingtwo: require('../../assets/image/onboarding-3.png'),
  onboardingthree: require('../../assets/image/onboardinone.png'),
};

const renderItem = ({
  item,
  onPressStart,
  onPressLogin,
  isFirstTime,
  logoFadeAnim,
  logoScaleAnim,
}) => {
  if (item.item.title === 'ACTION IS THE') {
    return (
      <View style={styles.container}>
        <ImageBackground
          alt="image-onboarding-main"
          source={require('../../assets/image/onboarding-main.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={[styles.containersub, {paddingBottom: 80}]}>
            <Animated.Image
              alt="image-logo"
              source={require('../../assets/image/logo.png')}
              style={[
                styles.icon,
                {
                  opacity: logoFadeAnim,
                  transform: [{scale: logoScaleAnim}],
                },
              ]}
            />
            <Text style={styles.text}>Conoce a tu proximo entrenador</Text>
            <Text style={[styles.textLight, {marginBottom: 24}]}>
              Aprende de los mejores entrenadores y mantente en forma, con
              entrenamientos personalizados.
            </Text>
            <ButtonSecundary onPress={onPressStart} text={'Comenzar'} />
            <HStack>
              <Text style={[styles.textLight]}>Tienes una cuenta?</Text>
              <Pressable onPress={onPressLogin}>
                <Text
                  style={[
                    styles.colorPrimary,
                    {marginTop: 16, marginLeft: 12},
                  ]}>
                  Iniciar sesion
                </Text>
              </Pressable>
            </HStack>
            <Text style={{color: '#fff'}}>
              {axiosInstance.defaults.baseURL}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: 'black',
      }}>
      <ImageBackground
        alt="image-onboarding"
        source={onboardingImages[item.item.image]}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',
          paddingBottom: '30%',
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['transparent', 'rgba(0,0,0,0.70)', 'rgba(0,0,0,0.80)']}
          style={styles.gradientContainer}>
          <View style={styles.containerTitles}>
            <TextBase
              text={item.item.title}
              size={20}
              lines={2}
              style={{
                textAlign: 'center',
                marginBottom: 20,
              }}
              color={'#ffff'}
              fontFamily={FontAkira}
            />
            <TextBase
              text={item.item.subtitle}
              size={25}
              lines={2}
              style={{
                textAlign: 'center',
                marginBottom: 20,
              }}
              color={'#ffff'}
              fontFamily={FontAkira}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default function OnboardingMain({navigation}) {
  const isFirstTime = useAuthStore(state => state.isFirstTime);
  const logoFadeAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoFadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoScaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoFadeAnim, logoScaleAnim]);

  const onPressStart = () => {
    navigation.navigate('Onboarding');
  };

  const onPressLogin = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <AppIntroSlider
      data={isFirstTime ? [onboardingPages[2]] : onboardingPages}
      renderItem={item =>
        renderItem({
          item,
          onPressStart,
          onPressLogin,
          isFirstTime,
          logoFadeAnim,
          logoScaleAnim,
        })
      }
      showDoneButton={false}
      showNextButton={false}
      showSkipButton={false}
      showPrevButton={false}
      dotStyle={{
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: 20,
        height: 5,
        borderRadius: 0,
      }}
      activeDotStyle={{
        backgroundColor: COLORS.dark.primary,
        width: 40,
        height: 5,
        borderRadius: 0,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    // paddingBottom: 20,
  },
  containersub: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    width: 50,
    height: 60,
  },
  text: {
    marginTop: 14,
    width: 250,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded',
    fontSize: 24,
  },
  textLight: {
    marginTop: 16,
    maxWidth: 300,
    color: '#FFF',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'AirbnbCereal_W_Bk',
    fontSize: 16,
  },
  colorPrimary: {
    color: '#E34A01',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'AirbnbCereal_W_Bk',
  },
  gradientContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  containerTitles: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});
