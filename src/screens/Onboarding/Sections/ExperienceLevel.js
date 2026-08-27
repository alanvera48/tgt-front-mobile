import React, {useState} from 'react';
import {Platform} from 'react-native';
import Container from '../../../layouts/Container';
import TextBase from '../../../components/Base/TextBase';
import {HStack, VStack} from '@gluestack-ui/themed';
import {useUserContext} from '../../../context/UserContext/UserProvider';

import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {experienceLevel} from '../../../constants/activityLevel';
import {BottomButtons} from './Gender';
import {COLORS} from '../../../style/style';

const FontAkira = Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded';

export default function ExperienceLevel({navigation}) {
  const [selectedExpLevelID, setSelectedExpLevelID] = useState(0);
  const {handleOnboardingChamp, onboardingChamp} = useUserContext();

  const handleNextScreen = () => {
    navigation.navigate('ActivityLevel');
  };

  const getScale = index => {
    const distance = index - selectedExpLevelID;
    if (distance === 0) return 28;
    if (distance === 1 || distance === -1) return 23;
    if (distance === 2 || distance === -2) return 20;
    return 16;
  };

  return (
    <>
      <Container>
        <VStack marginTop={50} alignItems="center">
          <TextBase
            text={
              'CUANTA EXPERIENCIA CONSIDERAS QUE TENES EN EL ENTRENAMIENTO FISICO?'
            }
            size={22}
            color={'#fff'}
            lines={6}
            style={{textAlign: 'center'}}
            fontFamily={FontAkira}
          />
          <TextBase
            text={'Esto nos ayudará a crear tu plan personalizado.'}
            size={12}
            color={'#fff'}
            lines={2}
            fontFamily={FontAkira}
            style={{textAlign: 'center', marginTop: 10}}
          />
        </VStack>
        <VStack
          marginTop={40}
          height={400}
          justifyContent="space-between"
          alignItems="center">
          <ScrollPicker
            dataSource={experienceLevel}
            selectedIndex={0}
            renderItem={(data, index) => {
              return (
                <HStack alignItems="center" justifyContent="center">
                  <TextBase
                    text={data.label}
                    size={
                      onboardingChamp.experienceLevel === data.label ? 35 : 16
                    }
                    color={'#fff'}
                    fontFamily={'AirbnbCereal_W_Bd'}
                    style={{
                      fontSize: getScale(data.id),
                      textAlign: 'center',
                    }}
                  />
                </HStack>
              );
            }}
            onValueChange={data => {
              setSelectedExpLevelID(data.id);
              handleOnboardingChamp('experienceLevel', data.value);
            }}
            wrapperHeight={400}
            wrapperBackground="#1C1C1E"
            itemHeight={60}
            highlightColor={COLORS.dark.textPrimary}
            highlightBorderWidth={4}
          />
        </VStack>
      </Container>
      <BottomButtons handleNextScreen={handleNextScreen} />
    </>
  );
}
