import {View, ImageBackground, Platform, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import TextBase from '../../../components/Base/TextBase';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';
import ButtonSecundary from '../../../components/Buttons/ButtonSecundary';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../../store/authStore';

export default function TrainerOnboarding() {
  const navigation = useNavigation();
  const userInfo = useAuthStore(state => state.userInfo);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true; // Esto previene el comportamiento por defecto de ir atrás
      },
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        alt="image-trainer-onboarding"
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 50,
        }}
        resizeMethod="resize"
        source={require('../../../assets/image/trainerOnboarding.png')}>
        <TextBase
          text={`Bienvenido ${userInfo?.firstName}!`}
          color={'#fff'}
          lines={3}
          size={30}
          fontFamily={
            Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded'
          }
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            width: '90%',
          }}
        />

        <TextBase
          text={'El camino para convertirte en un entrenador\ncomienza aquí.'}
          fontFamily={'AirbnbCereal_W_Bk'}
          style={{textAlign: 'center', marginVertical: 20}}
          lines={2}
          size={16}
          color={'#fff'}
        />
        <ButtonGradient
          text={'Agregar un champ'}
          onPress={() => navigation.navigate('CreateChamp')}
        />
        <ButtonSecundary
          style={{marginTop: 20, position: 'relative', zIndex: 9999}}
          text={'Ir a panel de entrenador'}
          onPress={() => navigation.navigate('TrainerDashboard')}
        />
      </ImageBackground>
    </View>
  );
}
