import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller} from 'react-hook-form';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowRotateRight,
  faCircleCheck,
  faCircleExclamation,
  faCopy,
  faTrash,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import VideoPlayer from 'react-native-video-player';

import TextBase from '../../../components/Base/TextBase';
import InputCustom from '../../../components/Input/Input';
import Stepper from '../../../components/Input/Stepper';
import ToggleSwitch from '../../../components/Input/ToggleSwitch';
import {COLORS} from '../../../style/style';

const StatusBadge = ({status, onRetry}) => {
  if (status === 'saving') {
    return <ActivityIndicator size="small" color={COLORS.dark.primary} />;
  }
  if (status === 'success') {
    return (
      <FontAwesomeIcon
        icon={faCircleCheck}
        color={COLORS.dark.success}
        size={20}
      />
    );
  }
  if (status === 'error') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onRetry}
        style={styles.retryButton}>
        <FontAwesomeIcon
          icon={faCircleExclamation}
          color={COLORS.dark.error}
          size={16}
        />
        <TextBase
          text={'Reintentar'}
          size={12}
          color={COLORS.dark.error}
          fontFamily="AirbnbCereal_W_Bd"
          style={{marginLeft: 6}}
        />
        <FontAwesomeIcon
          icon={faArrowRotateRight}
          color={COLORS.dark.error}
          size={12}
          style={{marginLeft: 6}}
        />
      </TouchableOpacity>
    );
  }
  return null;
};

export default function ExerciseCard({
  index,
  control,
  errors,
  status,
  canRemove,
  canGroup,
  groupedWithPrevious,
  onToggleGroup,
  onRemove,
  onDuplicate,
  onRetry,
  onPickVideo,
  onRemoveVideo,
  videoUri,
  disabled,
}) {
  const exerciseErrors = errors?.exercises?.[index];

  return (
    <View
      style={[
        styles.card,
        groupedWithPrevious ? styles.cardGrouped : undefined,
      ]}>
      {groupedWithPrevious && (
        <View style={styles.supersetChip}>
          <TextBase
            text={'Parte de un superset'}
            size={11}
            color={COLORS.dark.primary}
            fontFamily="AirbnbCereal_W_Bd"
          />
        </View>
      )}

      <View style={styles.headerRow}>
        <TextBase
          text={`Ejercicio ${index + 1}`}
          size={16}
          color={'#fff'}
          fontFamily="AirbnbCereal_W_Bd"
        />
        <View style={styles.headerActions}>
          <StatusBadge status={status} onRetry={onRetry} />
          <TouchableOpacity
            disabled={disabled}
            onPress={onDuplicate}
            style={styles.iconButton}>
            <FontAwesomeIcon icon={faCopy} color={'#8A8B8D'} size={16} />
          </TouchableOpacity>
          {canRemove && (
            <TouchableOpacity
              disabled={disabled}
              onPress={onRemove}
              style={styles.iconButton}>
              <FontAwesomeIcon
                icon={faTrash}
                color={COLORS.dark.error}
                size={16}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {canGroup && (
        <View style={styles.groupToggleRow}>
          <TextBase
            text={'Agrupar con el ejercicio anterior (superset)'}
            size={13}
            lines={2}
            color={COLORS.dark.textMuted}
            fontFamily="AirbnbCereal_W_Bk"
            style={{flex: 1, marginRight: 10}}
          />
          <ToggleSwitch
            value={groupedWithPrevious}
            onValueChange={onToggleGroup}
            disabled={disabled}
          />
        </View>
      )}

      <Controller
        name={`exercises.${index}.name`}
        control={control}
        rules={{required: 'Este campo es requerido'}}
        render={({field: {onChange, value}}) => (
          <InputCustom
            label={'Nombre del ejercicio'}
            placeholder="Ej: Press de banca"
            error={exerciseErrors?.name}
            value={value}
            readOnly={disabled}
            onChangeText={onChange}
          />
        )}
      />

      <View style={styles.row3}>
        <Controller
          name={`exercises.${index}.sets`}
          control={control}
          rules={{required: 'Requerido'}}
          render={({field: {onChange, value}}) => (
            <Stepper
              label={'Sets'}
              value={value}
              onChange={onChange}
              min={1}
              error={exerciseErrors?.sets}
              disabled={disabled}
            />
          )}
        />
        <Controller
          name={`exercises.${index}.reps`}
          control={control}
          rules={{required: 'Requerido'}}
          render={({field: {onChange, value}}) => (
            <Stepper
              label={'Reps'}
              value={value}
              onChange={onChange}
              min={1}
              error={exerciseErrors?.reps}
              disabled={disabled}
            />
          )}
        />
        <Controller
          name={`exercises.${index}.rest`}
          control={control}
          rules={{required: 'Requerido'}}
          render={({field: {onChange, value}}) => (
            <Stepper
              label={'Descanso (seg)'}
              value={value}
              onChange={onChange}
              min={0}
              step={15}
              error={exerciseErrors?.rest}
              disabled={disabled}
            />
          )}
        />
      </View>

      <View style={styles.videoSection}>
        {videoUri ? (
          <View style={styles.videoPreview}>
            <VideoPlayer
              video={{uri: videoUri}}
              style={styles.videoThumbnail}
            />
            <TouchableOpacity
              disabled={disabled}
              style={styles.removeVideo}
              onPress={onRemoveVideo}>
              <FontAwesomeIcon icon={faTrash} color={'#fff'} size={16} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={disabled}
            style={styles.videoPicker}
            onPress={onPickVideo}>
            <FontAwesomeIcon
              icon={faVideo}
              color={COLORS.dark.textMuted}
              size={18}
            />
            <TextBase
              text={'Agregar video (opcional)'}
              size={13}
              color={COLORS.dark.textMuted}
              fontFamily="AirbnbCereal_W_Bk"
              style={{marginLeft: 8}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  cardGrouped: {
    borderWidth: 1,
    borderColor: COLORS.dark.primary,
  },
  supersetChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(223, 72, 0, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 6,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundElevated,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  row3: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  videoSection: {
    marginTop: 10,
  },
  videoPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dark.backgroundElevated,
    borderRadius: 12,
    paddingVertical: 14,
  },
  videoPreview: {
    position: 'relative',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: '100%',
  },
  removeVideo: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },
});
