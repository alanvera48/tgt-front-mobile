/* eslint-disable react-hooks/exhaustive-deps */
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../../layouts/Container';
import TextBase from '../../../components/Base/TextBase';
import {HStack, VStack} from '@gluestack-ui/themed';
import {useUserContext} from '../../../context/UserContext/UserProvider';
import {weight} from '../../../constants/weight';
import {BottomButtons} from './Gender';
import {COLORS} from '../../../style/style';

const {width} = Dimensions.get('screen');
const FontAkira = Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded';

const minAge = weight[0];
const segmentsLength = 91;
const segmentWidth = 2;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (width - segmentWidth) / 2;
const rulerWidth = spacerWidth * 2 + (segmentsLength - 1) * snapSegment;
const indicatorWidth = 100;
const indicatorHeight = 80;

const Ruler = () => {
  return (
    <View style={styles.ruler}>
      <View style={styles.spacer} />
      {weight.map(i => {
        const tenth = i % 10 === 0;
        return (
          <VStack key={i}>
            <View
              key={i}
              style={[
                styles.segment,
                {
                  backgroundColor: tenth
                    ? COLORS.dark.textPrimary
                    : COLORS.dark.textPrimary,
                  width: 2,
                  height: tenth ? 50 : 20,
                  marginRight: i === weight.length - 1 ? 0 : segmentSpacing,
                },
              ]}
            />
          </VStack>
        );
      })}

      <View style={styles.spacer} />
    </View>
  );
};

export default function Weight({navigation}) {
  const [scrollX, setScrollX] = React.useState(new Animated.Value(0));
  const scrollViewRef = React.useRef(null);
  const textInputRef = React.useRef(null);
  const [weightValue, setWeightValue] = React.useState(50);
  const {handleOnboardingChamp} = useUserContext();

  const handleNextScreen = () => {
    handleOnboardingChamp('weight', weightValue);
    navigation.navigate('OnboardingChamp', {screen: 'Height'});
  };

  useEffect(() => {
    const index = weightValue - minAge;
    scrollViewRef.current.scrollTo({
      x: index * snapSegment,
      animated: true,
    });
  }, []);

  useEffect(() => {
    if (textInputRef && textInputRef.current) {
      textInputRef.current.setNativeProps({
        text: weightValue.toString(),
      });
    }
  }, [scrollX]);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const index = Math.round(value / snapSegment);
      textInputRef.current.setNativeProps({text: (index + minAge).toString()});

      setWeightValue(index + minAge);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, [scrollX]);

  return (
    <>
      <Container>
        <VStack marginTop={50} alignItems="center">
          <TextBase
            text={'CUAL ES TU PESO?'}
            size={24}
            color={'#fff'}
            fontFamily={FontAkira}
          />
          <TextBase
            text={'Siempre podrás cambiarlo más tarde.'}
            size={12}
            fontFamily={FontAkira}
            color={'#fff'}
            lines={2}
            style={{textAlign: 'center', marginTop: 10}}
          />
        </VStack>
        <VStack
          marginTop={40}
          height={300}
          justifyContent="center"
          alignItems="center">
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            contentContainerStyle={styles.scrollViewContainerStyle}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToInterval={snapSegment}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: scrollX},
                  },
                },
              ],
              {useNativeDriver: true},
            )}>
            <Ruler />
          </Animated.ScrollView>
          <View style={styles.indicatorWrapper}>
            <HStack justifyContent="center" alignItems="center">
              <TextInput
                ref={textInputRef}
                onChange={({nativeEvent}) => {
                  const value = parseInt(nativeEvent.text, 10);
                  const index = value - minAge;
                  scrollViewRef.current.scrollTo({
                    x: index * snapSegment,
                    animated: true,
                  });
                }}
                defaultValue={weightValue.toString()}
                style={styles.ageTextStyle}
                value={weightValue.toString()}
              />
              <TextBase text={'kg'} color={'#fff'} style={{marginLeft: 5}} />
            </HStack>
            <View style={[styles.segment, styles.segmentIndicator]} />
          </View>
        </VStack>
      </Container>
      <BottomButtons handleNextScreen={handleNextScreen} />
    </>
  );
}

const styles = StyleSheet.create({
  indicatorWrapper: {
    position: 'absolute',
    left: (width - indicatorWidth) / 2,
    bottom: 34,
    alignItems: 'center',
    justifyContent: 'center',
    width: indicatorWidth,
  },
  segmentIndicator: {
    height: indicatorHeight,
    backgroundColor: COLORS.dark.textPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  cake: {
    width,
    height: width * 1.2,
    resizeMode: 'cover',
  },
  ruler: {
    width: rulerWidth,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  segment: {
    width: segmentWidth,
  },
  scrollViewContainerStyle: {
    justifyContent: 'flex-end',
  },
  ageTextStyle: {
    fontSize: 42,
    fontFamily: 'AirbnbCereal_W_Bd',
    color: '#fff',
  },
  spacer: {
    width: spacerWidth,
    backgroundColor: COLORS.dark.textPrimary,
  },
});
