import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions, Animated, StyleSheet} from 'react-native';
import {COLORS} from '../../../style/style';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const CountdownScreen = ({navigation, route}) => {
  const [count, setCount] = useState(3);
  const animatedValue = useRef(new Animated.Value(1)).current;
  const {width, height} = Dimensions.get('window');
  const {rutineId, rutineXChampId} = route.params;

  useEffect(() => {
    // Empezar la cuenta regresiva
    const interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === 1) {
          clearInterval(interval);
          // Navegar a StartRutine después de completar la cuenta regresiva
          navigation.replace('StartRutine', {
            id: rutineId,
            rutineXChampId: rutineXChampId,
          });
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    // Animación de pulso para cada número
    const pulseAnimation = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (count > 0) {
          pulseAnimation();
        }
      });
    };

    pulseAnimation();

    return () => clearInterval(interval);
  }, [animatedValue, count, navigation, rutineId, rutineXChampId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <LinearGradient
          colors={['#FF6B00', '#FF9255']}
          style={styles.circleContainer}>
          <Animated.Text
            style={[styles.countText, {transform: [{scale: animatedValue}]}]}>
            {count}
          </Animated.Text>
        </LinearGradient>
        <Animated.Text style={styles.readyText}>
          Prepárate para comenzar
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  countText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  readyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default CountdownScreen;
