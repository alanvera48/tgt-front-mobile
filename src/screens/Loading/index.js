import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, Easing} from 'react-native';
import AnimatedLogo from '../../components/Icon/AnimatedLogo';
import {COLORS} from '../../style/style';

export default function Loading() {
  const pulse = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.85,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{scale: pulse}], opacity: pulse}}>
        <AnimatedLogo size={120} />
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
});
