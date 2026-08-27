import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PanResponder,
} from 'react-native';
import TextBase from './Base/TextBase';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {formatTime, ActiveRoutineTracker} from '../screens/Rutines/StartRutine';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Obtener dimensiones de la pantalla
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Claves para almacenar posición en AsyncStorage
const POSITION_STORAGE_KEY = '@floating_timer_position';

const FloatingTimerBubble = () => {
  const [seconds, setSeconds] = useState(
    ActiveRoutineTracker.getElapsedSeconds(),
  );
  const [isActive, setIsActive] = useState(
    ActiveRoutineTracker.isActive || false,
  );
  const navigation = useNavigation();

  // Valores animados para la burbuja
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  // Valores para la posición absoluta (coordenadas en pantalla)
  const translateX = useSharedValue(SCREEN_WIDTH - 120);
  const translateY_abs = useSharedValue(SCREEN_HEIGHT - 150);

  // Para mantener la posición después de arrastrar
  const [position, setPosition] = useState({
    x: SCREEN_WIDTH - 120,
    y: SCREEN_HEIGHT - 150,
  });

  // Cargar la posición guardada al iniciar
  useEffect(() => {
    const loadSavedPosition = async () => {
      try {
        const savedPosition = await AsyncStorage.getItem(POSITION_STORAGE_KEY);
        if (savedPosition) {
          const {x, y} = JSON.parse(savedPosition);
          // Establecer límites para asegurar que esté dentro de la pantalla
          const safeX = Math.max(10, Math.min(x, SCREEN_WIDTH - 120));
          const safeY = Math.max(50, Math.min(y, SCREEN_HEIGHT - 120));

          // Actualizar las posiciones
          setPosition({x: safeX, y: safeY});
          translateX.value = safeX;
          translateY_abs.value = safeY;
        }
      } catch (error) {
        console.error('Error al cargar la posición guardada:', error);
      }
    };

    loadSavedPosition();
  }, [translateX, translateY_abs]);

  // Un solo intervalo que lee el tiempo real transcurrido desde el timestamp
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(ActiveRoutineTracker.getElapsedSeconds());
      setIsActive(ActiveRoutineTracker.isActive);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Configurar animaciones basadas en el estado activo
  useEffect(() => {
    if (isActive) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.05, {duration: 800, easing: Easing.ease}),
          withTiming(1, {duration: 800, easing: Easing.ease}),
        ),
        -1,
        true,
      );

      translateY.value = withRepeat(
        withSequence(
          withTiming(-3, {duration: 1200, easing: Easing.ease}),
          withTiming(3, {duration: 1200, easing: Easing.ease}),
        ),
        -1,
        true,
      );
    } else {
      scale.value = withTiming(1);
      translateY.value = withTiming(0);
    }
  }, [isActive, scale, translateY]);

  // Función para guardar la posición en AsyncStorage
  const savePosition = async (x, y) => {
    try {
      await AsyncStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify({x, y}));
    } catch (error) {
      console.error('Error al guardar la posición:', error);
    }
  };

  // Configurar PanResponder para hacer el componente arrastrable
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // Actualizar posición mientras se arrastra
        translateX.value = position.x + gesture.dx;
        translateY_abs.value = position.y + gesture.dy;
      },
      onPanResponderRelease: (event, gesture) => {
        // Limitar posición dentro de la pantalla
        let newX = position.x + gesture.dx;
        let newY = position.y + gesture.dy;

        // Evitar que salga de la pantalla
        newX = Math.max(10, Math.min(newX, SCREEN_WIDTH - 120));
        newY = Math.max(50, Math.min(newY, SCREEN_HEIGHT - 120));

        // Aplicar efecto de spring al soltar
        translateX.value = withSpring(newX, {
          damping: 20,
          stiffness: 90,
        });
        translateY_abs.value = withSpring(newY, {
          damping: 20,
          stiffness: 90,
        });

        // Actualizar la posición almacenada
        setPosition({
          x: newX,
          y: newY,
        });

        // Guardar la posición para persistencia
        savePosition(newX, newY);
      },
    }),
  ).current;

  // Estilo animado para la burbuja
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      top: 0,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY_abs.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  });

  // Manejar el toque en la burbuja
  const handlePress = () => {
    if (ActiveRoutineTracker.isActive && ActiveRoutineTracker.rutineId) {
      navigation.navigate('StartRutine', {
        id: ActiveRoutineTracker.rutineId,
      });
    }
  };

  // No renderizar si no hay rutina activa
  if (!ActiveRoutineTracker.isActive) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.floatingContainer, animatedStyle]}
      {...panResponder.panHandlers}>
      <TouchableOpacity
        style={styles.floatingBubble}
        onPress={handlePress}
        activeOpacity={0.8}>
        <LinearGradient
          colors={['#FF6B00', '#FF8800', '#FF5100']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradientBubble}>
          <TextBase
            color={'#fff'}
            text={seconds > 0 ? formatTime(seconds) : '00:00:00'}
            fontFamily="AirbnbCereal_W_Bd"
            size={18}
          />
          <FontAwesomeIcon
            icon={faAngleRight}
            size={21}
            color="#fff"
            style={{marginLeft: 5}}
          />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    zIndex: 9999,
    width: 195,
    height: 65,
  },
  floatingBubble: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradientBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
});

export default FloatingTimerBubble;
