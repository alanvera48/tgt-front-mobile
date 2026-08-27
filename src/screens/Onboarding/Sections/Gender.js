import {Platform, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Container from '../../../layouts/Container';
import TextBase from '../../../components/Base/TextBase';
import {HStack, VStack} from '@gluestack-ui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretRight, faMars, faVenus} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import {useUserContext} from '../../../context/UserContext/UserProvider';
import {COLORS} from '../../../style/style';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';
import ButtonSecundary from '../../../components/Buttons/ButtonSecundary';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../../store/authStore';

const FontAkira = Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded';

export const BottomButtons = ({handleNextScreen}) => {
  const userInfo = useAuthStore(state => state.userInfo);

  const isChamp = userInfo?.role === 'CHAMP';

  const navigation = useNavigation();
  const handleSkip = () => {
    navigation.navigate(isChamp ? 'UserDashboard' : 'TrainerDashboard');
  };

  return (
    <HStack
      marginTop={40}
      justifyContent="space-between"
      position="absolute"
      w={'$full'}
      bottom={30}
      paddingHorizontal={20}
      left={0}
      right={0}>
      <ButtonSecundary
        onPress={handleSkip}
        text={'Omitir'}
        style={{height: 60, width: 120}}
      />
      <ButtonGradient
        onPress={handleNextScreen}
        text={'Siguiente'}
        icon={faCaretRight}
        style={{height: 60, width: 160}}
      />
    </HStack>
  );
};

export default function Gender({navigation}) {
  const {handleOnboardingChamp, onboardingChamp} = useUserContext();

  const handleNextScreen = () => {
    navigation.navigate('Weight');
  };

  return (
    <>
      <Container>
        <VStack marginTop={50} alignItems="center">
          <TextBase
            text={'CONTANOS SOBRE VOS!'}
            size={24}
            color={'#fff'}
            fontFamily={FontAkira}
            lines={2}
            style={{textAlign: 'center'}}
          />
          <TextBase
            text={
              'Para poder ofrecerte la mejor experiencia, necesitamos saber un poco más sobre vos.'
            }
            size={12}
            fontFamily={FontAkira}
            color={'#fff'}
            lines={3}
            style={{textAlign: 'center', marginTop: 10}}
          />
        </VStack>
        <VStack
          marginTop={40}
          justifyContent="space-evenly"
          alignItems="center"
          flex={1}
          marginBottom={120}>
          <TouchableOpacity
            onPress={() => handleOnboardingChamp('gender', 'MASCULINO')}>
            <LinearGradient
              hitSlop={16}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={style.button}
              colors={
                onboardingChamp.gender === 'MASCULINO'
                  ? [COLORS.dark.primary, COLORS.dark.primaryLight]
                  : [COLORS.dark.backgroundLight, COLORS.dark.backgroundDark]
              }>
              <FontAwesomeIcon icon={faMars} size={48} color={'#ffff'} />
              <TextBase text={'Masculino'} size={16} color={'#ffff'} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOnboardingChamp('gender', 'FEMENINO')}>
            <LinearGradient
              hitSlop={16}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={style.button}
              colors={
                onboardingChamp.gender === 'FEMENINO'
                  ? [COLORS.dark.primary, COLORS.dark.primaryLight]
                  : [COLORS.dark.backgroundLight, COLORS.dark.backgroundDark]
              }>
              <FontAwesomeIcon icon={faVenus} size={48} color={'#ffff'} />
              <TextBase text={'Femenino'} size={16} color={'#ffff'} />
            </LinearGradient>
          </TouchableOpacity>
        </VStack>
      </Container>
      <BottomButtons handleNextScreen={handleNextScreen} />
    </>
  );
}

const style = StyleSheet.create({
  button: {
    borderRadius: 100,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
