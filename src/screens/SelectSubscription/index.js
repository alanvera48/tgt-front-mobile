import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextBase from '../../components/Base/TextBase';
import {COLORS} from '../../style/style';
import Logo from '../../components/Logo';

const LinearContainer = ({children}) => {
  return (
    <LinearGradient
      hitSlop={40}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={[
        COLORS.dark.primaryLight,
        COLORS.dark.primary,
        COLORS.dark.primaryDark,
      ]}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        margin: 3,
      }}>
      {children}
    </LinearGradient>
  );
};

const OpaqueContainer = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F3F3F',
        borderRadius: 50,
        margin: 3,
      }}>
      {children}
    </View>
  );
};

const MonthySuscriptionContent = () => {
  return (
    <TextBase
      text={'Mensual'}
      size={20}
      lines={3}
      fontFamily="AirbnbCereal_W_Bk"
      color={'#fff'}
    />
  );
};

const YearlySuscriptionContent = ({isMonthly}) => {
  return (
    <>
      <TextBase
        text={'Anual'}
        size={20}
        lines={3}
        fontFamily="AirbnbCereal_W_Bk"
        color={'#fff'}
        style={{marginBottom: 3}}
      />
      <TextBase
        text={'Ahorrá hasta un 30%'}
        size={12}
        lines={1}
        color={isMonthly ? COLORS.dark.textPrimary : '#FFFFFF'}
        style={{
          fontWeight: 400,
          position: 'absolute',
          bottom: 1,
        }}
      />
    </>
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

export default function SelectSubscription() {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.dark.background}}>
      <ImageBackground
        source={require('../../assets/image/onboarding-3.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          width: '100%',
        }}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}>
          <ScrollView
            contentContainerStyle={{alignItems: 'center', paddingTop: 40}}>
            <Logo width={90} height={80} />
            <View
              style={{
                backgroundColor: '#3F3F3F',
                marginTop: 30,
                width: Dimensions.get('window').width - 40,
                maxWidth: 370,
                height: 60,
                borderRadius: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setIsMonthly(true)}>
                {isMonthly ? (
                  <LinearContainer>
                    <MonthySuscriptionContent />
                  </LinearContainer>
                ) : (
                  <OpaqueContainer>
                    <MonthySuscriptionContent />
                  </OpaqueContainer>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setIsMonthly(false)}>
                {isMonthly ? (
                  <OpaqueContainer>
                    <YearlySuscriptionContent isMonthly={isMonthly} />
                  </OpaqueContainer>
                ) : (
                  <LinearContainer>
                    <YearlySuscriptionContent isMonthly={isMonthly} />
                  </LinearContainer>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 30,
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                    size={20}
                    lines={3}
                    fontFamily="AirbnbCereal_W_Bd"
                    color={'#fff'}
                    style={{marginBottom: 20}}
                  />
                  <FieldText
                    text={'1. Hasta 20 champs asignables.'}
                    lines={2}
                  />
                  <FieldText
                    text={'2. Posibilidad de crear hasta 10 rutinas por champ.'}
                    lines={2}
                  />
                  <FieldText
                    text={'3. No incluye la opción de planes alimenticios.'}
                    lines={2}
                  />
                  <FieldText
                    text={'4. No incluye la opción de planes alimenticios.'}
                    lines={2}
                  />
                  <FieldText
                    text={
                      '5. no está verificado por un nutricionista (sin distintivo de verificación nutricional).'
                    }
                    lines={4}
                  />
                  <TextBase
                    text={'Plan seleccionado'}
                    size={18}
                    lines={3}
                    fontFamily="AirbnbCereal_W_Bd"
                    color={'#fff'}
                    style={{alignSelf: 'flex-end', marginRight: 10}}
                  />
                </LinearGradient>
                <View>
                  <View
                    style={{
                      height: 50,
                      backgroundColor: '#5345F7',
                      marginHorizontal: 10,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TextBase
                      text={'Recomendado'}
                      size={20}
                      lines={1}
                      fontFamily="AirbnbCereal_W_Bd"
                      color={'#fff'}
                    />
                  </View>
                  <LinearGradient
                    hitSlop={40}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    colors={['#D4A720', '#B18E25', '#B08913']}
                    style={[
                      styles.card,
                      {borderTopRightRadius: 0, borderTopLeftRadius: 0},
                    ]}>
                    <TextBase
                      text={'Plan Entrenador Premium'}
                      size={20}
                      lines={3}
                      fontFamily="AirbnbCereal_W_Bd"
                      color={'#fff'}
                      style={{marginBottom: 20}}
                    />
                    <FieldText
                      text={'1. Hasta 20 champs asignables.'}
                      lines={2}
                    />
                    <FieldText
                      text={
                        '2. Posibilidad de crear hasta 10 rutinas por champ.'
                      }
                      lines={2}
                    />
                    <FieldText
                      text={'3. No incluye la opción de planes alimenticios.'}
                      lines={2}
                    />
                    <FieldText
                      text={'4. No incluye la opción de planes alimenticios.'}
                      lines={2}
                    />
                    <FieldText
                      text={
                        '5. no está verificado por un nutricionista (sin distintivo de verificación nutricional).'
                      }
                      lines={4}
                    />
                    <View
                      style={{
                        alignItems: 'flex-end',
                        width: '100%',
                      }}>
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
                            text={'$20'}
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
                </View>
              </ScrollView>
              <TextBase
                text={'Facturado a través de Mercado Pago S.A.'}
                size={16}
                lines={3}
                fontFamily="AirbnbCereal_W_Bk"
                color={'#fff'}
                style={{marginRight: 10, marginTop: 30}}
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: 310,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 30,
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
    fontSize: 19,
    marginRight: 16,
  },
  secondaryButton: {
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingHorizontal: 28,
    paddingVertical: 16,
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
});
