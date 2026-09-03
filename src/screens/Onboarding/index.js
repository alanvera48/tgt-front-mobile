import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import TextBase from '../../components/Base/TextBase';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faDumbbell,
  faTrophy,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import AuthBackground from '../../components/Background/AuthBackground';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../style/style';

const RoleCard = ({icon, title, subtitle, onPress}) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.card}>
    <View style={styles.iconBadge}>
      <FontAwesomeIcon icon={icon} size={20} color={COLORS.dark.primary} />
    </View>
    <View style={styles.cardText}>
      <TextBase
        text={title}
        color={'#fff'}
        size={17}
        fontFamily={'AirbnbCereal_W_Bd'}
      />
      <TextBase
        text={subtitle}
        color={COLORS.dark.textMuted}
        size={13}
        lines={2}
        fontFamily={'AirbnbCereal_W_Bk'}
        style={styles.cardSubtitle}
      />
    </View>
    <FontAwesomeIcon
      icon={faChevronRight}
      size={16}
      color={COLORS.dark.textMuted}
    />
  </TouchableOpacity>
);

export default function Onboarding({navigation}) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(24)).current;
  const breathe = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateAnim]);

  const startBreathing = () => {
    // Una vez que el logo termina de armarse, lo dejamos "respirando" en
    // loop para que se sienta vivo.
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

  const onPressTrainer = () => {
    navigation.navigate('SignUp', {role: 'TRAINER'});
  };

  const onPressChamp = () => {
    navigation.navigate('SignUp', {role: 'CHAMP'});
  };

  return (
    <View style={styles.container}>
      <AuthBackground />

      {navigation.canGoBack() && (
        <TouchableOpacity
          hitSlop={10}
          style={[styles.backButton, {top: insets.top + 12}]}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} size={22} color="#fff" />
        </TouchableOpacity>
      )}

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{translateY: translateAnim}],
          },
        ]}>
        <View style={styles.mainContent}>
          <Animated.View style={{transform: [{scale: breathe}]}}>
            <LottieView
              source={require('../../assets/lottie-animations/logo.json')}
              autoPlay
              loop={false}
              onAnimationFinish={startBreathing}
              style={styles.logo}
            />
          </Animated.View>

          <View style={styles.textContainer}>
            <TextBase
              text={'¿Qué tipo de usuario sos?'}
              color={'#fff'}
              size={26}
              lines={2}
              fontFamily={'AirbnbCereal_W_Bd'}
              style={styles.title}
            />
            <TextBase
              text={'Elegí tu perfil para comenzar'}
              color={COLORS.dark.textMuted}
              size={15}
              fontFamily={'AirbnbCereal_W_Bk'}
              style={styles.subtitle}
            />
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <RoleCard
            icon={faDumbbell}
            title={'Entrenador'}
            subtitle={'Gestioná tus champs, creá rutinas y dietas'}
            onPress={onPressTrainer}
          />
          <RoleCard
            icon={faTrophy}
            title={'Champ'}
            subtitle={'Entrená con un plan hecho a tu medida'}
            onPress={onPressChamp}
          />
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
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    padding: 5,
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
    gap: 32,
  },
  logo: {
    width: 110,
    height: 144,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    gap: 14,
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 18,
    padding: 16,
    gap: 14,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(223, 72, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardSubtitle: {
    marginTop: 2,
  },
});
