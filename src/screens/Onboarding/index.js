import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import TextBase from '../../components/Base/TextBase';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDumbbell, faTrophy} from '@fortawesome/free-solid-svg-icons';
import AnimatedLogo from '../../components/Icon/AnimatedLogo';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../style/style';

export default function Onboarding({navigation}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const onPressTrainer = () => {
    navigation.navigate('SignUp', {role: 'TRAINER'});
  };

  const onPressChamp = () => {
    navigation.navigate('SignUp', {role: 'CHAMP'});
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <View style={styles.mainContent}>
          <AnimatedLogo size={160} />

          <View style={styles.textContainer}>
            <TextBase
              text={'¿Qué tipo de usuario eres?'}
              color={'#fff'}
              size={28}
              lines={2}
              fontFamily={'AirbnbCereal_W_Bd'}
              style={styles.title}
            />
            {/* <TextBase
              text={'Selecciona tu rol para comenzar'}
              color={COLORS.dark.textMuted}
              size={16}
              fontFamily={'AirbnbCereal_W_Bk'}
              style={styles.subtitle}
            /> */}
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={onPressTrainer} activeOpacity={0.7}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={[
                COLORS.dark.primaryLight,
                COLORS.dark.primary,
                COLORS.dark.primaryDark,
              ]}
              style={styles.optionButton}>
              <FontAwesomeIcon icon={faDumbbell} size={20} color="#fff" />
              <TextBase
                text={'Entrenador'}
                color={'#fff'}
                size={16}
                fontFamily={'AirbnbCereal_W_Bd'}
                style={styles.buttonText}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, styles.champButton]}
            onPress={onPressChamp}
            activeOpacity={0.7}>
            <Image
              alt="image-champ"
              source={require('../../assets/image/Bitmap.png')}
              style={styles.icon}
            />
            <TextBase
              text={'Champ'}
              color={COLORS.dark.background}
              size={16}
              fontFamily={'AirbnbCereal_W_Bd'}
              style={styles.buttonText}
            />
          </TouchableOpacity>
        </View>
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
  content: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 60,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  optionsContainer: {
    width: '100%',
    gap: 12,
    paddingHorizontal: 20,
  },
  optionButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  champButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    marginLeft: 4,
  },
});
