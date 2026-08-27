import React, {useState} from 'react';
import {Platform} from 'react-native';
import Container from '../../../layouts/Container';
import TextBase from '../../../components/Base/TextBase';
import {HStack, VStack} from '@gluestack-ui/themed';

import {useUserContext} from '../../../context/UserContext/UserProvider';

import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {activityLevel} from '../../../constants/activityLevel';
import {BottomButtons} from './Gender';
import {COLORS} from '../../../style/style';

const FontAkira = Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded';

export default function ActivityLevel({navigation}) {
  const [selectedActLevelID, setSelectedActLevelID] = useState(0);
  const {handleOnboardingChamp, onboardingChamp} = useUserContext();

  const handleNextScreen = () => {
    navigation.navigate('General');
  };

  const getScale = index => {
    const distance = index - selectedActLevelID;
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
            text={'CUAL ES TU NIVEL DE ACTIVIDAD FISICA?'}
            size={24}
            color={'#fff'}
            lines={3}
            style={{textAlign: 'center'}}
            fontFamily={FontAkira}
          />
          <TextBase
            text={'Esto nos ayudará a crear tu plan personalizado.'}
            size={16}
            color={'#fff'}
            lines={2}
            style={{textAlign: 'center', marginTop: 10}}
            fontFamily={FontAkira}
          />
        </VStack>
        <VStack
          marginTop={40}
          height={400}
          justifyContent="space-between"
          alignItems="center">
          <ScrollPicker
            dataSource={activityLevel}
            selectedIndex={0}
            renderItem={(data, index) => {
              return (
                <HStack alignItems="center" justifyContent="center">
                  <TextBase
                    text={data.label}
                    color={'#fff'}
                    fontFamily={'AirbnbCereal_W_Bd'}
                    style={{fontSize: getScale(data.id), textAlign: 'center'}}
                  />
                </HStack>
              );
            }}
            onValueChange={data => {
              setSelectedActLevelID(data.id);
              handleOnboardingChamp('activityLevel', data.value);
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
