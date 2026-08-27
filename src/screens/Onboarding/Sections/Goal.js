import React, {useState} from 'react';
import {Platform} from 'react-native';
import Container from '../../../layouts/Container';
import TextBase from '../../../components/Base/TextBase';
import {HStack, VStack} from '@gluestack-ui/themed';
import {useUserContext} from '../../../context/UserContext/UserProvider';

import ScrollPicker from 'react-native-wheel-scrollview-picker';

import {goal} from '../../../constants/goal';
import {BottomButtons} from './Gender';
import {COLORS} from '../../../style/style';

const FontAkira = Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded';

export default function Goal({navigation}) {
  const [selectedGoalID, setSelectedGoalID] = useState('');
  const {handleOnboardingChamp, onboardingChamp} = useUserContext();

  const handleNextScreen = () => {
    navigation.navigate('ExperienceLevel');
  };

  const getScale = index => {
    const distance = index - selectedGoalID;
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
            text={'CUAL ES TU OBJETIVO?'}
            size={24}
            color={'#fff'}
            fontFamily={FontAkira}
            lines={2}
          />
          <TextBase
            text={'Esto nos ayudará a ofrecerte la mejor experiencia posible.'}
            size={12}
            color={'#fff'}
            fontFamily={FontAkira}
            lines={3}
            style={{textAlign: 'center', marginTop: 10}}
          />
        </VStack>
        <VStack
          marginTop={40}
          height={400}
          justifyContent="space-between"
          alignItems="center">
          <ScrollPicker
            dataSource={goal}
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
                  {onboardingChamp.goal === data && (
                    <TextBase text={'cm'} color={'#fff'} />
                  )}
                </HStack>
              );
            }}
            onValueChange={data => {
              setSelectedGoalID(data.id);
              handleOnboardingChamp('goal', data.value);
            }}
            wrapperHeight={400}
            wrapperBackground="#1C1C1E"
            itemHeight={60}
            itemTextStyle={{color: '#fff', fontSize: 20}}
            highlightColor={COLORS.dark.textPrimary}
            highlightBorderWidth={4}
          />
        </VStack>
      </Container>
      <BottomButtons handleNextScreen={handleNextScreen} />
    </>
  );
}
