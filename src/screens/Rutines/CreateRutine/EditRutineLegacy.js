import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import TextBase from '../../../components/Base/TextBase';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  HStack,
  StyledProvider,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import InputCustom from '../../../components/Input/Input';
import ImagePicker from 'react-native-image-crop-picker';

import {RUTINE_TYPE} from '../../../constants/rutineType';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {MUSCULAR_GROUP} from '../../../constants/muscularGroup';
import DropDownIcon from '../../../components/Collapsible/components/DropDownIcon';
import {
  faChevronDown,
  faChevronUp,
  faCloudArrowUp,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';
import {
  useCreateOrUpdateRutineMutation,
  useGetRutineById,
} from '../../../hooks/rutines/queries';
import Toast from 'react-native-toast-message';
import {DropdownInput} from '../../../components/DropdownInput/DropdownInput';
import {COLORS} from '../../../style/style';
import VideoPlayer from 'react-native-video-player';
import TextAreaInput from '../../../components/Input/TextAreaInput';
import {DURATION_UNIT} from '../../../constants/inputs-options';

const intialValues = {
  restTime: '',
  intensity: 'ALTA',
  comments_by_trainer: '',
  weightSet: 1,
  repetition: null,
  set: null,
  exerciseName: null,
  exerciseNumber: 1,
  muscleGroup: null,
  video: null,
};

export default function EditRutineLegacy({navigation, route}) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [deleteVideoUrls, setDeleteVideoUrls] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const rutineQuery = useGetRutineById(route?.params?.rutine_id || '');
  const {isPending, mutateAsync} = useCreateOrUpdateRutineMutation(
    route?.params?.rutine_id || null,
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      rutineType: '',
      enabled: true,
      status: 'HABILITADO',
      estimatedDuration: null,
      description: '',
      shortDescription: '',
      name: '',
      exercises: route?.params?.rutine_id ? [] : [intialValues],
      muscleGroup: null,
      mainImage: null,
      numberDuration: '3',
      unitDuration: 'días',
    },
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });
  const {fields, append, remove} = useFieldArray({
    control: control,
    name: 'exercises',
  });

  const placeholder = {
    label: 'Selecciona una opción',
    value: null,
  };

  const placeholderUnitDuration = {
    label: 'días',
    value: 'días',
  };

  const handleAddRow = props => {
    append(intialValues);
  };

  const rutineType = watch('rutineType');

  const checkVideos = () => {
    if (!watch(`exercises.${0}.videoUrl`)) {
      setError(`exercises.${0}.videoUrl`, {
        message: 'Este campo es requerido',
      });
    }
    watch('exercises')?.forEach((_exercise, index) => {
      if (!watch(`exercises.${index}.videoUrl`)) {
        setError(`exercises.${index}.videoUrl`, {
          message: 'Este campo es requerido',
        });
      } else {
        clearErrors(`exercises.${index}.videoUrl`);
      }
    });
  };

  const onPresSubmit = async data => {
    try {
      const formData = new FormData();

      // Agregar los campos básicos
      formData.append('rutineType', data.rutineType);
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('shortDescription', data.shortDescription);
      formData.append('muscleGroup', data.muscleGroup);
      formData.append('estimatedDuration', data.estimatedDuration || '45');
      formData.append(
        'duration',
        `${data.numberDuration} ${data.unitDuration}`,
      );
      formData.append('isPremium', false);
      formData.append('deleteVideoUrls', JSON.stringify(deleteVideoUrls));

      // Procesar los ejercicios
      const exercisesData = data.exercises.map(exercise => ({
        restTime: parseInt(exercise.restTime) || 60,
        intensity: exercise.intensity || 'ALTA',
        comments_by_trainer: exercise.comments_by_trainer || '',
        weightSet: parseInt(exercise.weightSet) || 1,
        repetition: parseInt(exercise.repetition),
        set: parseInt(exercise.set),
        exerciseName: exercise.exerciseName,
      }));

      // Agregar los ejercicios como JSON string
      formData.append('exercisesJson', JSON.stringify(exercisesData));

      // Si hay imagen principal, agregarla
      if (data.mainImage) {
        const imageUri = data.mainImage.uri;
        const imageName = imageUri.split('/').pop();
        formData.append('mainImage', {
          uri: imageUri,
          type: 'image/jpeg',
          name: imageName || 'mainImage.jpg',
        });
      }

      // Si hay videos, agregarlos
      const videoOrder = [];
      data.exercises.forEach((exercise, index) => {
        if (exercise.videoUrl) {
          const videoUri = exercise.videoUrl;
          if (videoUri.includes('amazonaws')) {
            // Para videos existentes, guardamos la URL y su índice
            videoOrder.push({
              type: 'existing',
              url: videoUri,
              index: index,
            });
          } else {
            // Para videos nuevos, guardamos el índice
            videoOrder.push({
              type: 'new',
              index: index,
            });
            const videoName = videoUri.split('/').pop();
            formData.append('videos', {
              uri: videoUri,
              type: 'video/mp4',
              name: videoName || `video${index + 1}.mp4`,
            });
          }
        }
      });

      // Agregamos el orden de los videos como JSON
      formData.append('videoOrder', JSON.stringify(videoOrder));

      // Log para debug
      console.log('FormData content:');
      console.log('rutineType:', data.rutineType);
      console.log('name:', data.name);
      console.log('description:', data.description);
      console.log('shortDescription:', data.shortDescription);
      console.log('muscleGroup:', data.muscleGroup);
      console.log('estimatedDuration:', data.estimatedDuration || '45');
      console.log('isPremium:', false);
      console.log('exercisesJson:', JSON.stringify(exercisesData));
      if (data.mainImage) {
        console.log('mainImage:', data.mainImage);
      }
      data.exercises.forEach((exercise, index) => {
        if (exercise.video) {
          console.log(`video${index + 1}:`, exercise.video);
        }
      });

      await mutateAsync(formData, {
        onSuccess: result => {
          reset();
          Toast.show({
            type: 'success',
            text1: `Rutina ${
              route?.params?.rutine_id ? 'actualizada' : 'creada'
            }`,
            text2: `Se ha ${
              route?.params?.rutine_id ? 'actualizado' : 'creado'
            } la rutina`,
          });
          navigation.navigate('TrainerDashboard');
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              error?.response?.data?.message ||
              'Ha ocurrido un error al crear la rutina',
          });
        },
      });
    } catch (error) {
      console.error('Error preparing form data:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Ha ocurrido un error al preparar los datos',
      });
    }
  };

  const pickVideo = async index => {
    try {
      const result = await ImagePicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'MediumQuality',
      });

      if (result) {
        setSelectedVideo(result.path);
        setValue(`exercises.${index}.videoUrl`, result.path);
      }
    } catch (error) {
      console.error('Error picking video:', error);
    }
  };

  const recordVideo = async index => {
    try {
      const result = await ImagePicker.openCamera({
        mediaType: 'video',
        compressVideoPreset: 'MediumQuality',
      });

      if (result) {
        setSelectedVideo(result.path);
        setValue(`exercises.${index}.video`, result.path);
      }
    } catch (error) {
      console.error('Error recording video:', error);
    }
  };

  const pickMainImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageQuality: 0.7,
      });

      if (result) {
        setMainImage(result.path);
        setValue('mainImage', {
          uri: result.path,
          type: 'image/jpeg',
          name: 'mainImage.jpg',
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const removeMainImage = () => {
    setMainImage(null);
    setValue('mainImage', null);
  };

  useEffect(() => {
    if (rutineQuery.data?.data) {
      const rutine = rutineQuery.data?.data;
      setValue('name', rutine.name);
      setValue('description', rutine.description);
      setValue('shortDescription', rutine.shortDescription);
      setValue('rutineType', rutine.rutineType);
      setValue('muscleGroup', rutine.muscleGroup);
      setValue('exercises', rutine.exercises);
      setMainImage(rutine.imageUrl);

      if (rutine.duration) {
        const [numberDuration, unitDuration] = rutine?.duration?.split(' ');
        setValue('numberDuration', numberDuration);
        setValue('unitDuration', unitDuration);
      }
    }
  }, [rutineQuery.data, setValue]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORS.dark.background,
        paddingHorizontal: 12,
        justifyContent: 'space-between',
      }}>
      <VStack marginBottom={30} paddingHorizontal={20} flexDirection="column">
        <Controller
          name="name"
          control={control}
          rules={{required: 'Este campo es requerido'}}
          render={({field: {onChange, value}}) => (
            <InputCustom
              label={'Nombre de la rutina'}
              placeholder="Nombre de la rutina"
              style={{marginVertical: 10}}
              error={errors.name}
              value={value}
              onChangeText={value => onChange(value)}
            />
          )}
        />
        <View style={styles.mainImageContainer}>
          <TextBase
            text={'Imagen principal'}
            color={COLORS.dark.textMuted}
            fontFamily={'AirbnbCereal_W_Bd'}
            size={18}
          />
          {mainImage ? (
            <View style={styles.mainImagePreview}>
              <Image
                source={{uri: mainImage}}
                style={styles.mainImage}
                alt="image-main-rutine"
              />
              <TouchableOpacity
                style={styles.removeMainImage}
                onPress={removeMainImage}>
                <FontAwesomeIcon
                  icon={faTrash}
                  color={COLORS.dark.textPrimary}
                />
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
                  size={40}
                />
                <TextBase text={'Seleccionar imagen'} color={'#fff'} />
              </VStack>
            </TouchableOpacity>
          )}
        </View>
        <Controller
          name="rutineType"
          control={control}
          rules={{required: 'Este campo es requerido'}}
          render={({field: {onChange, value}}) => (
            <DropdownInput
              items={RUTINE_TYPE}
              labelText={'Tipo de rutina'}
              placeholder={placeholder}
              error={errors.rutineType}
              onValueChange={value => {
                value !== 'GYM' && setValue('muscleGroup', null);
                onChange(value);
              }}
              value={value}
            />
          )}
        />

        <View
          style={{
            flexDirection: 'row',
            width: '20%',
          }}>
          <Controller
            name="numberDuration"
            control={control}
            rules={{required: 'Este campo es requerido'}}
            render={({field: {onChange, value}}) => (
              <InputCustom
                label={'Duración'}
                placeholder="3"
                style={{marginVertical: 10, marginTop: 15}}
                error={errors.numberDuration}
                value={value}
                onChangeText={value => onChange(value)}
              />
            )}
          />

          <View
            styles={{
              width: '40%',
              borderColor: 'blue',
              borderWidth: 1,
            }}>
            <Controller
              name="unitDuration"
              control={control}
              rules={{required: 'Este campo es requerido'}}
              render={({field: {onChange, value}}) => (
                <DropdownInput
                  items={DURATION_UNIT}
                  placeholder={placeholderUnitDuration}
                  error={errors.unitDuration}
                  onValueChange={value => {
                    onChange(value);
                  }}
                  value={value}
                  styles={{
                    width: '80%',
                  }}
                />
              )}
            />
          </View>
        </View>

        {rutineType === 'GYM' && (
          <Controller
            name="muscleGroup"
            control={control}
            rules={{required: 'Este campo es requerido'}}
            render={({field: {onChange, value}}) => (
              <DropdownInput
                items={MUSCULAR_GROUP}
                labelText={'Grupo muscular'}
                placeholder={placeholder}
                error={errors.muscleGroup}
                onValueChange={value => onChange(value)}
                value={value}
              />
            )}
          />
        )}
        <Controller
          name="description"
          control={control}
          rules={{required: 'Este campo es requerido'}}
          render={({field: {onChange, value}}) => (
            <TextAreaInput
              label={'Descripción'}
              placeholder="Descripción de la rutina"
              style={{marginVertical: 10}}
              error={errors.description}
              value={value}
              onChangeText={value => onChange(value)}
              numberOfLines={6}
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
              onChangeText={value => onChange(value)}
            />
          )}
        />
        <View style={styles.addExerciseLabel}>
          <TextBase
            text={'Agregar Ejercicio'}
            color={COLORS.dark.textMuted}
            fontFamily={'AirbnbCereal_W_Bd'}
            size={18}
          />
          <TouchableOpacity
            onPress={handleAddRow}
            style={{backgroundColor: '#323337', padding: 10, borderRadius: 11}}>
            <FontAwesomeIcon icon={faPlus} color={'#8A8B8D'} size={20} />
          </TouchableOpacity>
        </View>

        <StyledProvider config={{}}>
          <Accordion
            width="100%"
            size="md"
            backgroundColor={COLORS.dark.background}
            variant="filled"
            type="multiple"
            marginVertical={10}
            isCollapsible={true}
            isDisabled={false}>
            {fields?.map((exercise, index) => {
              return (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 16,
                    }}>
                    <TextBase
                      text={`Bloque ${index + 1}`}
                      color={'#ffff'}
                      size={16}
                      fontFamily={'AirbnbCereal_W_Bd'}
                    />
                    {index !== 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          watch(`exercises.${index}.videoUrl`) !== undefined ??
                            setDeleteVideoUrls(prev => [
                              ...prev,
                              watch(`exercises.${index}.videoUrl`),
                            ]);
                          remove(index);
                        }}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          color={COLORS.dark.textWhite}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <AccordionItem
                    value={exercise.id}
                    marginVertical={5}
                    borderRadius={10}
                    backgroundColor={COLORS.dark.backgroundCard}>
                    <AccordionHeader>
                      <AccordionTrigger>
                        {({isExpanded}) => {
                          return (
                            <View style={styles.accordionHeader}>
                              <VStack width="100%" style={{width: '85%'}}>
                                <HStack justifyContent="space-between">
                                  <TextBase
                                    text={`Ejercicio  ${index + 1}`}
                                    color={COLORS.dark.textPrimary}
                                    size={16}
                                    fontFamily={'AirbnbCereal_W_Bd'}
                                  />
                                  <TextBase
                                    color={COLORS.dark.error}
                                    size={16}
                                    fontFamily={'AirbnbCereal_W_Bd'}
                                    style={{marginLeft: 20}}
                                    text={
                                      (errors.exercises?.[index]?.exerciseName
                                        ?.message ||
                                        errors.exercises?.[index]?.repetition
                                          ?.message ||
                                        errors.exercises?.[index]?.set
                                          ?.message ||
                                        errors.exercises?.[index]?.restTime
                                          ?.message ||
                                        errors.exercises?.[index]?.videoUrl
                                          ?.message) &&
                                      'Requerido'
                                    }
                                  />
                                </HStack>
                              </VStack>
                              {isExpanded ? (
                                <DropDownIcon
                                  icon={faChevronUp}
                                  backgroundColor="transparent"
                                />
                              ) : (
                                <DropDownIcon
                                  icon={faChevronDown}
                                  backgroundColor="transparent"
                                />
                              )}
                            </View>
                          );
                        }}
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent style={styles.accordionContent}>
                      <View
                        style={{
                          height: 20,
                        }}>
                        <Text
                          style={{
                            color: COLORS.dark.error,
                            fontSize: 12,
                            paddingLeft: 10,
                          }}>
                          {(errors.exercises?.[index]?.exerciseName?.message ||
                            errors.exercises?.[index]?.repetition?.message ||
                            errors.exercises?.[index]?.set?.message ||
                            errors.exercises?.[index]?.restTime?.message ||
                            errors.exercises?.[index]?.videoUrl?.message) &&
                            'Complete todos los campos de la rutina'}
                        </Text>
                      </View>
                      <Controller
                        name={`exercises.${index}.exerciseName`}
                        rules={{required: 'Este campo es requerido'}}
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <InputCustom
                            label={'Nombre del ejercicio'}
                            placeholder="Nombre del ejercicio"
                            error={
                              errors.exercises?.[index]?.exerciseName?.message
                            }
                            value={value}
                            onChangeText={value => onChange(value)}
                          />
                        )}
                      />

                      <View style={styles.exerciseDetails}>
                        <View style={{width: '35%'}}>
                          <Controller
                            name={`exercises.${index}.repetition`}
                            rules={{
                              required: 'Requerido',
                              pattern: {
                                value: /^[0-9]*$/,
                                message: 'Solo se permiten numeros',
                              },
                            }}
                            control={control}
                            render={({field: {onChange, value}}) => (
                              <InputCustom
                                label={'Repeticiones'}
                                placeholder="20"
                                error={
                                  errors.exercises?.[index]?.repetition?.message
                                }
                                value={value?.toString()}
                                onChangeText={value => onChange(value)}
                                keyboardType={'numeric'}
                              />
                            )}
                          />
                        </View>
                        <View style={{width: '20%'}}>
                          <Controller
                            name={`exercises.${index}.set`}
                            rules={{
                              required: 'Requerido',
                              pattern: {
                                value: /^[0-9]*$/,
                                message: 'Solo se permiten numeros',
                              },
                            }}
                            control={control}
                            render={({field: {onChange, value}}) => (
                              <InputCustom
                                label={'Sets'}
                                placeholder="3"
                                error={errors.exercises?.[index]?.set?.message}
                                value={value?.toString()}
                                onChangeText={value => onChange(value)}
                                keyboardType={'numeric'}
                              />
                            )}
                          />
                        </View>
                        <View style={{width: '45%'}}>
                          <Controller
                            name={`exercises.${index}.restTime`}
                            rules={{
                              required: 'Requerido',
                            }}
                            control={control}
                            render={({field: {onChange, value}}) => (
                              <InputCustom
                                label={'Descanso'}
                                placeholder="2 minutos"
                                error={
                                  errors.exercises?.[index]?.restTime?.message
                                }
                                value={value}
                                onChangeText={value => onChange(value)}
                              />
                            )}
                          />
                        </View>
                      </View>
                      <Controller
                        name={`exercises.${index}.comments_by_trainer`}
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <InputCustom
                            label={'Notas'}
                            placeholder="Escriba una nota (opcional)"
                            error={
                              errors.exercises?.[index]?.comments_by_trainer
                                ?.message
                            }
                            value={value}
                            onChangeText={value => onChange(value)}
                          />
                        )}
                      />

                      <View style={styles.videoContainer}>
                        {watch(`exercises.${index}.videoUrl`) ? (
                          <View style={styles.videoPreview}>
                            <VideoPlayer
                              video={{
                                uri: watch(`exercises.${index}.videoUrl`),
                              }}
                              style={styles.videoThumbnail}
                            />
                            <TouchableOpacity
                              style={styles.removeVideo}
                              onPress={() => {
                                const videoUrl = watch(
                                  `exercises.${index}.videoUrl`,
                                );
                                if (videoUrl) {
                                  setDeleteVideoUrls(prev => [
                                    ...prev,
                                    videoUrl,
                                  ]);
                                }
                                setSelectedVideo(null);
                                setValue(`exercises.${index}.videoUrl`, null);
                              }}>
                              <FontAwesomeIcon
                                icon={faTrash}
                                color={COLORS.dark.textPrimary}
                              />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View style={styles.videoOptions}>
                            <TouchableOpacity
                              activeOpacity={0.9}
                              style={[
                                styles.videoOption,
                                errors.exercises?.[index]?.videoUrl
                                  ? styles.errorVideoInput
                                  : null,
                              ]}
                              onPress={() => pickVideo(index)}>
                              <VStack
                                justifyContent="center"
                                alignItems="center"
                                height={'$full'}>
                                <FontAwesomeIcon
                                  icon={faCloudArrowUp}
                                  color={
                                    errors.exercises?.[index]?.videoUrl
                                      ? COLORS.dark.error
                                      : COLORS.dark.textPrimary
                                  }
                                  size={40}
                                />
                                <TextBase
                                  text={'Seleccionar video'}
                                  color={'#fff'}
                                  size={16}
                                  style={{
                                    color: errors.exercises?.[index]?.videoUrl
                                      ? COLORS.dark.error
                                      : '#fff',
                                  }}
                                />
                              </VStack>
                            </TouchableOpacity>
                          </View>
                        )}
                        <TextBase
                          text={'Soporte máximo 10 Mb'}
                          color={COLORS.dark.textMuted}
                          style={styles.videoSupportText}
                        />
                      </View>
                    </AccordionContent>
                  </AccordionItem>
                </>
              );
            })}
          </Accordion>
        </StyledProvider>
      </VStack>
      <HStack justifyContent="center" marginBottom={50}>
        <ButtonGradient
          text={route.params?.rutine_id ? 'Actualizar Rutina' : 'Crear Rutina'}
          onPress={() => {
            checkVideos();
            handleSubmit(onPresSubmit)();
          }}
          isLoading={isPending}
        />
      </HStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  accordionHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  accordionContent: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  addExerciseLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 10,
  },
  exerciseDetails: {
    flexDirection: 'row',
    marginVertical: 20,
    flexWrap: 'wrap',
  },
  videoContainer: {
    marginVertical: 10,
  },
  videoPreview: {
    position: 'relative',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: '100%',
  },
  removeVideo: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  videoOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  videoOption: {
    flex: 1,
    backgroundColor: '#514F4F',
    padding: 10,
    height: 120,
    borderRadius: 20,
  },
  videoSupportText: {
    textAlign: 'center',
    marginTop: 5,
  },
  mainImageContainer: {
    marginVertical: 10,
  },
  mainImagePreview: {
    position: 'relative',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10,
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
    backgroundColor: '#514F4F',
    padding: 10,
    height: 120,
    borderRadius: 20,
    marginTop: 10,
  },
  errorVideoInput: {
    borderWidth: 2,
    borderColor: COLORS.dark.error,
    backgroundColor: '#1e1d1d',
  },
});
