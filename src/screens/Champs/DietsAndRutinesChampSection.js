import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import TextBase from '../../components/Base/TextBase';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import ListHorizontal from '../../components/ListHorizontal/ListHorizontal';
import {COLORS} from '../../style/style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  useGetChampsRutinesAsTrainer,
  useUnassignRutineMutation,
} from '../../hooks/rutines/queries';
import {getRutineImage} from '../../utils/rutines';
import {
  useGetChampDietsByChampId,
  useUnassignDietMutation,
} from '../../hooks/diets/queries';
import CardDiets from '../../components/Card/CardDiets/CardDiets';
import {Dimensions} from 'react-native';
import {FlatListHorizontal} from '../../components/FlatListHorizontal';
import {GrayCardBig} from '../../components/Card/GrayRectangle/GrayRectangleBig';
import Toast from 'react-native-toast-message';
import {UnassignRutinePopUp} from './UnassignRutinePopUp';
import {UnassignDietPopUp} from './UnassignDietPopUp';

const SCREEN_WIDTH = Dimensions.get('window').width;
const {dark: theme} = COLORS;

export const EmptyGrayCard = ({children, onPress, style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        {
          backgroundColor: COLORS.dark.backgroundCard,
          height: 220,
          width: true ? SCREEN_WIDTH : 'auto',
          maxWidth: 360,
          borderRadius: 24,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

const EmptyRoutineCard = ({index, champId}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('AssignRutine', {
          weekday: index + 1,
          champ_id: champId,
        })
      }
      style={{
        backgroundColor: '#1C1C1E',
        width: 160,
        height: 122,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 5,
      }}>
      <FontAwesomeIcon
        icon={faPlus}
        color={COLORS.dark.primary}
        size={20}
        style={{marginBottom: 12}}
      />
      <TextBase
        text={`Dia ${index + 1}`}
        size={16}
        color="#D3D3D3"
        lines={2}
        fontFamily="AirbnbCereal_W_Bk"
        style={{textAlign: 'center'}}
      />
    </TouchableOpacity>
  );
};

const RoutineCard = ({item, index}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        navigation.navigate('RutineDetail', {
          id: item.id,
        });
      }}>
      <ImageBackground
        alt="image-routine"
        source={{uri: getRutineImage(item)}}
        resizeMode="cover"
        key={index}
        style={{
          width: 160,
          height: 122,
          borderRadius: 16,
          marginBottom: 10,
          marginHorizontal: 5,
        }}
        imageStyle={{borderRadius: 16}}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            width: 160,
            height: 122,
            borderRadius: 16,
            justifyContent: 'center',
          }}>
          <TextBase
            text={`Dia ${index + 1}`}
            size={22}
            color="#D3D3D3"
            lines={2}
            fontFamily={
              Platform.OS === 'ios' ? 'Akira Expanded' : 'AkiraExpanded'
            }
            style={{textAlign: 'center'}}
          />
          {item.muscleGroup !== 'null' && (
            <TextBase
              text={item.muscleGroup}
              size={16}
              color={COLORS.dark.textPrimary}
              lines={2}
              fontFamily="AirbnbCereal_W_Bd"
              style={{textAlign: 'center', marginTop: 6}}
            />
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const DietsAndRutinesChampSection = ({data, champ_id}) => {
  const navigation = useNavigation();
  const {data: rutines, refetch: refetchRutines} =
    useGetChampsRutinesAsTrainer(champ_id);
  const {data: diets, refetch: refetchDiets} =
    useGetChampDietsByChampId(champ_id);
  const {
    mutateAsync: unassignRutineMutate,
    isPending: isPendingUnassignRutine,
  } = useUnassignRutineMutation();
  const {mutateAsync: unassignDietMutate, isPending: isPendingUnassignDiet} =
    useUnassignDietMutation();
  const [body, setBody] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [dietBody, setDietBody] = useState(undefined);
  const [dietVisible, setDietVisible] = useState(false);

  // Esta función es para refrescar la info cuando acabamos de asignar una dieta
  useFocusEffect(
    useCallback(() => {
      refetchDiets();
    }, [refetchDiets]),
  );

  const unassignRutine = async body => {
    await unassignRutineMutate(body, {
      onSuccess: result => {
        Toast.show({
          type: 'success',
          text1: 'Hecho',
          text2: 'Rutina desasignada',
        });
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.message,
        });
        setVisible(false);
      },
    });
  };

  const unassignDiet = async body => {
    await unassignDietMutate(
      {
        diet_id: body.diet_id,
        user_id: body.user_id,
      },
      {
        onSuccess: result => {
          Toast.show({
            type: 'success',
            text1: 'Hecho',
            text2: 'Dieta desasignada',
          });
          refetchDiets();
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error?.message,
          });
          setDietVisible(false);
        },
      },
    );
  };

  return (
    <>
      {(isPendingUnassignRutine || isPendingUnassignDiet) && (
        <>
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9,
            }}
            blurType="dark"
            blurAmount={5}
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.6)"
          />
          <View
            style={{
              position: 'absolute',
              zIndex: 10,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        </>
      )}
      <View style={{paddingVertical: 24}}>
        {visible && (
          <UnassignRutinePopUp
            onPress={() => {
              unassignRutine(body);
              setVisible(false);
            }}
            onPressCancel={() => setVisible(false)}
          />
        )}
        {dietVisible && (
          <UnassignDietPopUp
            onPress={() => {
              unassignDiet(dietBody);
              setDietVisible(false);
            }}
            onPressCancel={() => setDietVisible(false)}
          />
        )}
        {data?.enabled && data?.user?.onboardingFinished && (
          <ListHorizontal
            title={'Rutinas asignadas'}
            showBrowseAll={false}
            handleToAll={() => {}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignSelf: 'center',
                justifyContent: 'flex-start',
                maxWidth: 342,
                marginTop: 20,
              }}>
              {rutines?.map((item, index) => {
                if (item.rutine) {
                  return (
                    <View>
                      <RoutineCard
                        item={item.rutine}
                        index={index}
                        champId={champ_id}
                      />
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          setBody({
                            user_id: champ_id,
                            rutine_id: item.rutine.id,
                            assigned_day: index + 1,
                          });
                          setVisible(true);
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 4,
                          width: 20,
                          height: 30,
                          margin: 12,
                        }}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          color={'#cd2f2f'}
                          size={20}
                          style={{marginBottom: 12}}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  return <EmptyRoutineCard index={index} champId={champ_id} />;
                }
              })}
            </View>
          </ListHorizontal>
        )}

        {data?.enabled && data?.user?.onboardingFinished && (
          <ListHorizontal
            title={'Dietas asignada'}
            showBrowseAll={false}
            handleToAll={() => console.log('handleToAll function')}>
            <FlatListHorizontal
              data={diets || []}
              renderHeaderComponent={() => {
                return (
                  <GrayCardBig
                    screenWidth
                    onPress={() => {
                      navigation.navigate('AssignDiet', {
                        champ_id: champ_id,
                      });
                    }}
                    style={{marginHorizontal: 20}}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      size={30}
                      color={COLORS.dark.primary}
                      style={{marginBottom: 10}}
                    />
                    <TextBase
                      text={'Asignar Dieta'}
                      lines={2}
                      size={16}
                      color={'#ffff'}
                      fontFamily="AirbnbCereal_W_Bk"
                      style={{textAlign: 'center'}}
                    />
                  </GrayCardBig>
                );
              }}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <CardDiets
                      screenWidth
                      item={item}
                      index={index}
                      onPress={() => {
                        navigation.navigate('DietDetail', {
                          id: item.id,
                        });
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        setDietBody({
                          user_id: champ_id,
                          diet_id: item.id,
                        });
                        setDietVisible(true);
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 4,
                        width: 20,
                        height: 30,
                        margin: 12,
                      }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        color={'#cd2f2f'}
                        size={20}
                        style={{marginBottom: 12}}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
              style={{paddingBottom: 75}}
            />
          </ListHorizontal>
        )}
      </View>
    </>
  );
};
