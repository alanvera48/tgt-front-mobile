import React, {useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {HStack, VStack} from '@gluestack-ui/themed';
import ToggleSwitch from '../../../components/Input/ToggleSwitch';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCloudArrowUp,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

import TextBase from '../../../components/Base/TextBase';
import InputCustom from '../../../components/Input/Input';
import ChipSelector from '../../../components/Input/ChipSelector';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';
import {COLORS} from '../../../style/style';
import {RUTINE_TYPE} from '../../../constants/rutineType';
import {MUSCULAR_GROUP} from '../../../constants/muscularGroup';
import {experienceLevel} from '../../../constants/activityLevel';
import {DURATION_UNIT} from '../../../constants/inputs-options';
import {
  useCreateRutineExerciseMutation,
  useCreateRutineHeaderMutation,
} from '../../../hooks/rutines/queries';
import DraggableExerciseCard from './DraggableExerciseCard';
import ExercisePickerModal from './ExercisePickerModal';

const emptyExercise = () => ({
  name: '',
  sets: '3',
  reps: '10',
  rest: '60',
  video: null,
  exerciseVideoId: null,
  groupedWithPrevious: false,
});

const HEADER_FIELDS = [
  'name',
  'rutineType',
  'muscleGroup',
  'description',
  'shortDescription',
  'numberDuration',
  'unitDuration',
];

function buildExercisePayload(exercises) {
  const payload = [];
  let order = 0;
  let currentSuperSetId = null;
  let subOrderCounter = 0;

  exercises.forEach((exercise, index) => {
    const isGrouped = index > 0 && exercise.groupedWithPrevious;
    if (!isGrouped) {
      order += 1;
      currentSuperSetId = null;
      subOrderCounter = 0;
      payload.push({...exercise, order, superSetId: null, suborder: null});
      return;
    }

    const prev = payload[payload.length - 1];
    if (!currentSuperSetId) {
      currentSuperSetId = `ss-${Date.now()}-${order}`;
      prev.superSetId = currentSuperSetId;
      prev.suborder = 1;
      subOrderCounter = 1;
    }
    subOrderCounter += 1;
    payload.push({
      ...exercise,
      order,
      superSetId: currentSuperSetId,
      suborder: subOrderCounter,
    });
  });

  return payload;
}

export default function CreateRutineWizard({navigation}) {
  const [step, setStep] = useState('header');
  const [routineId, setRoutineId] = useState(null);
  const [exerciseStatus, setExerciseStatus] = useState({});
  const [isSavingExercises, setIsSavingExercises] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const itemLayoutsRef = useRef({});

  const createHeaderMutation = useCreateRutineHeaderMutation();
  const createExerciseMutation = useCreateRutineExerciseMutation();

  const {
    control,
    trigger,
    getValues,
    setValue,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      rutineType: '',
      name: '',
      description: '',
      shortDescription: '',
      muscleGroup: null,
      category: '',
      type: '',
      level: null,
      isPremium: false,
      estimatedDuration: '',
      numberDuration: '4',
      unitDuration: 'semanas',
      mainImage: null,
      exercises: [emptyExercise()],
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const {fields, append, remove, move, insert} = useFieldArray({
    control,
    name: 'exercises',
  });

  const mainImage = watch('mainImage');

  const measureItem = (index, layout) => {
    itemLayoutsRef.current[index] = layout;
  };
  const getLayoutForIndex = index => itemLayoutsRef.current[index];

  const pickMainImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageQuality: 0.7,
      });
      if (result) {
        setValue('mainImage', {
          uri: result.path,
          type: 'image/jpeg',
          name: 'mainImage.jpg',
        });
      }
    } catch (error) {
      // El usuario canceló la selección, no hacemos nada.
    }
  };

  const removeMainImage = () => setValue('mainImage', null);

  const pickExerciseVideo = async index => {
    try {
      const result = await ImagePicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'MediumQuality',
      });
      if (result) {
        setValue(`exercises.${index}.video`, {
          uri: result.path,
          type: 'video/mp4',
          name: `video-${index}.mp4`,
        });
      }
    } catch (error) {
      // El usuario canceló la selección, no hacemos nada.
    }
  };

  const removeExerciseVideo = index =>
    setValue(`exercises.${index}.video`, null);

  const handleContinueToExercises = async () => {
    const valid = await trigger(HEADER_FIELDS);
    if (!valid) {
      Toast.show({
        type: 'error',
        text1: 'Faltan datos',
        text2: 'Completá los campos obligatorios para continuar',
      });
      return;
    }

    const values = getValues();
    const formData = new FormData();
    formData.append('rutineType', values.rutineType);
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('shortDescription', values.shortDescription);
    formData.append('muscleGroup', values.muscleGroup);
    formData.append(
      'duration',
      `${values.numberDuration} ${values.unitDuration}`,
    );
    formData.append('isPremium', String(!!values.isPremium));
    if (values.estimatedDuration) {
      formData.append('estimatedDuration', String(values.estimatedDuration));
    }
    if (values.category) {
      formData.append('category', values.category);
    }
    if (values.type) {
      formData.append('type', values.type);
    }
    if (values.level) {
      formData.append('level', values.level);
    }
    if (values.mainImage) {
      formData.append('mainImage', {
        uri: values.mainImage.uri,
        type: 'image/jpeg',
        name: values.mainImage.name || 'mainImage.jpg',
      });
    }

    try {
      const result = await createHeaderMutation.mutateAsync(formData);
      const newRoutineId = result?.data?.id;
      if (!newRoutineId) {
        throw new Error('El servidor no devolvió el id de la rutina');
      }
      setRoutineId(newRoutineId);
      setStep('exercises');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.response?.data?.message || 'No se pudo crear la rutina',
      });
    }
  };

  const handleDragEnd = (from, to) => {
    move(from, to);
    setValue(`exercises.${from}.groupedWithPrevious`, false);
    setValue(`exercises.${to}.groupedWithPrevious`, false);
  };

  const removeExercise = index => {
    const fieldId = fields[index]?.id;
    remove(index);
    setExerciseStatus(prev => {
      const next = {...prev};
      delete next[fieldId];
      return next;
    });
  };

  const duplicateExercise = index => {
    const current = getValues(`exercises.${index}`);
    insert(index + 1, {
      ...current,
      video: null,
      exerciseVideoId: null,
      groupedWithPrevious: false,
    });
  };

  const handleSelectTemplate = template => {
    append({
      name: template.name || '',
      sets: template.sets != null ? String(template.sets) : '3',
      reps: template.reps != null ? String(template.reps) : '10',
      rest: template.rest != null ? String(template.rest) : '60',
      video: null,
      exerciseVideoId: template.exerciseVideoId || template.id || null,
      groupedWithPrevious: false,
    });
    setPickerVisible(false);
  };

  const handleCreateNewExercise = prefillName => {
    append({...emptyExercise(), name: prefillName || ''});
    setPickerVisible(false);
  };

  const saveExercise = async (exercise, fieldId) => {
    setExerciseStatus(prev => ({...prev, [fieldId]: 'saving'}));
    try {
      const formData = new FormData();
      formData.append('routineId', routineId);
      formData.append('name', exercise.name);
      formData.append('rest', String(exercise.rest));
      formData.append('reps', String(exercise.reps));
      formData.append('sets', String(exercise.sets));
      formData.append('order', String(exercise.order));
      if (exercise.superSetId) {
        formData.append('superSetId', exercise.superSetId);
        formData.append('suborder', String(exercise.suborder));
      }
      if (exercise.exerciseVideoId) {
        formData.append('exerciseVideoId', exercise.exerciseVideoId);
      } else if (exercise.video?.uri) {
        formData.append('video', {
          uri: exercise.video.uri,
          type: 'video/mp4',
          name: exercise.video.name || 'video.mp4',
        });
      }
      await createExerciseMutation.mutateAsync(formData);
      setExerciseStatus(prev => ({...prev, [fieldId]: 'success'}));
      return true;
    } catch (error) {
      setExerciseStatus(prev => ({...prev, [fieldId]: 'error'}));
      return false;
    }
  };

  const handleSaveExercises = async () => {
    const valid = await trigger('exercises');
    if (!valid) {
      Toast.show({
        type: 'error',
        text1: 'Faltan datos',
        text2: 'Completá nombre, sets, reps y descanso de cada ejercicio',
      });
      return;
    }

    const exercisesValues = getValues('exercises');
    const payload = buildExercisePayload(exercisesValues);

    setIsSavingExercises(true);
    let allSucceeded = true;

    for (let i = 0; i < payload.length; i++) {
      const fieldId = fields[i]?.id;
      if (exerciseStatus[fieldId] === 'success') {
        continue;
      }

      const success = await saveExercise(payload[i], fieldId);
      if (!success) {
        allSucceeded = false;
      }
    }

    setIsSavingExercises(false);

    if (allSucceeded) {
      Toast.show({
        type: 'success',
        text1: 'Rutina creada',
        text2: 'Todos los ejercicios se guardaron correctamente',
      });
      navigation.navigate('TrainerDashboard');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Algunos ejercicios no se guardaron',
        text2: 'Revisá los que están marcados en rojo y reintentá',
      });
    }
  };

  const retryExercise = async index => {
    const exercisesValues = getValues('exercises');
    const payload = buildExercisePayload(exercisesValues);
    const fieldId = fields[index]?.id;
    await saveExercise(payload[index], fieldId);
  };

  if (step === 'header') {
    return (
      <ScrollView
        style={styles.screenBackground}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.stepIndicator}>
          <TextBase
            text={'Paso 1 de 2 · Datos de la rutina'}
            size={13}
            color={COLORS.dark.textMuted}
            fontFamily="AirbnbCereal_W_Bd"
          />
        </View>

        <View style={styles.section}>
          <Controller
            name="name"
            control={control}
            rules={{required: 'Este campo es requerido'}}
            render={({field: {onChange, value}}) => (
              <InputCustom
                label={'Nombre de la rutina'}
                placeholder="Nombre de la rutina"
                error={errors.name}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <View style={styles.mainImageContainer}>
            <TextBase
              text={'Imagen principal'}
              color={COLORS.dark.textMuted}
              fontFamily={'AirbnbCereal_W_Bd'}
              size={14}
            />
            {mainImage ? (
              <View style={styles.mainImagePreview}>
                <Image
                  source={{uri: mainImage.uri}}
                  style={styles.mainImage}
                  alt="image-main-rutine"
                />
                <TouchableOpacity
                  style={styles.removeMainImage}
                  onPress={removeMainImage}>
                  <FontAwesomeIcon icon={faTrash} color={'#fff'} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.mainImageUpload}
                onPress={pickMainImage}>
                <VStack
                  justifyContent="center"
                  alignItems="center"
                  height={'$full'}>
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    color={COLORS.dark.textPrimary}
                    size={28}
                  />
                  <TextBase text={'Seleccionar imagen'} color={'#fff'} />
                </VStack>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Controller
            name="rutineType"
            control={control}
            rules={{required: 'Este campo es requerido'}}
            render={({field: {onChange, value}}) => (
              <ChipSelector
                label={'Tipo de rutina'}
                items={RUTINE_TYPE}
                error={errors.rutineType}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            name="muscleGroup"
            control={control}
            rules={{required: 'Este campo es requerido'}}
            render={({field: {onChange, value}}) => (
              <ChipSelector
                label={'Grupo muscular principal'}
                items={MUSCULAR_GROUP}
                error={errors.muscleGroup}
                onChange={onChange}
                value={value}
                horizontal
              />
            )}
          />

          <Controller
            name="level"
            control={control}
            render={({field: {onChange, value}}) => (
              <ChipSelector
                label={'Nivel (opcional)'}
                items={experienceLevel}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.durationRow}>
            <View style={{width: '48%'}}>
              <Controller
                name="numberDuration"
                control={control}
                rules={{required: 'Requerido'}}
                render={({field: {onChange, value}}) => (
                  <InputCustom
                    label={'Duración'}
                    placeholder="4"
                    error={errors.numberDuration}
                    value={value}
                    onChangeText={onChange}
                    keyboardType={'numeric'}
                  />
                )}
              />
            </View>
            <View style={{width: '48%'}}>
              <Controller
                name="unitDuration"
                control={control}
                rules={{required: 'Requerido'}}
                render={({field: {onChange, value}}) => (
                  <ChipSelector
                    items={DURATION_UNIT}
                    error={errors.unitDuration}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Controller
            name="description"
            control={control}
            rules={{required: 'Este campo es requerido'}}
            render={({field: {onChange, value}}) => (
              <InputCustom
                label={'Descripción'}
                placeholder="Descripción de la rutina"
                style={{marginVertical: 10}}
                error={errors.description}
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={3}
                maxLength={330}
              />
            )}
          />

          <Controller
            name="shortDescription"
            control={control}
            rules={{required: 'Este campo es requerido'}}
            render={({field: {onChange, value}}) => (
              <InputCustom
                label={'Descripción corta'}
                placeholder="Descripción corta de la rutina"
                style={{marginVertical: 10}}
                error={errors.shortDescription}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <TextBase
            text={'Detalles opcionales'}
            size={13}
            color={COLORS.dark.textMuted}
            fontFamily="AirbnbCereal_W_Bd"
            style={{marginBottom: 6}}
          />

          <Controller
            name="category"
            control={control}
            render={({field: {onChange, value}}) => (
              <InputCustom
                label={'Categoría'}
                placeholder="Ej: Full body"
                style={{marginVertical: 10}}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <View style={styles.premiumRow}>
            <TextBase
              text={'Rutina premium'}
              size={14}
              color={'#fff'}
              fontFamily="AirbnbCereal_W_Bd"
            />
            <Controller
              name="isPremium"
              control={control}
              render={({field: {onChange, value}}) => (
                <ToggleSwitch value={!!value} onValueChange={onChange} />
              )}
            />
          </View>
        </View>

        <HStack justifyContent="center" marginTop={10} marginBottom={40}>
          <ButtonGradient
            text={'Continuar'}
            onPress={handleContinueToExercises}
            isLoading={createHeaderMutation.isPending}
          />
        </HStack>
      </ScrollView>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.screenBackground}
        scrollEnabled={scrollEnabled}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.stepIndicator}>
          <TextBase
            text={'Paso 2 de 2 · Ejercicios'}
            size={13}
            color={COLORS.dark.textMuted}
            fontFamily="AirbnbCereal_W_Bd"
          />
        </View>

        <View style={styles.infoBanner}>
          <TextBase
            text={
              'La rutina ya fue creada. Si salís antes de guardar todos los ejercicios, vas a poder completarlos más tarde editando la rutina. Mantené presionado el ícono de la izquierda para reordenar.'
            }
            size={12}
            lines={4}
            color={COLORS.dark.textMuted}
            fontFamily="AirbnbCereal_W_Bk"
          />
        </View>

        {fields.map((exercise, index) => (
          <DraggableExerciseCard
            key={exercise.id}
            index={index}
            totalCount={fields.length}
            onMeasure={measureItem}
            getLayoutForIndex={getLayoutForIndex}
            onDragEnd={handleDragEnd}
            onDragStateChange={dragging => setScrollEnabled(!dragging)}
            dragDisabled={isSavingExercises || fields.length < 2}
            control={control}
            errors={errors}
            status={exerciseStatus[exercise.id]}
            canRemove={fields.length > 1}
            canGroup={index > 0}
            groupedWithPrevious={
              !!watch(`exercises.${index}.groupedWithPrevious`)
            }
            onToggleGroup={value =>
              setValue(`exercises.${index}.groupedWithPrevious`, value)
            }
            onRemove={() => removeExercise(index)}
            onDuplicate={() => duplicateExercise(index)}
            onRetry={() => retryExercise(index)}
            onPickVideo={() => pickExerciseVideo(index)}
            onRemoveVideo={() => removeExerciseVideo(index)}
            videoUri={watch(`exercises.${index}.video`)?.uri}
            disabled={isSavingExercises}
          />
        ))}

        <TouchableOpacity
          disabled={isSavingExercises}
          onPress={() => setPickerVisible(true)}
          style={styles.addExerciseButton}>
          <FontAwesomeIcon
            icon={faPlus}
            color={COLORS.dark.primary}
            size={16}
          />
          <TextBase
            text={'Añadir ejercicio'}
            size={14}
            color={COLORS.dark.primary}
            fontFamily="AirbnbCereal_W_Bd"
            style={{marginLeft: 8}}
          />
        </TouchableOpacity>

        <HStack justifyContent="center" marginTop={20} marginBottom={40}>
          <ButtonGradient
            text={'Guardar rutina'}
            onPress={handleSaveExercises}
            isLoading={isSavingExercises}
          />
        </HStack>
      </ScrollView>

      <ExercisePickerModal
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelectTemplate={handleSelectTemplate}
        onCreateNew={handleCreateNewExercise}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  stepIndicator: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  infoBanner: {
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  mainImageContainer: {
    marginTop: 14,
  },
  mainImagePreview: {
    position: 'relative',
    height: 160,
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 8,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  removeMainImage: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  mainImageUpload: {
    backgroundColor: COLORS.dark.backgroundElevated,
    padding: 10,
    height: 100,
    borderRadius: 14,
    marginTop: 8,
  },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  premiumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.dark.primary,
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
});
