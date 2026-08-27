import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Pressable, Text, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextBase from '../../components/Base/TextBase';
import {COLORS} from '../../style/style';
import {Divider} from '@gluestack-ui/themed';
import {BottomBlackFadeContainer} from '../../components/BottomBlackFadeContainer';
import {faChevronLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../components/Logo';

const IS_SMALL_DEVICE = Dimensions.get('window').width < 370;

const DividerComponent = () => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 20,
      }}>
      <Divider />
    </View>
  );
};

const FieldTitle = ({title}) => {
  return (
    <TextBase
      text={title}
      size={18}
      lines={2}
      fontFamily="AirbnbCereal_W_Bd"
      color={'#fff'}
      style={{
        alignSelf: 'flex-start',
        marginHorizontal: 15,
        marginBottom: 20,
      }}
    />
  );
};

const FieldText = ({text, lines, styleProp}) => {
  return (
    <TextBase
      text={text}
      lines={lines}
      size={16}
      fontFamily="AirbnbCereal_W_Bk"
      color={'#fff'}
      style={{
        alignSelf: 'flex-start',
        marginHorizontal: 15,
        marginBottom: 20,
        ...styleProp,
      }}
    />
  );
};

export default function SubscriptionsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: COLORS.dark.background}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: COLORS.dark.background,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 10,
            paddingTop: 50,
            paddingBottom: 110,
          }}
          contentContainerStyle={{}}>
          <TouchableOpacity
            style={styles.buttonBackContainer}
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} size={25} color="#fff" />
          </TouchableOpacity>
          <Logo width={67} height={85} />
          <TextBase
            text={'Suscripción'}
            size={30}
            fontFamily="AirbnbCereal_W_Bd"
            color={'#fff'}
            style={{marginVertical: 15}}
          />
          <LinearGradient
            hitSlop={40}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[
              COLORS.dark.primaryLight,
              COLORS.dark.primary,
              COLORS.dark.primaryDark,
            ]}
            style={styles.card}>
            <TextBase
              text={'Plan Entrenador Básico'}
              size={18}
              lines={3}
              fontFamily="AirbnbCereal_W_Bd"
              color={'#fff'}
              style={{marginBottom: 10}}
            />
            <TextBase
              text={'Estás en el período de prueba'}
              size={16}
              lines={2}
              fontFamily="AirbnbCereal_W_Bk"
              color={'#fff'}
            />
            <TextBase
              text={
                'Te quedan 15 días para terminarlo. A partir de la fecha de finalización, se comenzará a cobrar el plan seleccionado.'
              }
              lines={7}
              size={16}
              fontFamily="AirbnbCereal_W_Bk"
              color={'#fff'}
            />
            <View style={{alignItems: 'flex-end'}}>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    width: 100,
                  }}>
                  <TextBase
                    text={'$10'}
                    size={40}
                    fontFamily="AirbnbCereal_W_Bd"
                    color={'#fff'}
                  />
                  <TextBase
                    text={'/mes'}
                    size={10}
                    fontFamily="AirbnbCereal_W_Bk"
                    color={'#fff'}
                    style={{marginLeft: 6, marginBottom: 12}}
                  />
                </View>
                <TextBase
                  text={'Más impuestos aplicables'}
                  size={10}
                  fontFamily="AirbnbCereal_W_Bk"
                  color={'#fff'}
                />
              </View>
            </View>
          </LinearGradient>
          <TextBase
            text={
              'Para administrar su suscripción, selecciona cambiar plan o dirigite a thegoodtrainer.com/suscripcion'
            }
            lines={7}
            size={16}
            fontFamily="AirbnbCereal_W_Bk"
            color={'#fff'}
            style={{marginBottom: 20}}
          />
          <FieldTitle title={'Próximos pagos'} />
          <TextBase
            text={
              '$10.000,00 (más impuestos aplicables) será aplicado el 21 de nov. del 2024'
            }
            lines={4}
            size={16}
            fontFamily="AirbnbCereal_W_Bk"
            color={'#fff'}
            style={{marginBottom: 20}}
          />
          <DividerComponent />
          <FieldTitle title={'Método de pago'} />
          <TextBase
            text={'VISA **** 9852'}
            lines={4}
            size={16}
            fontFamily="AirbnbCereal_W_Bk"
            color={'#fff'}
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: 15,
              marginBottom: 20,
            }}
          />
          <DividerComponent />
          <FieldTitle title={'Qué incluye mi plan?'} />
          <FieldText text={'Plan Entrenador Básico'} lines={2} />
          <FieldText
            text={'1. Hasta 20 champs asignables.'}
            lines={2}
            styleProp={{marginLeft: 30}}
          />
          <FieldText
            text={'2. Posibilidad de crear hasta 10 rutinas por champ.'}
            lines={2}
            styleProp={{marginLeft: 30}}
          />
          <FieldText
            text={'3. No incluye la opción de planes alimenticios.'}
            lines={2}
            styleProp={{marginLeft: 30}}
          />
          <FieldText
            text={'4. No permite la subida de fotos o videos'}
            lines={2}
            styleProp={{marginLeft: 30}}
          />
          <FieldText
            text={
              '5. No está verificado por un nutricionista (sin distintivo de verificación nutricional)'
            }
            lines={2}
            styleProp={{marginLeft: 30}}
          />
        </View>
      </ScrollView>
      <BottomBlackFadeContainer>
        <Pressable
          style={styles.secondaryButton}
          onPress={() => {}}
          hitSlop={16}>
          <Text style={styles.text}>Baja de plan</Text>
        </Pressable>
        <LinearGradient
          hitSlop={40}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[
            COLORS.dark.primaryLight,
            COLORS.dark.primary,
            COLORS.dark.primaryDark,
          ]}
          style={styles.buttonColor}>
          <Pressable
            style={styles.buttonPress}
            onPress={() => navigation.navigate('SelectSubscription')}
            hitSlop={16}>
            <Text style={[styles.text, {marginRight: 8}]}>Cambiar plan</Text>
            <FontAwesomeIcon
              icon={faPlay}
              color={'#FFF'}
              size={IS_SMALL_DEVICE ? 18 : 20}
            />
          </Pressable>
        </LinearGradient>
      </BottomBlackFadeContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonBackContainer: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#3A3A3C',
    padding: 5,
    top: 50,
    left: 30,
    borderRadius: 100,
  },
  card: {
    maxWidth: 360,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  buttonPress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#FFFF',
    textAlign: 'center',
    fontFamily: 'AirbnbCereal_W_Bd',
    fontSize: IS_SMALL_DEVICE ? 15 : 17,
  },
  secondaryButton: {
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingHorizontal: IS_SMALL_DEVICE ? 18 : 24,
    paddingVertical: 16,
  },
  buttonColor: {
    paddingHorizontal: IS_SMALL_DEVICE ? 18 : 24,
    paddingVertical: 16,
    borderRadius: 30,
    maxWidth: 280,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
