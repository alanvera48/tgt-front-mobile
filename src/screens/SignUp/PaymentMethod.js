import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import TextBase from '../../components/Base/TextBase';
import {COLORS} from '../../style/style';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faCreditCard} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  FadeIn,
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

// Componente para el logo de Mercado Pago usando imagen
const MercadoPagoLogo = () => {
  return (
    <Image
      alt="image-mercadopago"
      source={require('../../assets/image/MP_RGB_HANDSHAKE_color-blanco_hori-izq.png')}
      style={{width: 150, height: 80, resizeMode: 'contain'}}
    />
  );
};

// Componente de tarjeta de crédito animada
const CreditCard = ({cardNumber, cardName, expiryDate, cvc}) => {
  const rotation = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);
  const [previousCardType, setPreviousCardType] = useState('unknown');

  // Valores animados para la transición de colores
  const colorProgress = useSharedValue(0);

  const handleFlip = () => {
    rotation.value = withSequence(
      withTiming(flipped ? 0 : 180, {duration: 300}),
    );
    setFlipped(!flipped);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${rotation.value}deg`,
        },
      ],
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${rotation.value + 180}deg`,
        },
      ],
      backfaceVisibility: 'hidden',
    };
  });

  // Función para determinar el tipo de tarjeta basado en el número
  const getCardType = () => {
    if (!cardNumber) return 'unknown';

    // Limpiamos el número para trabajar solo con dígitos
    const cleanNumber = cardNumber.replace(/\s+/g, '');

    // Visa: comienza con 4
    if (/^4/.test(cleanNumber)) return 'visa';

    // Mastercard: comienza con 51-55 o 2221-2720
    if (/^5[1-5]/.test(cleanNumber) || /^2[2-7][2-9][0-9]/.test(cleanNumber))
      return 'mastercard';

    // Amex: comienza con 34 o 37
    if (/^3[47]/.test(cleanNumber)) return 'amex';

    return 'unknown';
  };

  // Obtener el tipo de tarjeta
  const cardType = getCardType();

  // Animar el cambio de colores cuando cambia el tipo de tarjeta
  React.useEffect(() => {
    if (previousCardType !== cardType) {
      // Reiniciar la animación
      colorProgress.value = 0;
      // Animar al nuevo valor
      colorProgress.value = withTiming(1, {duration: 600});
      // Actualizar el tipo anterior
      setPreviousCardType(cardType);
    }
  }, [cardType, previousCardType, colorProgress]);

  // Configurar los colores y logos según el tipo de tarjeta
  const getCardConfig = () => {
    switch (cardType) {
      case 'visa':
        return {
          colors: ['#0055B7', '#00397B', '#002B5C'],
          name: 'VISA',
          logoColor: '#fff',
          logo: () => (
            <TextBase
              text="VISA"
              color="#FFF"
              size={24}
              fontFamily="AirbnbCereal_W_Bd"
              style={{alignSelf: 'flex-end'}}
            />
          ),
        };
      case 'mastercard':
        return {
          colors: ['#363636', '#232323', '#000000'],
          name: 'Mastercard',
          logoColor: '#fff',
          logo: () => (
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: '#FF5F00',
                  marginRight: -8,
                }}
              />
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: '#EB001B',
                  opacity: 0.8,
                }}
              />
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: '#F79E1B',
                  marginLeft: -8,
                }}
              />
            </View>
          ),
        };
      case 'amex':
        return {
          colors: ['#2E77BB', '#1C6EB2', '#0A65A8'],
          name: 'American Express',
          logoColor: '#fff',
          logo: () => (
            <TextBase
              text="AMEX"
              color="#FFF"
              size={20}
              fontFamily="AirbnbCereal_W_Bd"
              style={{alignSelf: 'flex-end'}}
            />
          ),
        };
      default:
        return {
          colors: ['#FF8C00', '#FF5F00', '#FF4500'],
          name: 'Tarjeta de Crédito',
          logoColor: '#fff',
          logo: () => (
            <View style={{alignSelf: 'flex-end', width: 30, height: 30}} />
          ),
        };
    }
  };

  const cardConfig = getCardConfig();

  // Animar los colores de la tarjeta
  const animatedColors = useAnimatedStyle(() => {
    if (previousCardType === cardType) {
      return {
        backgroundColor:
          colorProgress.value === 1
            ? cardConfig.colors[1]
            : cardConfig.colors[1],
      };
    }

    return {
      backgroundColor: cardConfig.colors[1],
    };
  });

  return (
    <TouchableOpacity onPress={handleFlip} activeOpacity={0.9}>
      <View style={styles.cardContainer}>
        {/* Frente de la tarjeta */}
        <Animated.View
          style={[styles.card, frontAnimatedStyle, animatedColors]}>
          <LinearGradient
            colors={cardConfig.colors}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.cardGradient}>
            <View style={styles.cardHeader}>{cardConfig.logo()}</View>
            <View style={styles.cardChip} />
            <TextBase
              text={cardNumber || '•••• •••• •••• ••••'}
              color="#FFF"
              size={18}
              fontFamily="AirbnbCereal_W_Md"
              style={{marginTop: 30}}
            />
            <View style={styles.cardFooter}>
              <View>
                <TextBase
                  text="TITULAR"
                  color="#FFF"
                  size={10}
                  fontFamily="AirbnbCereal_W_Md"
                />
                <TextBase
                  text={cardName || '••••••• •••••'}
                  color="#FFF"
                  size={14}
                  fontFamily="AirbnbCereal_W_Md"
                />
              </View>
              <View>
                <TextBase
                  text="VENCE"
                  color="#FFF"
                  size={10}
                  fontFamily="AirbnbCereal_W_Md"
                />
                <TextBase
                  text={expiryDate || '••/••'}
                  color="#FFF"
                  size={14}
                  fontFamily="AirbnbCereal_W_Md"
                />
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Reverso de la tarjeta */}
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            backAnimatedStyle,
            animatedColors,
          ]}>
          <LinearGradient
            colors={[
              cardConfig.colors[2],
              cardConfig.colors[1],
              cardConfig.colors[0],
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.cardGradient}>
            <View style={styles.cardStrip} />
            <View style={styles.cardCvcContainer}>
              <View style={styles.cardCvcStrip}>
                <TextBase
                  text={cvc || '•••'}
                  color="#000"
                  size={14}
                  fontFamily="AirbnbCereal_W_Md"
                  style={{textAlign: 'right', paddingRight: 10}}
                />
              </View>
            </View>
            <TextBase
              text="Para mayor seguridad, voltea tu tarjeta"
              color="#FFF"
              size={10}
              fontFamily="AirbnbCereal_W_Md"
              style={{alignSelf: 'center', marginTop: 20}}
            />
          </LinearGradient>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default function PaymentMethod({navigation, route}) {
  const {plan, price} = route.params;
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' o 'mercadopago'
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const formatCardNumber = text => {
    const cleaned = text.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substr(0, 19); // Limitar a 16 dígitos + 3 espacios
  };

  const formatExpiryDate = text => {
    const cleaned = text.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (cleaned.length > 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleSubmit = () => {
    // Validar según el método de pago
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardName || !expiryDate || !cvc) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Por favor completa todos los campos de la tarjeta',
        });
        return;
      }
    }

    // Simular éxito de pago
    Toast.show({
      type: 'success',
      text1: 'Pago realizado',
      text2: 'Tu suscripción ha sido activada correctamente',
    });

    // Navegar al onboarding
    setTimeout(() => {
      navigation.navigate('TrainerOnboarding', {screen: 'GeneralTrainer'});
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="#fff" />
        </TouchableOpacity>
        <TextBase
          text="Método de Pago"
          color="#fff"
          size={20}
          fontFamily="AirbnbCereal_W_Bd"
          style={{flex: 1, textAlign: 'center'}}
        />
        <View style={{width: 24}} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeIn.duration(500)}>
          <TextBase
            text={`Plan Seleccionado: ${
              plan === 'basic' ? 'Básico' : 'Premium'
            }`}
            color="#fff"
            size={18}
            fontFamily="AirbnbCereal_W_Bd"
            style={{marginBottom: 5}}
          />
          <TextBase
            text={`Precio: ${price}`}
            color={COLORS.dark.textPrimary}
            size={24}
            fontFamily="AirbnbCereal_W_Bd"
            style={{marginBottom: 20}}
          />
        </Animated.View>

        <View style={styles.paymentSelector}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'card' && styles.selectedPaymentOption,
            ]}
            onPress={() => setPaymentMethod('card')}>
            <Image
              alt="image-tarjetas"
              source={require('../../assets/image/tarjetas.png')}
              style={{
                width: 100,
                height: 45,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'mercadopago' && styles.selectedPaymentOption,
            ]}
            onPress={() => setPaymentMethod('mercadopago')}>
            <View style={{opacity: paymentMethod === 'mercadopago' ? 1 : 0.7}}>
              <MercadoPagoLogo />
            </View>
          </TouchableOpacity>
        </View>

        {paymentMethod === 'card' ? (
          <Animated.View
            style={styles.cardFormContainer}
            entering={FadeInUp.duration(400)}>
            <CreditCard
              cardNumber={cardNumber}
              cardName={cardName}
              expiryDate={expiryDate}
              cvc={cvc}
            />

            <View style={styles.formGroup}>
              <TextBase
                text="Número de Tarjeta"
                color={COLORS.dark.textPrimary}
                size={14}
                fontFamily="AirbnbCereal_W_Md"
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="rgba(255,255,255,0.5)"
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={text => setCardNumber(formatCardNumber(text))}
                maxLength={19}
              />
            </View>

            <View style={styles.formGroup}>
              <TextBase
                text="Nombre del Titular"
                color={COLORS.dark.textPrimary}
                size={14}
                fontFamily="AirbnbCereal_W_Md"
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="rgba(255,255,255,0.5)"
                placeholder="Salvador Welch"
                value={cardName}
                onChangeText={setCardName}
              />
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, {flex: 1, marginRight: 10}]}>
                <TextBase
                  text="Fecha de Vencimiento"
                  color={COLORS.dark.textPrimary}
                  size={14}
                  fontFamily="AirbnbCereal_W_Md"
                />
                <TextInput
                  style={styles.input}
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  value={expiryDate}
                  onChangeText={text => setExpiryDate(formatExpiryDate(text))}
                  maxLength={5}
                />
              </View>

              <View style={[styles.formGroup, {flex: 1}]}>
                <TextBase
                  text="CVC"
                  color={COLORS.dark.textPrimary}
                  size={14}
                  fontFamily="AirbnbCereal_W_Md"
                />
                <TextInput
                  style={styles.input}
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  placeholder="123"
                  keyboardType="numeric"
                  value={cvc}
                  onChangeText={setCvc}
                  maxLength={3}
                />
              </View>
            </View>
          </Animated.View>
        ) : (
          <Animated.View
            style={styles.mercadoPagoContainer}
            entering={ZoomIn.duration(400)}>
            <View style={styles.mercadoPagoBox}>
              <MercadoPagoLogo />
              <TextBase
                text="Serás redirigido a Mercado Pago para completar el pago de forma segura."
                color="#fff"
                size={14}
                fontFamily="AirbnbCereal_W_Md"
                style={{textAlign: 'center', marginTop: 20}}
              />
            </View>
          </Animated.View>
        )}

        <View style={styles.buttonContainer}>
          <ButtonGradient
            text={
              paymentMethod === 'card'
                ? 'Procesar Pago'
                : 'Continuar a Mercado Pago'
            }
            onPress={handleSubmit}
          />
        </View>

        <TextBase
          text="Los datos de tu tarjeta están protegidos con cifrado de extremo a extremo"
          color="#999"
          size={12}
          lines={2}
          fontFamily="AirbnbCereal_W_Bk"
          style={{textAlign: 'center', marginTop: 20}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  paymentSelector: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  paymentOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    marginHorizontal: 5,
  },
  selectedPaymentOption: {
    borderColor: COLORS.dark.textPrimary,
    backgroundColor: 'rgba(255, 172, 55, 0.1)',
  },
  cardFormContainer: {
    marginBottom: 20,
  },
  cardContainer: {
    height: 270,
    marginBottom: 30,
    position: 'relative',
    paddingVertical: 10,
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardBack: {
    transform: [{rotateY: '180deg'}],
  },
  cardGradient: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardChip: {
    width: 50,
    height: 35,
    backgroundColor: '#CDB76E',
    borderRadius: 5,
    marginTop: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cardStrip: {
    width: '100%',
    height: 40,
    backgroundColor: '#000',
    marginTop: 20,
  },
  cardCvcContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  cardCvcStrip: {
    width: '70%',
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#fff',
    marginTop: 8,
    fontFamily: 'AirbnbCereal_W_Md',
    fontSize: 16,
  },
  mercadoPagoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  mercadoPagoBox: {
    backgroundColor: '#202124',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
