import React, {useState, useRef} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextBase from '../../components/Base/TextBase';
import {COLORS} from '../../style/style';
import Logo from '../../components/Logo';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  FadeIn,
} from 'react-native-reanimated';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const CARD_SPACING = 30;

const PlanCard = ({
  title,
  features,
  price,
  recommended,
  isSelected,
  onSelect,
  freeTrialAvailable,
}) => {
  const scale = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      borderWidth: isSelected ? 3 : 0,
      borderColor: COLORS.dark.primaryLight,
    };
  });

  const handlePress = () => {
    scale.value = withTiming(0.95, {duration: 100}, () => {
      scale.value = withTiming(1, {duration: 100});
    });
    onSelect();
  };

  let gradientColors = [
    COLORS.dark.primaryLight,
    COLORS.dark.primary,
    COLORS.dark.primaryDark,
  ];
  if (title.includes('Premium')) {
    gradientColors = ['#D4A720', '#B18E25', '#B08913'];
  } else if (title.includes('Gratuita')) {
    gradientColors = ['#4A00FF', '#3722B1', '#2A1177'];
  }

  return (
    <AnimatedTouchable
      style={[styles.cardContainer, cardStyle]}
      onPress={handlePress}>
      {recommended && (
        <View style={styles.recommendedBadge}>
          <TextBase
            text="Recomendado"
            size={14}
            fontFamily="AirbnbCereal_W_Bd"
            color="#fff"
          />
        </View>
      )}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={gradientColors}
        style={styles.card}>
        {isSelected && (
          <View style={styles.selectedBadge}>
            <FontAwesomeIcon icon={faCheck} size={16} color="#fff" />
          </View>
        )}

        <TextBase
          text={title}
          size={20}
          fontFamily="AirbnbCereal_W_Bd"
          color="#fff"
          style={{marginBottom: 15}}
        />

        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <View style={styles.bulletPoint} />
            <TextBase
              text={feature}
              size={14}
              fontFamily="AirbnbCereal_W_Md"
              color="#fff"
              style={{flex: 1}}
            />
          </View>
        ))}

        <View style={styles.priceContainer}>
          <TextBase
            text={price}
            size={24}
            fontFamily="AirbnbCereal_W_Bd"
            color="#fff"
          />
          {title !== 'Versión Gratuita' && (
            <TextBase
              text="+ impuestos"
              size={12}
              fontFamily="AirbnbCereal_W_Bk"
              color="#fff"
              style={{marginTop: 5}}
            />
          )}
        </View>

        {freeTrialAvailable && (
          <TextBase
            text="Incluye 1 mes de prueba gratis"
            size={14}
            fontFamily="AirbnbCereal_W_Bd"
            color="#FFFF99"
            style={{marginTop: 10}}
          />
        )}
      </LinearGradient>
    </AnimatedTouchable>
  );
};

const plans = [
  {
    id: 'basic',
    title: 'Plan Entrenador Básico',
    features: [
      'Hasta 20 champs asignables',
      'Hasta 10 rutinas por champ',
      'Estadísticas básicas',
      'Chat con tus champs',
      'Soporte por email',
    ],
    price: '$15/mes',
    freeTrialAvailable: true,
  },
  {
    id: 'premium',
    title: 'Plan Entrenador Premium',
    features: [
      'Hasta 50 champs asignables',
      'Rutinas ilimitadas',
      'Planes de nutrición',
      'Estadísticas avanzadas',
      'Chat prioritario',
      'Soporte 24/7',
    ],
    price: '$30/mes',
    recommended: true,
    freeTrialAvailable: true,
  },
  {
    id: 'free',
    title: 'Versión Gratuita',
    features: [
      'Hasta 5 champs asignables',
      'Hasta 3 rutinas por champ',
      'Estadísticas básicas',
      'Funcionalidades limitadas',
      'Duración: 1 mes',
    ],
    price: 'Gratis',
    freeTrialAvailable: false,
  },
];

export default function TrainerPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const handleContinue = () => {
    if (!selectedPlan) return;

    // Si es versión gratuita, ir directamente al onboarding
    if (selectedPlan === 'free') {
      navigation.navigate('TrainerOnboarding', {screen: 'GeneralTrainer'});
      return;
    }

    // Si es un plan de pago, ir a la pantalla de pago
    navigation.navigate('PaymentMethod', {
      plan: selectedPlan,
      price: selectedPlan === 'basic' ? '$15/mes' : '$30/mes',
    });
  };

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderPlanCard = ({item}) => (
    <Animated.View
      style={{width: CARD_WIDTH, marginRight: CARD_SPACING}}
      entering={FadeIn}>
      <PlanCard
        title={item.title}
        features={item.features}
        price={item.price}
        recommended={item.recommended}
        isSelected={selectedPlan === item.id}
        onSelect={() => setSelectedPlan(item.id)}
        freeTrialAvailable={item.freeTrialAvailable}
      />
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Logo width={80} height={70} />

          <TextBase
            text="Selecciona tu Plan"
            size={28}
            fontFamily="AirbnbCereal_W_Bd"
            color="#fff"
            style={{marginVertical: 20}}
          />
        </View>

        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={plans}
            renderItem={renderPlanCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + CARD_SPACING}
            decelerationRate="fast"
            contentContainerStyle={styles.carousel}
            viewabilityConfig={{itemVisiblePercentThreshold: 50}}
            onViewableItemsChanged={onViewableItemsChanged}
            initialScrollIndex={0}
            snapToAlignment="start"
            bounces={false}
          />
        </View>

        <View style={styles.footer}>
          <ButtonGradient
            text="Continuar"
            icon={faAngleRight}
            onPress={handleContinue}
            disabled={!selectedPlan}
            style={{opacity: selectedPlan ? 1 : 0.7}}
          />

          <TextBase
            text="Facturado a través de Mercado Pago"
            size={14}
            fontFamily="AirbnbCereal_W_Bk"
            color="#999"
            style={{marginTop: 20}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  carousel: {
    paddingLeft: 25,
    paddingRight: SCREEN_WIDTH * 0.5,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: 420,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: CARD_SPACING,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    padding: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  priceContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  recommendedBadge: {
    backgroundColor: '#5345F7',
    padding: 8,
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  selectedBadge: {
    position: 'absolute',
    zIndex: 2,
    bottom: 10,
    right: 10,
    backgroundColor: '#00CC66',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
