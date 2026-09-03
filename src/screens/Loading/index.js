import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import {COLORS} from '../../style/style';

export default function Loading() {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const breathe = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Arranca invisible y aparece con un fundido rápido para no generar un
    // corte brusco justo cuando el splash nativo (mismo logo) se oculta.
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [fadeIn]);

  const startBreathing = () => {
    // Una vez que el logo termina de armarse, lo dejamos "respirando" en
    // loop para que se sienta vivo mientras se resuelve el login.
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1.06,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{opacity: fadeIn, transform: [{scale: breathe}]}}>
        <LottieView
          source={require('../../assets/lottie-animations/logo.json')}
          autoPlay
          loop={false}
          onAnimationFinish={startBreathing}
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 170,
  },
});
