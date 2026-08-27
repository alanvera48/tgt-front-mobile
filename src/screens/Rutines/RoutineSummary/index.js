import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TextBase from '../../../components/Base/TextBase';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';
import {COLORS} from '../../../style/style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faCalendarCheck,
  faStopwatch,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';

// Componente de animación de confetti
const ConfettiAnimation = () => {
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <View style={styles.confettiContainer}>
        <LottieView
          source={require('../../../assets/lottie-animations/confeti.json')}
          autoPlay
          loop={false}
          style={styles.confetti}
          duration={3200}
          onAnimationFinish={() => setVisible(false)}
        />
      </View>
    );
  }
  return null;
};

// Componente de ejercicio completado
const CompletedExercise = ({exercise, index}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 200).duration(400)}
      style={styles.exerciseCard}>
      <LinearGradient
        colors={['rgba(255, 123, 0, 0.2)', 'rgba(255, 88, 0, 0.1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.exerciseGradient}>
        <TextBase
          text={exercise.name}
          color="#FFF"
          fontFamily="AirbnbCereal_W_Bd"
          size={18}
          style={{marginBottom: 10}}
        />

        <View style={styles.exerciseDetails}>
          <View style={styles.detailItem}>
            <TextBase
              text="Series"
              color="#AAA"
              fontFamily="AirbnbCereal_W_Md"
              size={12}
            />
            <TextBase
              text={exercise.set}
              color="#FFF"
              fontFamily="AirbnbCereal_W_Bd"
              size={16}
            />
          </View>

          <View style={styles.detailItem}>
            <TextBase
              text="Repeticiones"
              color="#AAA"
              fontFamily="AirbnbCereal_W_Md"
              size={12}
            />
            <TextBase
              text={exercise.repetition}
              color="#FFF"
              fontFamily="AirbnbCereal_W_Bd"
              size={16}
            />
          </View>

          <View style={styles.detailItem}>
            <TextBase
              text="Descanso"
              color="#AAA"
              fontFamily="AirbnbCereal_W_Md"
              size={12}
            />
            <TextBase
              text={exercise.restTime}
              color="#FFF"
              fontFamily="AirbnbCereal_W_Bd"
              size={16}
            />
          </View>
        </View>

        <View style={styles.completedBadge}>
          <FontAwesomeIcon icon={faCalendarCheck} size={12} color="#FFF" />
          <TextBase
            text="Completado"
            color="#FFF"
            fontFamily="AirbnbCereal_W_Md"
            size={12}
            style={{marginLeft: 5}}
          />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

// Pantalla principal de resumen
const RoutineSummary = ({route}) => {
  const {rutineId, totalTime, exercises = []} = route.params || {};
  const navigation = useNavigation();

  // Formatear el tiempo total (función auxiliar)
  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let timeString = '';

    if (hours > 0) {
      timeString += `${hours} hr${hours > 1 ? 's' : ''} `;
    }

    if (minutes > 0) {
      timeString += `${minutes} min${minutes > 1 ? 's' : ''} `;
    }

    if (remainingSeconds > 0 || timeString === '') {
      timeString += `${remainingSeconds} seg${
        remainingSeconds !== 1 ? 's' : ''
      }`;
    }

    return timeString;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ConfettiAnimation />

      <View style={styles.header}>
        <TextBase
          text="¡Rutina Completada!"
          color="#FFF"
          fontFamily="AirbnbCereal_W_Bd"
          size={20}
        />
      </View>

      <Animated.View
        entering={FadeIn.duration(600)}
        style={styles.summaryContainer}>
        <View style={styles.timeContainer}>
          <FontAwesomeIcon
            icon={faStopwatch}
            size={26}
            color={COLORS.dark.textPrimary}
          />
          <View style={{marginLeft: 15}}>
            <TextBase
              text="Tiempo total de entrenamiento"
              color="#AAA"
              fontFamily="AirbnbCereal_W_Md"
              size={14}
            />
            <TextBase
              text={formatTime(totalTime)}
              color="#FFF"
              fontFamily="AirbnbCereal_W_Bd"
              size={20}
            />
          </View>
        </View>

        <TextBase
          text="Ejercicios completados"
          color="#FFF"
          fontFamily="AirbnbCereal_W_Bd"
          size={18}
          style={{marginTop: 30, marginBottom: 15, alignSelf: 'flex-start'}}
        />

        <ScrollView style={styles.exerciseList}>
          {exercises.map((exercise, index) => (
            <CompletedExercise key={index} exercise={exercise} index={index} />
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <ButtonGradient
            text="Volver al Inicio"
            onPress={() => navigation.navigate('UserDashboard')}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  confettiContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
    pointerEvents: 'none',
  },
  confetti: {
    width: '100%',
    height: 500,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContainer: {
    flex: 1,
    padding: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 15,
  },
  exerciseList: {
    flex: 1,
    marginBottom: 20,
  },
  exerciseCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  exerciseGradient: {
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 123, 0, 0.3)',
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  detailItem: {
    alignItems: 'center',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#00AA00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default RoutineSummary;
