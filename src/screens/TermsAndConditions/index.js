import React from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../components/Logo';
import TextBase from '../../components/Base/TextBase';
import LinearGradient from 'react-native-linear-gradient';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../style/style';

const TextSmall = ({text, marginVertical}) => {
  return (
    <TextBase
      text={text}
      fontFamily={'AirbnbCereal_W_Bk'}
      size={16}
      lines={100}
      color={'#ffff'}
      style={{marginVertical: marginVertical ?? 10}}
    />
  );
};

export default function TermsAndConditions() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        alt="image-terms-and-conditions"
        source={require('../../assets/image/onboarding-3.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          width: '100%',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            width: '100%',
            alignItems: 'center',
            padding: 30,
            paddingBottom: 0,
          }}>
          <ScrollView
            style={{marginBottom: 100}}
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.buttonBackContainer}
              onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faChevronLeft} size={25} color="#fff" />
            </TouchableOpacity>
            <View style={styles.header}>
              <Logo width={100} height={100} />
              <TextBase
                text={'Privacidad, términos y condiciones'}
                fontFamily={'AirbnbCereal_W_Bd'}
                size={18}
                lines={2}
                color={'#ffff'}
                style={{marginVertical: 20, textAlign: 'center'}}
              />
            </View>
            <TextSmall
              text={
                '1. Introducción Bienvenido a The Good Trainer, una plataforma diseñada para conectar entrenadores personales (en adelante, "Entrenadores") con alumnos (en adelante, "Champs"). Al utilizar nuestra aplicación, aceptas los presentes Términos y Condiciones. Si no estás de acuerdo con ellos, te recomendamos no usar nuestra plataforma.'
              }
            />
            <TextSmall
              text={
                '2. Conexión entre Entrenadores y Champs The Good Trainer facilita el contacto entre Entrenadores y Champs, proporcionando una herramienta para la gestión de rutinas y planes alimenticios. Sin embargo, The Good Trainer no se hace responsable de las relaciones, interacciones o acuerdos que surjan entre Entrenadores y Champs fuera del ámbito de la app. Esto incluye, pero no se limita a:'
              }
            />
            <View style={styles.dotTextContainer}>
              <TextSmall
                text={'• Conexiones personales o profesionales.'}
                marginVertical={3}
              />
              <TextSmall
                text={
                  '• Cualquier comunicación fuera de los canales de la aplicación, ya sea en persona, por teléfono, redes sociales o cualquier otro medio.'
                }
                marginVertical={3}
              />
            </View>
            <TextSmall
              text={
                '3. Envío de Imágenes y Contenidos Los Entrenadores y Champs pueden intercambiar información a través de la app, como fotos de progreso o chequeos mensuales. The Good Trainer no se hace responsable del contenido multimedia (imágenes, videos, etc.) compartido entre las partes. Es responsabilidad de los usuarios asegurarse de que el contenido compartido cumpla con todas las leyes aplicables y con los principios de privacidad.'
              }
            />
            <TextSmall
              text={
                '4. Chat y Comunicaciones La aplicación cuenta con una funcionalidad de chat para facilitar la comunicación entre Entrenadores y Champs. The Good Trainer no se responsabiliza por los mensajes, archivos o enlaces compartidos entre usuarios, ni por cualquier acuerdo al que lleguen a través de este medio.'
              }
            />
            <TextSmall
              text={
                '5. Pagos y Transacciones Externas Si bien The Good Trainer puede facilitar algunas interacciones entre Entrenadores y Champs, la plataforma no se responsabiliza de los pagos, acuerdos económicos o transacciones realizadas fuera de la app. Recomendamos a los usuarios utilizar servicios de pago seguros y documentar cualquier transacción financiera realizada fuera de la aplicación.'
              }
            />
            <TextSmall
              text={
                '6. Planes Nutricionales Algunos Entrenadores, en colaboración con nutricionistas, pueden proporcionar planes alimenticios a los Champs. The Good Trainer no es responsable de la efectividad, adecuación o riesgos asociados a los planes nutricionales ofrecidos por Entrenadores o nutricionistas. Los Champs deben consultar a un profesional de la salud antes de seguir cualquier plan alimenticio proporcionado a través de la plataforma.'
              }
            />
            <TextSmall
              text={
                '7. Limitación de Responsabilidad The Good Trainer es una plataforma intermediaria y no garantiza ni se hace responsable de los resultados obtenidos mediante el uso de la app, ya sea en términos de progreso físico, planes nutricionales o cualquier otro servicio ofrecido por los Entrenadores. Los usuarios deben actuar bajo su propia responsabilidad y tomar precauciones adecuadas antes de seguir cualquier recomendación o instrucción proporcionada a través de la app.'
              }
            />
            <TextSmall
              text={
                '8. Cambios en los Términos y Condiciones The Good Trainer se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán efectivas una vez publicadas en la aplicación, y el uso continuado de la misma implicará la aceptación de dichos cambios.'
              }
            />
            <TextSmall
              text={
                '9. Contacto Para cualquier duda o consulta sobre estos Términos y Condiciones, puedes contactarnos a través de la plataforma.'
              }
            />
            <TextSmall
              text={
                'Al aceptar estos Términos y Condiciones, reconoces que entiendes y aceptas todas las limitaciones de responsabilidad de The Good Trainer.'
              }
            />
          </ScrollView>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            opacity={1}
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: 100,
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingRight: 20,
            }}>
            {true && (
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
                  onPress={() => {}}
                  hitSlop={16}>
                  <Text style={styles.text}>Aceptar</Text>
                  <FontAwesomeIcon icon={faPlay} color={'#FFF'} size={25} />
                </Pressable>
              </LinearGradient>
            )}
          </LinearGradient>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFF',
    textAlign: 'center',
    fontFamily: 'AirbnbCereal_W_Bd',
    fontSize: 19,
    marginRight: 16,
  },
  dotTextContainer: {
    marginLeft: 10,
  },
  buttonPress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonColor: {
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 30,
    width: 200,
    maxWidth: 280,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonBackContainer: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#3A3A3C',
    padding: 5,
    top: 30,
    left: 10,
    borderRadius: 100,
  },
});
