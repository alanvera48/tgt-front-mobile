import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import TextBase from '../../components/Base/TextBase';
import {
  faPlus,
  faTrash,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
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

const WEEKDAY_LABELS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

const DayBadge = ({index}) => (
  <View style={dayRowStyles.dayBadge}>
    <TextBase
      text={String(index + 1)}
      size={16}
      color={COLORS.dark.primary}
      fontFamily="AirbnbCereal_W_Bd"
    />
  </View>
);

const EmptyRoutineRow = ({index, champId}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('AssignRutine', {
          weekday: index + 1,
          champ_id: champId,
        })
      }
      style={dayRowStyles.row}>
      <DayBadge index={index} />
      <View style={dayRowStyles.emptyContent}>
        <FontAwesomeIcon icon={faPlus} color={COLORS.dark.primary} size={14} />
        <TextBase
          text={`Asignar rutina para el ${
            WEEKDAY_LABELS[index] ?? `día ${index + 1}`
          }`}
          size={14}
          color={COLORS.dark.primary}
          fontFamily="AirbnbCereal_W_Bd"
          style={{marginLeft: 10}}
        />
      </View>
    </TouchableOpacity>
  );
};

const RoutineRow = ({item, index, onPressDelete}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate('RutineDetail', {id: item.id})}
      style={dayRowStyles.row}>
      <DayBadge index={index} />
      <Image
        alt="image-routine"
        source={{uri: getRutineImage(item)}}
        resizeMode="cover"
        style={dayRowStyles.thumb}
      />
      <View style={dayRowStyles.textContainer}>
        <TextBase
          text={item.name ?? WEEKDAY_LABELS[index] ?? `Día ${index + 1}`}
          size={15}
          lines={1}
          color={'#fff'}
          fontFamily="AirbnbCereal_W_Bd"
        />
        {item.muscleGroup && item.muscleGroup !== 'null' && (
          <TextBase
            text={item.muscleGroup}
            size={13}
            lines={1}
            color={COLORS.dark.textMuted}
            fontFamily="AirbnbCereal_W_Bk"
            style={{marginTop: 2}}
          />
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        hitSlop={10}
        onPress={onPressDelete}
        style={dayRowStyles.deleteButton}>
        <FontAwesomeIcon icon={faTrash} color={'#cd2f2f'} size={16} />
      </TouchableOpacity>
      <FontAwesomeIcon
        icon={faChevronRight}
        color={COLORS.dark.textMuted}
        size={14}
      />
    </TouchableOpacity>
  );
};

const dayRowStyles = {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  dayBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(223, 72, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  emptyContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 6,
    marginRight: 4,
  },
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
            <View style={{paddingHorizontal: 20, marginTop: 12}}>
              {rutines?.map((item, index) =>
                item.rutine ? (
                  <RoutineRow
                    key={item.rutine.id ?? index}
                    item={item.rutine}
                    index={index}
                    onPressDelete={() => {
                      setBody({
                        user_id: champ_id,
                        rutine_id: item.rutine.id,
                        assigned_day: index + 1,
                      });
                      setVisible(true);
                    }}
                  />
                ) : (
                  <EmptyRoutineRow
                    key={`empty-${index}`}
                    index={index}
                    champId={champ_id}
                  />
                ),
              )}
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
