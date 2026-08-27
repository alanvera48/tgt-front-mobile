import React from 'react';
import {StyleSheet, View} from 'react-native';
import TextBase from '../../components/Base/TextBase';
import {VStack} from '@gluestack-ui/themed';
import {Box} from '@gluestack-ui/themed';
import moment from 'moment';
import {COLORS} from '../../style/style';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import ButtonGreenGradient from '../../components/Buttons/ButtonGreenGradient';
import {useApprovedChamp} from '../../hooks/user/queries';
import Toast from 'react-native-toast-message';
import {DangerAlert} from '../../components/DangerAlert';
import {activityLevel} from '../../constants/activityLevel';
import {goal} from '../../constants/goal';
import {FAVORITE_TRAINING_PLACE} from '../../constants/inputs-options';

export const FieldName = ({text}) => {
  return (
    <TextBase
      text={text}
      size={14}
      color={COLORS.dark.textPrimary}
      fontFamily="AirbnbCereal_W_Bk"
      style={{marginBottom: 10}}
    />
  );
};

export const FieldValue = ({text}) => {
  return (
    <TextBase
      text={text}
      size={16}
      color="#fff"
      fontFamily="AirbnbCereal_W_Bk"
      style={{
        borderBottomWidth: 0.6,
        borderColor: COLORS.dark.textMuted,
        paddingBottom: 12,
      }}
    />
  );
};

export const FieldContainer = ({children}) => {
  return (
    <Box paddingVertical="$6" paddingTop={0}>
      {children}
    </Box>
  );
};

export const PersonalInformationChampSection = ({data, route}) => {
  const {mutate, isPending: isPendingAprove} = useApprovedChamp();
  const handleAcceptChamp = () => {
    mutate(route.params.relation_id, {
      onSuccess: result => {
        Toast.show({
          type: 'success',
          text1: 'Conectado',
          text2: 'Se ha conectado con el champ',
        });
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Ha ocurrido un error al intentar aceptar al champ',
        });
      },
    });
  };

  return (
    <>
      <VStack paddingTop={30} paddingHorizontal={20}>
        <FieldContainer>
          <View style={styles.exercisesCompletedCard}>
            <TextBase
              text={0}
              size={24}
              color={COLORS.dark.textWhite}
              fontFamily="AirbnbCereal_W_Bd"
              style={{marginBottom: 4}}
            />
            <TextBase
              text={'Ejercicios Completados'}
              size={12}
              color="#fff"
              lines={2}
              fontFamily="AirbnbCereal_W_Bk"
              style={{textAlign: 'center'}}
            />
          </View>
          <FieldName text={'Email'} />
          <FieldValue text={data?.user?.email} />
        </FieldContainer>
        <FieldContainer>
          <FieldName text={'Teléfono'} />
          <FieldValue
            text={data?.user?.onboardingUser?.mobileNumber ?? 'No disponible'}
          />
        </FieldContainer>

        {data?.user?.onboardingFinished && (
          <>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <FieldContainer>
                  <FieldName text={'Altura'} />
                  <FieldValue
                    text={`${data?.user?.onboardingUser?.height}cm`}
                  />
                </FieldContainer>
              </View>
              <View style={{width: '50%'}}>
                <FieldContainer>
                  <FieldName text={'Peso'} />
                  <FieldValue
                    text={`${data?.user?.onboardingUser?.weight}kg`}
                  />
                </FieldContainer>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <FieldContainer>
                  <FieldName text={'Nivel de actividad'} />
                  <FieldValue
                    text={
                      activityLevel.filter(
                        item =>
                          item.value ===
                          data?.user?.onboardingUser?.activityLevel,
                      )[0]?.label
                    }
                  />
                </FieldContainer>
              </View>

              <View style={{width: '50%'}}>
                <FieldContainer>
                  <FieldName text={'Lugar de entren. fav.'} />
                  <FieldValue
                    text={
                      FAVORITE_TRAINING_PLACE.filter(
                        item =>
                          item.value ===
                          data?.user?.onboardingUser?.placeToTrain,
                      )[0]?.label
                    }
                  />
                </FieldContainer>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <FieldContainer>
                  <FieldName text={'Duración de entren.'} />
                  <FieldValue
                    text={`${data?.user?.onboardingUser?.trainDuration} minutos`}
                  />
                </FieldContainer>
              </View>
              <View style={{width: '50%'}}>
                <FieldContainer>
                  <FieldName text={'Entren. por semana'} />
                  <FieldValue text={data?.user?.onboardingUser?.trainPerWeek} />
                </FieldContainer>
              </View>
            </View>

            <FieldContainer>
              <FieldName text={'Objetivo'} />
              <FieldValue
                text={
                  goal.filter(
                    item => item.value === data?.user?.onboardingUser?.goal,
                  )[0]?.label
                }
              />
            </FieldContainer>

            <FieldContainer>
              <FieldName text={'Últimas lesiones'} />
              <FieldValue text={data?.user?.onboardingUser?.lastInjuries} />
            </FieldContainer>

            <FieldContainer>
              <FieldName text={'Otras consideraciones'} />
              <FieldValue
                text={data?.user?.onboardingUser?.otherConsiderations}
              />
            </FieldContainer>
          </>
        )}

        <FieldContainer>
          <FieldName text={'Se unió'} />
          <FieldValue
            text={moment(data?.user?.createdAt).format('DD/MM/YYYY')}
          />
        </FieldContainer>
      </VStack>

      {data?.user?.onboardingFinished === null && (
        <View style={{marginHorizontal: 22}}>
          <DangerAlert
            message={
              'El champ aún no ha completado el registro, no se le pueden asignar rutinas ni dietas'
            }
          />
        </View>
      )}

      <View style={styles.bottomButtonContainer}>
        {data?.enabled ? (
          <ButtonGradient
            onPress={() => {}}
            text="Contactar"
            style={{width: 200, height: 60}}
          />
        ) : (
          <ButtonGreenGradient
            text="Aceptar"
            onPress={handleAcceptChamp}
            isPending={isPendingAprove}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  exercisesCompletedCard: {
    width: 145,
    height: 96,
    borderRadius: 15,
    backgroundColor: COLORS.dark.backgroundInput,
    marginBottom: 24,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
});
