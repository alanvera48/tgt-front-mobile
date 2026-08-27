import React, {useState} from 'react';
import {ScrollView, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../style/style';
import TextBase from '../../../components/Base/TextBase';
import CardDiets from '../../../components/Card/CardDiets/CardDiets';
import Toast from 'react-native-toast-message';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';
import ButtonSecundary from '../../../components/Buttons/ButtonSecundary';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import {
  useAssignDiet,
  useGetDietsCreatedByTrainer,
} from '../../../hooks/diets/queries';
import {FlatListHorizontal} from '../../../components/FlatListHorizontal';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import {DEVICE_WIDTH, IS_ANDROID} from '../../../constants';

const {dark: theme} = COLORS;

export default function AssignDiet({route, navigation}) {
  const [visible, setVisible] = useState(false);
  const AnimatedView = Animated.createAnimatedComponent(View);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const assignDietMutation = useAssignDiet();

  const {data: diets, isPending: isPendingDiets} =
    useGetDietsCreatedByTrainer();

  const handleAssignDiet = async diet => {
    await assignDietMutation.mutateAsync(
      {
        userId: route.params.champ_id,
        dietId: diet.id,
      },
      {
        onSuccess: result => {
          Toast.show({
            type: 'success',
            text1: 'Dieta asignada',
            text2: 'La dieta ha sido asignada correctamente',
          });
          navigation.goBack();
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error?.message,
          });
        },
      },
    );
  };

  if (isPendingDiets) {
    return <LoadingScreen backgroundColor={theme.background} />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.dark.background,
        paddingTop: 60,
        paddingBottom: 20,
      }}>
      <ScrollView
        style={{
          backgroundColor: COLORS.dark.background,
          paddingHorizontal: 0,
          paddingTop: 20,
          marginTop: IS_ANDROID ? 0 : 70,
        }}>
        <TextBase
          text={'Últimas dietas añadidas'}
          size={18}
          color={'white'}
          fontFamily="AirbnbCereal_W_Bd"
          style={{
            backgroundColor: COLORS.dark.background,
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
        />
        <FlatListHorizontal
          data={diets}
          renderItem={({item, index}) => {
            return (
              <CardDiets
                screenWidth
                item={item}
                index={index}
                onPress={() => {
                  setSelectedDiet(item);
                  setVisible(true);
                }}
              />
            );
          }}
          renderEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: DEVICE_WIDTH - 60,
                  height: 100,
                }}>
                <TextBase
                  text={
                    'Aún no creaste ninguna dieta para asignar a tus champs.'
                  }
                  lines={2}
                  size={18}
                  color={'white'}
                  style={{textAlign: 'center'}}
                  fontFamily="AirbnbCereal_W_Bd"
                />
              </View>
            );
          }}
        />
      </ScrollView>

      {visible && (
        <TouchableOpacity activeOpacity={1} onPress={() => setVisible(false)}>
          <AnimatedView
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={{
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              alignItems: 'center',
              backgroundColor: COLORS.dark.backgroundLight,
              padding: 20,
              paddingTop: 20,
              paddingBottom: 20,
            }}>
            <TextBase
              text={'¿Seguro que quiere asignar la dieta al champ?'}
              size={18}
              lines={2}
              color={'white'}
              fontFamily="AirbnbCereal_W_Bd"
              style={{
                backgroundColor: COLORS.dark.backgroundLight,
                paddingHorizontal: 20,
                paddingBottom: 10,
                marginBottom: 20,
                textAlign: 'center',
              }}
            />
            <ButtonGradient
              text={'Asignar dieta'}
              onPress={() => {
                handleAssignDiet(selectedDiet);
                setVisible(false);
              }}
              style={{marginBottom: 20}}
            />
            <ButtonSecundary
              text={'Cancelar'}
              onPress={() => {
                setVisible(false);
              }}
            />
          </AnimatedView>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
