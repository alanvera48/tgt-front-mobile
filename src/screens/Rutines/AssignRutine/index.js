import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../../style/style';
import TextBase from '../../../components/Base/TextBase';
import {
  useAssignRutineMutation,
  useGetMyRutines,
} from '../../../hooks/rutines/queries';
import {MUSCULAR_GROUP} from '../../../constants/muscularGroup';
import Toast from 'react-native-toast-message';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';
import ButtonSecundary from '../../../components/Buttons/ButtonSecundary';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import Card from '../../../components/Card/Card';
import {FlatListHorizontal} from '../../../components/FlatListHorizontal';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import {DEVICE_WIDTH, IS_ANDROID} from '../../../constants';
import {BlurView} from '@react-native-community/blur';

const {dark: theme} = COLORS;

export default function AssignRutine({route, navigation}) {
  const [visible, setVisible] = useState(false);
  const AnimatedView = Animated.createAnimatedComponent(View);
  const weekDay = route?.params?.weekday;
  const [selectedRutine, setSelectedRutine] = useState(null);
  const {
    data: rutines,
    refetch: refetchRutines,
    isPendingRutines,
  } = useGetMyRutines();
  const {mutateAsync: assignRutineMutation, isPending: isLoadingAssignRutine} =
    useAssignRutineMutation();

  const handleAssignRutine = async rutine => {
    await assignRutineMutation(
      {
        rutine_id: rutine.id,
        user_id: route.params.champ_id,
        assigned_day: route.params.weekday,
      },
      {
        onSuccess: () => {
          // refetchRutines();
          Toast.show({
            type: 'success',
            text1: 'Ejercicio asignado',
            text2: 'El ejercicio ha sido asignado correctamente',
          });
          navigation.goBack();
        },
        onError: error => {
          console.log(error, 'error');
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error?.message,
          });
        },
      },
    );
    refetchRutines();
  };

  if (isPendingRutines) {
    return <LoadingScreen backgroundColor={theme.background} />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.dark.background,
        paddingTop: 60,
      }}>
      {isLoadingAssignRutine && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      )}
      <ScrollView
        style={{
          backgroundColor: COLORS.dark.background,
          paddingHorizontal: 10,
          paddingTop: 20,
          marginTop: IS_ANDROID ? 0 : 50,
        }}>
        <TextBase
          text={'Últimas rutinas añadidas'}
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
          data={rutines.data}
          renderItem={({item, index}) => {
            return (
              <Card
                screenWidth={true}
                item={item}
                index={index}
                navigate={() => {
                  setSelectedRutine(item);
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
                    'Aún no creaste ninguna rutina para asignar a tus champs.'
                  }
                  lines={2}
                  size={18}
                  color={'white'}
                  style={{textAlign: 'center'}}
                  fontFamily="AirbnbCereal_W_Bk"
                />
              </View>
            );
          }}
          style={{paddingBottom: 40}}
        />

        {MUSCULAR_GROUP.map((item, index) => {
          return (
            rutines?.data?.filter(rutine => rutine.muscleGroup === item.value)
              .length > 0 && (
              <View key={index}>
                <TextBase
                  text={item.label}
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
                  data={rutines?.data?.filter(
                    rutine => rutine.muscleGroup === item.value,
                  )}
                  renderItem={({item, index}) => {
                    return (
                      <Card
                        screenWidth={true}
                        item={item}
                        index={index}
                        navigate={() => {
                          setSelectedRutine(item);
                          setVisible(true);
                        }}
                      />
                    );
                  }}
                  style={{paddingBottom: 40}}
                />
              </View>
            )
          );
        })}
      </ScrollView>
      {visible && (
        <>
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9,
            }}>
            <BlurView
              style={{flex: 1}}
              blurType="dark"
              blurAmount={3}
              reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.6)"
            />
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 10,
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setVisible(false)}
              style={{flex: 1}}>
              <Animated.View
                entering={SlideInDown.springify().damping(20).stiffness(120)}
                exiting={SlideOutDown.duration(200)}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  backgroundColor: COLORS.dark.backgroundLight,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  padding: 24,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: -4,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 5,
                }}>
                <View
                  style={{
                    width: 40,
                    height: 4,
                    backgroundColor: '#454545',
                    borderRadius: 2,
                    alignSelf: 'center',
                    marginBottom: 20,
                  }}
                />

                <View style={{alignItems: 'center', paddingHorizontal: 16}}>
                  <TextBase
                    text={`¿Seguro que quiere asignar la rutina para el día ${weekDay}?`}
                    size={20}
                    lines={2}
                    color={'white'}
                    fontFamily="AirbnbCereal_W_Bd"
                    style={{
                      textAlign: 'center',
                      marginBottom: 24,
                    }}
                  />

                  <ButtonGradient
                    text={'Asignar rutina'}
                    onPress={() => {
                      handleAssignRutine(selectedRutine);
                      setVisible(false);
                    }}
                    style={{
                      marginBottom: 16,
                      width: '100%',
                    }}
                  />

                  <ButtonSecundary
                    text={'Cancelar'}
                    onPress={() => setVisible(false)}
                    style={{
                      width: '100%',
                    }}
                  />
                </View>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: COLORS.dark.background,
    paddingBottom: 10,
  },
});
