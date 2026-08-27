import React from 'react';
import {View, ImageBackground, ScrollView, StyleSheet} from 'react-native';
import TextBase from '../../../components/Base/TextBase';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';
import CollapsibleRutine from '../../../components/Collapsible/CollapsibleRutine';
import {useGetRutineById} from '../../../hooks/rutines/queries';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import {useAuthStore} from '../../../store/authStore';
import {COLORS} from '../../../style/style';
import {GoBackArrow} from '../../../components/GoBackArrow';
import {EditButton} from '../../../components/EditButton';
import {formatArrayStringToCommaSeparated} from '../../../utils/stringFormat';
import {getExpirationStatus, getRutineImage} from '../../../utils/rutines';
import InfoBadge from '../../../components/Badge/InfoBadge';
import {text} from '@fortawesome/fontawesome-svg-core';
import {useGroupedExercises} from '../../../hooks/rutines/useGroupedExercises';
import {supersetStyles} from '../../../style/supersetStyles';

export const getBadgeConfig = (type, expirationStatus) => {
  if (expirationStatus?.status === 'EXPIRED') {
    return {
      message: `Tu ${type} está vencida, contactá a tu entrenador para que te asigne otra.`,
      color: '#FF0000',
    };
  }
  if (expirationStatus?.status === 'EXPIRING_SOON') {
    return {
      message: `Tu ${type} vence en ${expirationStatus.daysRemaining} días, cuando lo haga, tu entrenador deberá asignarte otra.`,
      color: COLORS.dark.textPrimary,
    };
  }
  return null;
};

export default function RutineDetail({navigation, route}) {
  const userInfo = useAuthStore(state => state.userInfo);
  const isTrainer = userInfo?.role === 'TRAINER';

  const {data, isPending} = useGetRutineById(route.params.id);
  console.log('🚀 ~ RutineDetail ~ data:', data?.data?.exercises);

  const handleRutineEditScreen = () => {
    navigation.navigate('CreateRutine', {
      rutine_id: route.params.id,
    });
  };

  const expirationStatus = getExpirationStatus(data?.data?.rutineXChamp?.alert);

  const badgeConfig = getBadgeConfig('rutina', expirationStatus);

  const exercisesList = useGroupedExercises(data?.data?.exercises);

  if (isPending) {
    return <LoadingScreen backgroundColor={COLORS.dark.background} />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.dark.background,
      }}>
      <ScrollView>
        <ImageBackground
          source={{
            uri: getRutineImage(data?.data),
          }}
          alt="image-rutine-detail"
          resizeMode="cover"
          style={{
            width: '100%',
            height: 300,
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              width: '100%',
              height: 300,
              justifyContent: 'space-between',
              paddingVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 40,
                paddingVertical: 20,
              }}>
              <GoBackArrow />
              <View>
                {userInfo.role === 'TRAINER' && (
                  <EditButton onPress={handleRutineEditScreen} />
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 30,
                paddingBottom: 5,
              }}>
              <View>
                {data?.data.muscleGroup !== 'null' && (
                  <TextBase
                    text={formatArrayStringToCommaSeparated(
                      data?.data.muscleGroup,
                    )}
                    size={16}
                    color={'#ffff'}
                    fontFamily="AirbnbCereal_W_Bk"
                    style={{marginBottom: 4}}
                  />
                )}
                <TextBase
                  text={data?.data?.rutineType}
                  size={16}
                  color={'#fff'}
                  fontFamily="AirbnbCereal_W_Bd"
                />
              </View>
              {/* TODO: Deshabilitado hasta que se agregue sistema de calificacion */}
              {/* <View
                style={{
                  backgroundColor: '#454446',
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 8,
                  height: 26,
                  width: 55,
                }}>
                <TextBase
                  size={12}
                  text={'4.9'}
                  color={'#ffff'}
                  fontFamily="AirbnbCereal_W_Bk"
                />
                <FontAwesomeIcon icon={faStar} color={COLORS.dark.textPrimary} />
              </View> */}
            </View>
          </View>
        </ImageBackground>
        <View style={styles.containerRutineDetails}>
          <View>
            {badgeConfig && (
              <View style={{marginBottom: 20}}>
                <InfoBadge
                  message={badgeConfig.message}
                  color={badgeConfig.color}
                />
              </View>
            )}
            <TextBase
              color={'#ffff'}
              text={data?.data?.name}
              lines={2}
              fontFamily="AirbnbCereal_W_Bd"
              size={20}
            />
            <TextBase
              color={COLORS.dark.primary}
              size={14}
              text={data?.data?.shortDescription}
              lines={2}
              fontFamily="AirbnbCereal_W_Bk"
              style={{marginTop: 10}}
            />
            <TextBase
              color={'#ffff'}
              size={15}
              lines={20}
              text={data?.data?.description}
              fontFamily="AirbnbCereal_W_Bk"
              style={{marginVertical: 10}}
            />
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: 20, paddingBottom: 50}}>
          {exercisesList?.map((item, index) => {
            if (item.type === 'regular') {
              return (
                <CollapsibleRutine
                  key={index}
                  item={item.exercise}
                  index={index}
                />
              );
            }

            if (item.type === 'superset') {
              return (
                <View
                  key={`superset-${item.superSetId}`}
                  style={supersetStyles.supersetContainer}>
                  <View style={supersetStyles.supersetLabel}>
                    <TextBase
                      text="💡 Realizar estos ejercicios consecutivamente sin descanso entre ellos"
                      size={14}
                      color={COLORS.dark.textPrimary}
                      fontFamily="AirbnbCereal_W_Bd"
                      lines={2}
                      style={{textAlign: 'center'}}
                    />
                  </View>
                  {item.exercises?.map((exercise, exerciseIndex) => (
                    <CollapsibleRutine
                      key={`${item.superSetId}-${exerciseIndex}`}
                      item={exercise}
                      index={exerciseIndex}
                    />
                  ))}
                </View>
              );
            }

            return null;
          })}
        </View>
        {!isTrainer && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              paddingBottom: 50,
            }}>
            <ButtonGradient
              text={'Comenzar Rutina'}
              onPress={() =>
                navigation.navigate('CountdownScreen', {
                  rutineId: route.params.id,
                  rutineXChampId: data?.data?.rutineXChamp.id,
                })
              }
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerRutineDetails: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark.background,
  },
});
