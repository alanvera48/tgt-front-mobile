import React, {useState} from 'react';
import {BounceInDown, BounceOutDown} from 'react-native-reanimated';
import {Dimensions, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {COLORS} from '../../../style/style';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import TextBase from '../../../components/Base/TextBase';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';

const {dark: theme} = COLORS;

const LottieAnimation = () => {
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          zIndex: 3,
        }}>
        <LottieView
          source={require('../../../assets/lottie-animations/confeti.json')}
          autoPlay
          loop={false}
          style={{
            width: '100%',
            height: 500,
          }}
          duration={3200}
          onAnimationFinish={() => setVisible(false)}
        />
      </View>
    );
  }
  return null;
};

export const FinishRutinePopUp = () => {
  const navigation = useNavigation();
  const AnimatedView = Animated.createAnimatedComponent(View);

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <LottieAnimation />
      <AnimatedView entering={BounceInDown} exiting={BounceOutDown}>
        <View
          style={[
            {
              borderTopWidth: 1,
              backgroundColor: theme.backgroundLight,
              borderTopColor: theme.background,
              borderRadius: 20,
            },
          ]}>
          <View
            style={[
              {
                alignItems: 'center',
                backgroundColor: theme.background,
                paddingHorizontal: 30,
                paddingVertical: 50,
                borderRadius: 20,
              },
            ]}>
            <TextBase
              color={'#ffff'}
              text={'Has terminado la rutina'}
              fontFamily="AirbnbCereal_W_Bd"
              size={24}
              style={{marginBottom: 40}}
            />
            <ButtonGradient
              text={'Volver al home'}
              onPress={() => navigation.navigate('UserDashboard')}
            />
          </View>
        </View>
      </AnimatedView>
    </View>
  );
};
