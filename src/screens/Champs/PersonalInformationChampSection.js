import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import TextBase from '../../components/Base/TextBase';
import {
  VStack,
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '@gluestack-ui/themed';
import moment from 'moment';
import {COLORS} from '../../style/style';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import ButtonGreenGradient from '../../components/Buttons/ButtonGreenGradient';
import {useApprovedChamp} from '../../hooks/user/queries';
import Toast from 'react-native-toast-message';
import {DangerAlert} from '../../components/DangerAlert';
import {activityLevel, experienceLevel} from '../../constants/activityLevel';
import {goal} from '../../constants/goal';
import {
  FAVORITE_TRAINING_PLACE,
  SEX_SELECT_OPTIONS,
  FOOD_PREFERENCES,
} from '../../constants/inputs-options';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faIdCard,
  faLocationDot,
  faDumbbell,
  faNoteSticky,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

const NestedSectionContext = React.createContext(false);

const findLabel = (options, value) =>
  options.find(option => option.value === value)?.label ?? 'No disponible';

const calculateAge = dateOfBirth => {
  if (!dateOfBirth) {
    return null;
  }
  return moment().diff(moment(dateOfBirth), 'years');
};

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

const SectionTitle = ({text}) => (
  <TextBase
    text={text}
    size={13}
    color={COLORS.dark.textMuted}
    fontFamily="AirbnbCereal_W_Bd"
    style={styles.sectionTitle}
  />
);

const StatTile = ({label, value, fullWidth}) => {
  const nested = useContext(NestedSectionContext);
  return (
    <View
      style={[styles.tileOuter, fullWidth ? styles.tileOuterFull : undefined]}>
      <View
        style={[styles.tileInner, nested ? styles.tileInnerNested : undefined]}>
        <TextBase
          text={label}
          size={12}
          color={COLORS.dark.textMuted}
          fontFamily="AirbnbCereal_W_Bk"
          style={{marginBottom: 4}}
        />
        <TextBase
          text={value}
          size={15}
          lines={1}
          color="#fff"
          fontFamily="AirbnbCereal_W_Bd"
        />
      </View>
    </View>
  );
};

const TextBlock = ({label, value}) => {
  const nested = useContext(NestedSectionContext);
  return (
    <View
      style={[styles.textBlock, nested ? styles.textBlockNested : undefined]}>
      <TextBase
        text={label}
        size={12}
        color={COLORS.dark.textMuted}
        fontFamily="AirbnbCereal_W_Bk"
        style={{marginBottom: 6}}
      />
      <TextBase
        text={value}
        size={14}
        lines={4}
        color="#fff"
        fontFamily="AirbnbCereal_W_Bk"
      />
    </View>
  );
};

const ProfileSection = ({value, icon, title, subtitle, children}) => (
  <AccordionItem
    value={value}
    marginBottom={14}
    borderRadius={18}
    backgroundColor={COLORS.dark.backgroundCard}>
    <AccordionHeader>
      <AccordionTrigger>
        {({isExpanded}) => (
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconBadge}>
              <FontAwesomeIcon
                icon={icon}
                size={18}
                color={COLORS.dark.primary}
              />
            </View>
            <View style={{flex: 1, marginLeft: 14}}>
              <TextBase
                text={title}
                size={16}
                color={'#fff'}
                fontFamily="AirbnbCereal_W_Bd"
              />
              {!isExpanded && subtitle ? (
                <TextBase
                  text={subtitle}
                  size={13}
                  lines={1}
                  color={COLORS.dark.textMuted}
                  fontFamily="AirbnbCereal_W_Bk"
                  style={{marginTop: 4}}
                />
              ) : null}
            </View>
            <FontAwesomeIcon
              icon={isExpanded ? faChevronUp : faChevronDown}
              size={16}
              color={COLORS.dark.textMuted}
              style={{marginLeft: 12}}
            />
          </View>
        )}
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent style={styles.sectionContent}>
      <NestedSectionContext.Provider value={true}>
        {children}
      </NestedSectionContext.Provider>
    </AccordionContent>
  </AccordionItem>
);

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

  const onboardingUser = data?.user?.onboardingUser;

  return (
    <>
      <VStack paddingTop={24} paddingHorizontal={20}>
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

        <SectionTitle text={'Contacto'} />
        <View style={styles.statGrid}>
          <StatTile label={'Email'} value={data?.user?.email} fullWidth />
          <StatTile
            label={'Teléfono'}
            value={onboardingUser?.mobileNumber ?? 'No disponible'}
          />
          <StatTile
            label={'Se unió'}
            value={moment(data?.user?.createdAt).format('DD/MM/YYYY')}
          />
        </View>

        {data?.user?.onboardingFinished && (
          <Accordion
            width="100%"
            variant="filled"
            type="single"
            isCollapsible={true}
            backgroundColor="transparent"
            style={{marginTop: 20}}>
            <ProfileSection
              value="datos-personales"
              icon={faIdCard}
              title="Datos personales"
              subtitle={`${findLabel(
                SEX_SELECT_OPTIONS,
                onboardingUser?.gender,
              )} · ${onboardingUser?.height}cm · ${onboardingUser?.weight}kg`}>
              <View style={styles.statGrid}>
                <StatTile
                  label={'Género'}
                  value={findLabel(SEX_SELECT_OPTIONS, onboardingUser?.gender)}
                />
                <StatTile
                  label={'Edad'}
                  value={
                    calculateAge(onboardingUser?.dateOfBirth)
                      ? `${calculateAge(onboardingUser?.dateOfBirth)} años`
                      : 'No disponible'
                  }
                />
                <StatTile
                  label={'Altura'}
                  value={`${onboardingUser?.height}cm`}
                />
                <StatTile
                  label={'Peso'}
                  value={`${onboardingUser?.weight}kg`}
                />
                <StatTile
                  label={'% Grasa corporal'}
                  value={
                    onboardingUser?.bodyFat != null
                      ? `${onboardingUser?.bodyFat}%`
                      : 'No disponible'
                  }
                />
                <StatTile
                  label={'Nivel de actividad'}
                  value={findLabel(
                    activityLevel,
                    onboardingUser?.activityLevel,
                  )}
                />
              </View>
            </ProfileSection>

            <ProfileSection
              value="ubicacion"
              icon={faLocationDot}
              title="Ubicación"
              subtitle={[onboardingUser?.city, onboardingUser?.province]
                .filter(Boolean)
                .join(', ')}>
              <TextBlock
                label={'Dirección'}
                value={
                  [onboardingUser?.address, onboardingUser?.apartment]
                    .filter(Boolean)
                    .join(' - ') || 'No disponible'
                }
              />
              <TextBlock
                label={'Ciudad'}
                value={
                  [
                    onboardingUser?.city,
                    onboardingUser?.province,
                    onboardingUser?.zipCode && `CP ${onboardingUser?.zipCode}`,
                  ]
                    .filter(Boolean)
                    .join(', ') || 'No disponible'
                }
              />
            </ProfileSection>

            <ProfileSection
              value="entrenamiento"
              icon={faDumbbell}
              title="Entrenamiento y alimentación"
              subtitle={findLabel(goal, onboardingUser?.goal)}>
              <View style={styles.statGrid}>
                <StatTile
                  label={'Nivel de experiencia'}
                  value={findLabel(
                    experienceLevel,
                    onboardingUser?.experienceLevel,
                  )}
                />
                <StatTile
                  label={'Lugar de entren. fav.'}
                  value={findLabel(
                    FAVORITE_TRAINING_PLACE,
                    onboardingUser?.placeToTrain,
                  )}
                />
                <StatTile
                  label={'Duración de entren.'}
                  value={`${onboardingUser?.trainDuration} minutos`}
                />
                <StatTile
                  label={'Entren. por semana'}
                  value={onboardingUser?.trainPerWeek}
                />
                <StatTile
                  label={'Comidas por día'}
                  value={onboardingUser?.foodPerDay ?? 'No disponible'}
                />
                <StatTile
                  label={'Pref. alimentaria'}
                  value={findLabel(
                    FOOD_PREFERENCES,
                    onboardingUser?.dietsPreferences,
                  )}
                />
                <StatTile
                  label={'Objetivo'}
                  value={findLabel(goal, onboardingUser?.goal)}
                  fullWidth
                />
              </View>
            </ProfileSection>

            <ProfileSection
              value="notas"
              icon={faNoteSticky}
              title="Notas"
              subtitle={onboardingUser?.lastInjuries || 'Sin lesiones'}>
              <TextBlock
                label={'Últimas lesiones'}
                value={onboardingUser?.lastInjuries || 'Ninguna'}
              />
              <TextBlock
                label={'Otras consideraciones'}
                value={onboardingUser?.otherConsiderations || 'Ninguna'}
              />
            </ProfileSection>
          </Accordion>
        )}
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
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 20,
    marginBottom: 10,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  tileOuter: {
    width: '50%',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  tileOuterFull: {
    width: '100%',
  },
  tileInner: {
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 14,
    padding: 12,
  },
  tileInnerNested: {
    backgroundColor: COLORS.dark.backgroundElevated,
  },
  textBlock: {
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  textBlockNested: {
    backgroundColor: COLORS.dark.backgroundElevated,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  sectionIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(223, 72, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContent: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
