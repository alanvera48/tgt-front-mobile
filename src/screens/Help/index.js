import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../components/Logo';
import TextBase from '../../components/Base/TextBase';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

import {useNavigation} from '@react-navigation/native';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
} from '@gluestack-ui/themed';
import DropDownIcon from '../../components/Collapsible/components/DropDownIcon';
import {COLORS} from '../../style/style';

const HELP_QUESTIONS_LIST = [
  {
    title: '¿Qué tipo de suscripciones están disponibles en The Good Trainer?',
    text: 'Ofrecemos suscripciones mensuales y anuales. Todas las suscripciones tienen un compromiso mínimo de 2 meses.',
    contentHeight: 90,
  },
  {
    title: '¿Puedo cancelar mi suscripción en cualquier momento?',
    text: 'Puedes cancelar tu suscripción después del período mínimo de 2 meses. Si eliges una suscripción anual, puedes cancelar al finalizar el año. Las cancelaciones no generan reembolsos por el tiempo no utilizado.',
    contentHeight: 150,
  },
  {
    title: '¿Puedo cambiar mi plan de suscripción?',
    text: 'Sí, puedes cambiar tu plan de suscripción entre mensual y anual. El cambio se aplicará al final de tu período de facturación actual.',
    contentHeight: 110,
  },
  {
    title: '¿Puedo comunicarme con mi entrenador fuera de la app?',
    text: 'Sí, puedes hablar con tu entrenador fuera de la app. Sin embargo, recomendamos utilizar los canales dentro de la plataforma para asegurar la mejor experiencia y soporte.',
    contentHeight: 130,
  },
  {
    title: '¿Puedo solicitar cambios en mi rutina de entrenamiento?',
    text: 'Sí, puedes pedirle a tu entrenador que ajuste o modifique tu rutina en cualquier momento. Los cambios están sujetos a la disponibilidad y criterio del entrenador.',
    contentHeight: 110,
  },
  {
    title: '¿Qué pasa si quiero cambiar de entrenador?',
    text: 'Puedes solicitar un cambio de entrenador directamente en la app o contactando a soporte. Ten en cuenta que dependerá de la disponibilidad de otros entrenadores.',
    contentHeight: 110,
  },
  {
    title: '¿Puede mi entrenador eliminarme como champ?',
    text: 'Sí, los entrenadores tienen la capacidad de solicitar la eliminación de un champ asignado. Esto puede ocurrir si, por ejemplo, no hay progreso o comunicación adecuada entre ambas partes.',
    contentHeight: 130,
  },
  {
    title:
      '¿Qué sucede si no estoy satisfecho con mi rutina o plan alimenticio?',
    text: 'Si no estás satisfecho con tu rutina o plan alimenticio, te recomendamos hablar directamente con tu entrenador para hacer ajustes. Si el problema persiste, puedes contactar a soporte para analizar otras opciones.',
    contentHeight: 160,
  },
  {
    title: '¿Los planes alimenticios están diseñados por nutricionistas?',
    text: 'Sí, los planes alimenticios proporcionados en la app son creados o revisados por nutricionistas en colaboración con tu entrenador. Sin embargo, es importante consultar con un profesional de salud antes de seguir cualquier plan.',
    contentHeight: 160,
  },
  {
    title: '¿Qué sucede si mi entrenador no está disponible por un tiempo?',
    text: 'En caso de que tu entrenador no esté disponible temporalmente, puedes optar por pausar tu suscripción o ser asignado a otro entrenador.',
    contentHeight: 110,
  },
  {
    title: '¿Cómo puedo solicitar soporte técnico o ayuda con la app?',
    text: 'Puedes contactarnos a través del soporte dentro de la app o enviar un correo a nuestro equipo de atención al cliente para resolver cualquier problema técnico o duda.',
    contentHeight: 130,
  },
  {
    title: '¿Qué métodos de pago aceptan?',
    text: 'Aceptamos pagos mediante tarjetas de crédito, débito, y otros métodos disponibles en la app. Asegúrate de revisar los términos de tu suscripción para evitar interrupciones en el servicio.',
    contentHeight: 130,
  },
];

const AccordionComponent = ({title, text, contentHeight}) => {
  return (
    <Accordion
      variant="unfilled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
      width={350}
      borderColor={'#C3C8CE'}
      borderWidth={1}>
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger>
            {({isExpanded}) => {
              return (
                <>
                  <AccordionTitleText
                    style={{
                      color: COLORS.dark.textPrimary,
                      fontSize: 18,
                      verticalAlign: 'middle',
                    }}>
                    {title}
                  </AccordionTitleText>
                  {isExpanded ? (
                    <DropDownIcon
                      icon={faChevronUp}
                      backgroundColor="transparent"
                      color={COLORS.dark.textWhite}
                    />
                  ) : (
                    <DropDownIcon
                      icon={faChevronDown}
                      backgroundColor="transparent"
                      color={COLORS.dark.textWhite}
                    />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent height={contentHeight ?? 130}>
          <AccordionContentText
            style={{
              flex: 1,
              flexGrow: 1,
              color: COLORS.dark.textWhite,
            }}>
            {text}
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default function Help() {
  const navigation = useNavigation();

  return (
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
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          width: '100%',
          alignItems: 'center',
          paddingVertical: 30,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
            padding: 10,
          }}>
          <TouchableOpacity
            style={styles.buttonBackContainer}
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} size={25} color="#fff" />
          </TouchableOpacity>
          <View style={styles.header}>
            <Logo width={100} height={100} />
            <TextBase
              text={'Preguntas Frecuentes (FAQ)'}
              fontFamily={'AirbnbCereal_W_Bd'}
              size={18}
              lines={2}
              color={'#ffff'}
              style={{marginVertical: 20, textAlign: 'center'}}
            />

            {HELP_QUESTIONS_LIST.map((item, index) => (
              <AccordionComponent
                key={index}
                title={item.title}
                text={item.text}
                contentHeight={item.contentHeight}
              />
            ))}

            <Text style={{color: COLORS.dark.textWhite, marginVertical: 40}}>
              Si tienes alguna otra pregunta, no dudes en contactarnos a través
              de nuestra plataforma de soporte.
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 300,
    alignSelf: 'center',
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
