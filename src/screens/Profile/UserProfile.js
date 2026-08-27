import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import TextBase from '../../components/Base/TextBase';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faEdit, faSave} from '@fortawesome/free-solid-svg-icons';
import {formatText} from '../../utils/stringFormat';
import {Controller, useForm} from 'react-hook-form';
import InputCustom from '../../components/Input/Input';
import InputDate from '../../components/Input/InputDate';
import {DropdownInput} from '../../components/DropdownInput/DropdownInput';
import {useUpdateProfile} from '../../hooks/user/queries';
import {useAuthStore} from '../../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import Toast from 'react-native-toast-message';

import {SEX_SELECT_OPTIONS} from '../../constants/inputs-options';
import {
  FOOD_PREFERENCES,
  FOOD_PER_DAY,
  TRAININGS_PER_WEEK,
  FAVORITE_TRAINING_PLACE,
  TRAINING_DURATION,
} from '../../constants/inputs-options';
import {goal} from '../../constants/goal';
import {activityLevel, experienceLevel} from '../../constants/activityLevel';
import {WEIGHT_SELECT_OPTIONS} from '../../constants/weight';
import {HEIGHT_SELECT_OPTIONS} from '../../constants/height';
import {COLORS} from '../../style/style';

const InfoItem = ({label, value}) => (
  <View style={styles.infoItem}>
    <TextBase
      text={label}
      color="#666"
      size={14}
      fontFamily={'AirbnbCereal_W_Md'}
    />
    <TextBase
      text={value || 'No especificado'}
      color="#fff"
      size={16}
      fontFamily={'AirbnbCereal_W_Md'}
    />
  </View>
);

export default function UserProfile({navigation}) {
  const [isEditing, setIsEditing] = useState(false);
  const {userData, updateUserState} = useAuthStore(
    useShallow(state => ({
      userData: state.userInfo,
      updateUserState: state.updateUserState,
    })),
  );
  const isChamp = userData?.role === 'CHAMP';
  const onboardingData = isChamp
    ? userData?.onboardingUser
    : userData?.onboardingTrainer;
  const onboardingString = isChamp ? 'onboardingUser' : 'onboardingTrainer';

  const {mutateAsync: updateProfileAsync} = useUpdateProfile();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      [`${onboardingString}`]: {
        mobileNumber: onboardingData?.mobileNumber || '',
        gender: onboardingData?.gender || '',
        dateOfBirth: onboardingData?.dateOfBirth || '',
        // Campos de entrenamiento (champ)
        goal: onboardingData?.goal || '',
        trainDuration: onboardingData?.trainDuration || '',
        trainPerWeek: onboardingData?.trainPerWeek || '',
        placeToTrain: onboardingData?.placeToTrain || '',
        experienceLevel: onboardingData?.experienceLevel || '',
        height: onboardingData?.height || '',
        weight: onboardingData?.weight || '',
        lastInjuries: onboardingData?.lastInjuries || '',
        activityLevel: onboardingData?.activityLevel || '',
        foodPerDay: onboardingData?.foodPerDay || '',
        dietsPreferences: onboardingData?.dietsPreferences || '',
        otherConsiderations: onboardingData?.otherConsiderations || '',
        // Campos de trainer
        experienceYears: onboardingData?.experienceYears || '',
      },
    },
  });

  const onSubmit = async data => {
    try {
      if (isChamp && data?.[onboardingString]) {
        delete data[onboardingString].experienceYears;
      }
      const result = await updateProfileAsync(data);
      updateUserState(result);
      setIsEditing(false);
      Toast.show({
        type: 'success',
        text1: 'Perfil actualizado',
        text2: 'Los datos han sido actualizados correctamente',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.message || 'Algo salió mal',
      });
    }
  };

  const isoToDisplay = isoDate => {
    if (!isoDate) {
      return '';
    }
    const dateOnly = isoDate.split('T')[0];
    const parts = dateOnly.split('-');
    if (parts.length !== 3) {
      return isoDate;
    }
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const formatDate = date => {
    if (!date) {
      return 'No especificado';
    }
    return isoToDisplay(date);
  };

  const formatDuration = duration => {
    if (!duration) return 'No especificado';
    const option = TRAINING_DURATION.find(d => d.value === duration);
    return option?.label || `${duration} minutos`;
  };

  const onb = onboardingString;
  const onbErrors = errors?.[onboardingString];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} size={24} color="#fff" />
        </TouchableOpacity>
        <TextBase
          text="Mi Perfil"
          color="#fff"
          size={20}
          fontFamily={'AirbnbCereal_W_Bd'}
        />
        <TouchableOpacity
          onPress={() => {
            if (isEditing) {
              handleSubmit(onSubmit)();
            } else {
              setIsEditing(true);
            }
          }}>
          <FontAwesomeIcon
            icon={isEditing ? faSave : faEdit}
            size={24}
            color={COLORS.dark.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Datos Personales */}
        <View style={styles.section}>
          <TextBase
            text="Datos Personales"
            color={COLORS.dark.primary}
            size={18}
            fontFamily={'AirbnbCereal_W_Bd'}
            style={styles.sectionTitle}
          />

          {isEditing ? (
            <View>
              <Controller
                control={control}
                name="firstName"
                rules={{required: 'Este campo es requerido'}}
                render={({field: {onChange, value}}) => (
                  <InputCustom
                    label="Nombre"
                    value={value}
                    onChangeText={onChange}
                    error={errors?.firstName?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                rules={{required: 'Este campo es requerido'}}
                render={({field: {onChange, value}}) => (
                  <InputCustom
                    label="Apellido"
                    value={value}
                    onChangeText={onChange}
                    error={errors?.lastName?.message}
                  />
                )}
              />
              <InputCustom
                label="Email"
                value={userData?.email}
                editable={false}
                style={{opacity: 0.5}}
              />
              <Controller
                control={control}
                name={`${onb}.mobileNumber`}
                rules={{required: 'Este campo es requerido'}}
                render={({field: {onChange, value}}) => (
                  <InputCustom
                    label="Teléfono"
                    value={value?.toString()}
                    onChangeText={onChange}
                    error={onbErrors?.mobileNumber?.message}
                    keyboardType="phone-pad"
                  />
                )}
              />
              <Controller
                control={control}
                name={`${onb}.gender`}
                rules={{required: 'Este campo es requerido'}}
                render={({field: {onChange, value}}) => (
                  <DropdownInput
                    labelText="Género"
                    items={SEX_SELECT_OPTIONS}
                    value={value}
                    onValueChange={onChange}
                    error={onbErrors?.gender?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name={`${onb}.dateOfBirth`}
                rules={{required: 'Este campo es requerido'}}
                render={({field: {onChange, value}}) => (
                  <InputDate
                    label="Fecha de Nacimiento"
                    value={isoToDisplay(value)}
                    onChangeText={val => onChange(val)}
                    error={onbErrors?.dateOfBirth}
                  />
                )}
              />
            </View>
          ) : (
            <View>
              <InfoItem label="Nombre" value={userData?.firstName} />
              <InfoItem label="Apellido" value={userData?.lastName} />
              <InfoItem label="Email" value={userData?.email} />
              <InfoItem label="Teléfono" value={onboardingData?.mobileNumber} />
              <InfoItem
                label="Género"
                value={formatText(onboardingData?.gender)}
              />
              <InfoItem
                label="Fecha de Nacimiento"
                value={formatDate(onboardingData?.dateOfBirth)}
              />
            </View>
          )}
        </View>

        {/* Información Específica según el rol */}
        {isChamp ? (
          <View style={[styles.section, {marginBottom: 50}]}>
            <TextBase
              text="Información de Entrenamiento"
              color={COLORS.dark.primary}
              size={18}
              fontFamily={'AirbnbCereal_W_Bd'}
              style={styles.sectionTitle}
            />

            {isEditing ? (
              <View>
                <Controller
                  control={control}
                  name={`${onb}.goal`}
                  rules={{required: 'Este campo es requerido'}}
                  render={({field: {onChange, value}}) => (
                    <DropdownInput
                      labelText="Objetivo"
                      items={goal}
                      value={value}
                      onValueChange={onChange}
                      error={onbErrors?.goal?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${onb}.trainDuration`}
                  rules={{required: 'Este campo es requerido'}}
                  render={({field: {onChange, value}}) => (
                    <DropdownInput
                      labelText="Duración"
                      items={TRAINING_DURATION}
                      value={value}
                      onValueChange={onChange}
                      error={onbErrors?.trainDuration?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${onb}.trainPerWeek`}
                  rules={{required: 'Este campo es requerido'}}
                  render={({field: {onChange, value}}) => (
                    <DropdownInput
                      labelText="Frecuencia (veces por semana)"
                      items={TRAININGS_PER_WEEK}
                      value={value}
                      onValueChange={onChange}
                      error={onbErrors?.trainPerWeek?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${onb}.placeToTrain`}
                  rules={{required: 'Este campo es requerido'}}
                  render={({field: {onChange, value}}) => (
                    <DropdownInput
                      labelText="Lugar"
                      items={FAVORITE_TRAINING_PLACE}
                      value={value}
                      onValueChange={onChange}
                      error={onbErrors?.placeToTrain?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${onb}.experienceLevel`}
                  rules={{required: 'Este campo es requerido'}}
                  render={({field: {onChange, value}}) => (
                    <DropdownInput
                      labelText="Nivel"
                      items={experienceLevel}
                      value={value}
                      onValueChange={onChange}
                      error={onbErrors?.experienceLevel?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${onb}.height`}
                  rules={{required: 'Este campo es requerido'}}
                  render={({field: {onChange, value}}) => (
                    <DropdownInput
                      labelText="Altura (cm)"
                      items={HEIGHT_SELECT_OPTIONS}
                      value={value}
                      onValueChange={onChange}
                      error={onbErrors?.height?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${onb}.weight`}
                  rules={{required: 'Este campo es requerido'}}
                  render={({field: {onChange, value}}) => (
                    <DropdownInput
                      labelText="Peso (kg)"
                      items={WEIGHT_SELECT_OPTIONS}
                      value={value}
                      onValueChange={onChange}
                      error={onbErrors?.weight?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${onb}.lastInjuries`}
                  render={({field: {onChange, value}}) => (
                    <InputCustom
                      label="Lesiones (opcional)"
                      value={value}
                      onChangeText={onChange}
                      error={onbErrors?.lastInjuries?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${onb}.activityLevel`}
                  rules={{required: 'Este campo es requerido'}}
                  render={({field: {onChange, value}}) => (
                    <DropdownInput
                      labelText="Nivel de Actividad"
                      items={activityLevel}
                      value={value}
                      onValueChange={onChange}
                      error={onbErrors?.activityLevel?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${onb}.foodPerDay`}
                  rules={{required: 'Este campo es requerido'}}
                  render={({field: {onChange, value}}) => (
                    <DropdownInput
                      labelText="Comidas por Día"
                      items={FOOD_PER_DAY}
                      value={value}
                      onValueChange={onChange}
                      error={onbErrors?.foodPerDay?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${onb}.dietsPreferences`}
                  rules={{required: 'Este campo es requerido'}}
                  render={({field: {onChange, value}}) => (
                    <DropdownInput
                      labelText="Preferencias"
                      items={FOOD_PREFERENCES}
                      value={value}
                      onValueChange={onChange}
                      error={onbErrors?.dietsPreferences?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`${onb}.otherConsiderations`}
                  render={({field: {onChange, value}}) => (
                    <InputCustom
                      label="Otras consideraciones (opcional)"
                      value={value}
                      onChangeText={onChange}
                      error={onbErrors?.otherConsiderations?.message}
                    />
                  )}
                />
              </View>
            ) : (
              <View>
                <InfoItem
                  label="Objetivo"
                  value={formatText(onboardingData?.goal)}
                />
                <InfoItem
                  label="Duración"
                  value={formatDuration(onboardingData?.trainDuration)}
                />
                <InfoItem
                  label="Frecuencia"
                  value={
                    onboardingData?.trainPerWeek
                      ? `${onboardingData?.trainPerWeek} veces por semana`
                      : 'No especificado'
                  }
                />
                <InfoItem
                  label="Lugar"
                  value={formatText(onboardingData?.placeToTrain)}
                />
                <InfoItem
                  label="Nivel"
                  value={formatText(onboardingData?.experienceLevel)}
                />
                <InfoItem
                  label="Altura"
                  value={
                    onboardingData?.height
                      ? `${onboardingData?.height}cm`
                      : 'No especificado'
                  }
                />
                <InfoItem
                  label="Peso"
                  value={
                    onboardingData?.weight
                      ? `${onboardingData?.weight}kg`
                      : 'No especificado'
                  }
                />
                <InfoItem
                  label="Lesiones"
                  value={onboardingData?.lastInjuries}
                />
                <InfoItem
                  label="Nivel de Actividad"
                  value={formatText(onboardingData?.activityLevel)}
                />
                <InfoItem
                  label="Comidas por Día"
                  value={onboardingData?.foodPerDay}
                />
                <InfoItem
                  label="Preferencias"
                  value={formatText(onboardingData?.dietsPreferences)}
                />
                <InfoItem
                  label="Otras Consideraciones"
                  value={onboardingData?.otherConsiderations}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={[styles.section, {marginBottom: 50}]}>
            <TextBase
              text="Información Profesional"
              color={COLORS.dark.primary}
              size={18}
              fontFamily={'AirbnbCereal_W_Bd'}
              style={styles.sectionTitle}
            />

            {isEditing ? (
              <View>
                <Controller
                  control={control}
                  name={`${onb}.experienceYears`}
                  render={({field: {onChange, value}}) => (
                    <InputCustom
                      label="Años de Experiencia"
                      value={value?.toString()}
                      onChangeText={onChange}
                      error={onbErrors?.experienceYears?.message}
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
            ) : (
              <View>
                <InfoItem
                  label="Años de Experiencia"
                  value={onboardingData?.experienceYears}
                />
                <InfoItem
                  label="Especialidades"
                  value={onboardingData?.specialties?.join(', ')}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.backgroundCard,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
});
