import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import Container from '../../../layouts/Container';
import TextBase from '../../../components/Base/TextBase';
import {HStack, VStack} from '@gluestack-ui/themed';

import {useUserContext} from '../../../context/UserContext/UserProvider';

import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {height} from '../../../constants/height';
import {BottomButtons} from './Gender';
import {COLORS} from '../../../style/style';

const FontAkira = Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded';

export default function Height({navigation}) {
  const [heightValue, setHeightValue] = React.useState(167);
  const {handleOnboardingChamp} = useUserContext();

  const handleNextScreen = () => {
    handleOnboardingChamp('height', heightValue);
    navigation.navigate('Goal');
  };

  const getScale = index => {
    const distance = index - heightValue;
    if (distance === 0) return 50;
    if (distance === 1 || distance === -1) return 35;
    if (distance === 2 || distance === -2) return 20;
    return 16;
  };

  useEffect(() => {
    setHeightValue(167);
  }, []);

  return (
    <>
      <Container>
        <VStack marginTop={50} alignItems="center">
          <TextBase
            text={'CUAL ES TU ALTURA?'}
            size={24}
            color={COLORS.dark.textWhite}
            fontFamily={FontAkira}
            lines={3}
            style={{textAlign: 'center'}}
          />
          <TextBase
            text={'Esto nos ayudará a ofrecerte la mejor experiencia posible.'}
            size={12}
            fontFamily={FontAkira}
            color={COLORS.dark.textWhite}
            lines={2}
            style={{textAlign: 'center', marginTop: 10}}
          />
        </VStack>
        <VStack
          marginTop={40}
          height={400}
          justifyContent="space-between"
          alignItems="center">
          <ScrollPicker
            dataSource={height}
            selectedIndex={47}
            renderItem={(data, index) => {
              return (
                <HStack alignItems="center">
                  <TextBase
                    text={data}
                    color={'#fff'}
                    style={{
                      fontSize: getScale(data),
                      textAlign: 'center',
                    }}
                  />
                  {heightValue === data && (
                    <TextBase
                      text={'cm'}
                      color={'#fff'}
                      style={{
                        fontSize: 20,
                        lineHeight: 20,
                        verticalAlign: 'bottom',
                        marginLeft: 8,
                        height: 50,
                      }}
                    />
                  )}
                </HStack>
              );
            }}
            onValueChange={data => {
              setHeightValue(data);
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
