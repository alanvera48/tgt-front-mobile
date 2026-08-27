import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  TextInput,
} from 'react-native';
import TextBase from '../../../components/Base/TextBase';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';
import {COLORS} from '../../../style/style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import {useGetRutineById} from '../../../hooks/rutines/queries';
import {useSaveRoutineHistoryMutation} from '../../../hooks/rutines/queries';
import CollapsibleRutine from '../../../components/Collapsible/CollapsibleRutine';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useGroupedExercises} from '../../../hooks/rutines/useGroupedExercises';
import {supersetStyles} from '../../../style/supersetStyles';

// Función para formatear el tiempo (hh:mm:ss)
export const formatTime = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
};

const CountdownTimer = ({onComplete}) => {
  const [count, setCount] = useState(3);
  const animatedValue = useRef(new Animated.Value(1)).current;
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    // Empezar la cuenta regresiva
    const interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    // Animación de pulso para cada número
    const pulseAnimation = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.3,
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
  }, [animatedValue, count, onComplete]);

  if (count === 0) return null;

  return (
    <View
      style={{
        position: 'absolute',
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}>
      <LinearGradient
        colors={['#FF6B00', '#FF9255']}
        style={{
          width: 150,
          height: 150,
          borderRadius: 75,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Text
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: '#FFFFFF',
            transform: [{scale: animatedValue}],
          }}>
          {count}
        </Animated.Text>
      </LinearGradient>
    </View>
  );
};

// Objeto global para persistencia entre componentes
export const ActiveRoutineTracker = {
  startedAt: null,
  isActive: false,
  rutineId: null,
  exercises: [],

  startTracking: function (rutineId, exercises) {
    this.isActive = true;
    this.rutineId = rutineId;
    this.exercises = exercises;
    if (!this.startedAt) {
      this.startedAt = Date.now();
    }
  },

  stopTracking: function () {
    this.isActive = false;
    this.startedAt = null;
    this.rutineId = null;
    this.exercises = [];
  },

  getElapsedSeconds: function () {
    if (!this.isActive || !this.startedAt) {
      return 0;
    }
    return Math.floor((Date.now() - this.startedAt) / 1000);
  },
};

export default function StartRutine({route}) {
  const {data, isPending} = useGetRutineById(route.params.id);
  const [startTimer, setStartTimer] = useState(false);
  const [seconds, setSeconds] = useState(
    ActiveRoutineTracker.getElapsedSeconds(),
  );
  const [showCountdown, setShowCountdown] = useState(false);
  const [notes, setNotes] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const timerRef = useRef(null);
  const saveRoutineHistory = useSaveRoutineHistoryMutation();

  const exercisesList = useGroupedExercises(data?.data?.exercises);

  // Actualizar el display del timer cada segundo leyendo el tiempo real transcurrido
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (startTimer) {
      timerRef.current = setInterval(() => {
        setSeconds(ActiveRoutineTracker.getElapsedSeconds());
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  // Al montar el componente, configurar el tracker
  useEffect(() => {
    if (data?.data && isFocused) {
      if (!ActiveRoutineTracker.isActive) {
        // Configurar el tracker con los datos de la rutina actual
        ActiveRoutineTracker.startTracking(
          route.params.id,
          data.data.exercises,
        );
      }
      setSeconds(ActiveRoutineTracker.getElapsedSeconds());
    }
  }, [data, isFocused, route.params.id]);

  const onSubmit = async () => {
    // Capturar el tiempo exacto antes de detener todo
    const finalSeconds = ActiveRoutineTracker.getElapsedSeconds();
    setStartTimer(false);

    try {
      const payload = {
        routineChampId: route.params.rutineXChampId,
        date: new Date().toISOString(),
        timeSpent: finalSeconds,
        caloriesBurned: Math.round(finalSeconds * 0.15),
        notes: notes,
      };

      await saveRoutineHistory.mutateAsync(payload);
    } catch (error) {
      console.error('Error submitting routine history:', error);
    }

    navigation.navigate('RoutineSummary', {
      rutineId: route.params.id,
      totalTime: finalSeconds,
      exercises: data?.data?.exercises || [],
    });

    ActiveRoutineTracker.stopTracking();
  };

  const handleToggleTimer = () => {
    if (!startTimer) {
      // Mostrar countdown antes de iniciar
      setShowCountdown(true);
    } else {
      // Si ya está activo, simplemente detener
      setStartTimer(false);
    }
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setStartTimer(true);

    // Si se inicia, asegurarse de que el tracker esté configurado
    if (!ActiveRoutineTracker.isActive) {
      ActiveRoutineTracker.startTracking(
        route.params.id,
        data?.data?.exercises || [],
      );
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.dark.background,
        }}>
        {showCountdown && (
          <CountdownTimer onComplete={handleCountdownComplete} />
        )}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingHorizontal: 15,
                paddingBottom: 30,
                alignItems: 'center',
              }}>
              <TextBase
                color={'#ffff'}
                text={'Ejercicios'}
                fontFamily="AirbnbCereal_W_Bd"
                size={24}
                style={{marginBottom: 40}}
              />
              {exercisesList?.map((item, index) => {
                if (item.type === 'regular') {
                  return (
                    <CollapsibleRutine
                      key={index}
                      item={item.exercise}
                      index={index}
                    />
                  );
                }

                if (item.type === 'superset') {
                  return (
                    <View
                      key={`superset-${item.superSetId}`}
                      style={supersetStyles.supersetContainer}>
                      <View style={supersetStyles.supersetLabel}>
                        <TextBase
                          text="💡 Realizar estos ejercicios consecutivamente sin descanso entre ellos"
                          size={14}
                          color={COLORS.dark.textPrimary}
                          fontFamily="AirbnbCereal_W_Bd"
                          lines={2}
                          style={{textAlign: 'center'}}
                        />
                      </View>
                      {item.exercises?.map((exercise, exerciseIndex) => (
                        <CollapsibleRutine
                          key={`${item.superSetId}-${exerciseIndex}`}
                          item={exercise}
                          index={exerciseIndex}
                        />
                      ))}
                    </View>
                  );
                }

                return null;
              })}
            </View>
            {/* <TextBase
              color={'#ffff'}
              text={'Tiempo ejercitado'}
              fontFamily="AirbnbCereal_W_Bd"
              size={24}
              style={{marginBottom: 40}}
            />
            <View style={styles.timerCircle}>
              <Text style={{color: 'white', fontSize: 42}}>
                {formatTime(seconds)}
              </Text>
            </View> */}
          </View>
          <View
            style={{
              alignItems: 'center',
              padding: 20,
              paddingVertical: 45,
            }}>
            <View style={styles.notesContainer}>
              <TextBase
                color={'#ffff'}
                text={'Notas de la rutina'}
                fontFamily="AirbnbCereal_W_Bd"
                size={18}
                style={{marginBottom: 10}}
              />
              <TextInput
                style={styles.notesInput}
                placeholder="Escribe tus notas aquí..."
                placeholderTextColor="#7d7d7d"
                multiline
                value={notes}
                onChangeText={setNotes}
                textAlignVertical="top"
                maxLength={300}
              />
            </View>
            <ButtonGradient
              isLoading={saveRoutineHistory.isPending}
              text={'Terminar Rutina'}
              onPress={() => onSubmit()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  timerCircle: {
    borderColor: COLORS.dark.backgroundLight,
    borderWidth: 10,
    width: 230,
    height: 230,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesContainer: {
    width: '100%',
    marginBottom: 30,
  },
  notesInput: {
    paddingTop: 10,
    borderWidth: 1,
    borderColor: COLORS.dark.backgroundLight,
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    height: 120,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});
