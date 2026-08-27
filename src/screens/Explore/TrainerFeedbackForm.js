import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import TextBase from '../../components/Base/TextBase';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import {COLORS} from '../../style/style';
import {Rating} from 'react-native-ratings';
import {Controller, useForm} from 'react-hook-form';
import {usePostReview} from '../../hooks/gym/queries';
import Toast from 'react-native-toast-message';
import {GoBackArrow} from '../../components/GoBackArrow';
import TextAreaInput from '../../components/Input/TextAreaInput';

const {dark: theme} = COLORS;

export const TrainerFeedbackForm = ({route, navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      rating: 3,
      review: '',
      trainerId: route.params.trainerId,
    },
  });

  const {mutateAsync, isPending} = usePostReview();

  const onSubmit = async data => {
    await mutateAsync(data, {
      onSuccess: () => {
        navigation.navigate('UserDashboard');
        Toast.show({
          type: 'success',
          text1: 'Hecho',
          text2: 'Gracias por tu calificación',
        });
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.message,
        });
      },
    });
  };

  return (
    <View style={styles.container}>
      <GoBackArrow style={styles.goBackArrow} />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
          minHeight: 500,
          maxHeight: '100%',
        }}
        style={{
          backgroundColor: theme.background,
          width: '100%',
        }}
        showsVerticalScrollIndicator>
        <TextBase
          color={'#fff'}
          text={'Dejá tu opinión sobre el entrenador'}
          fontFamily={'AirbnbCereal_W_Bd'}
          lines={2}
          size={24}
          style={{
            textAlign: 'center',
          }}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <TextAreaInput
              label={'Comentarios'}
              numberOfLines={6}
              placeholder="Deja un comentario"
              error={errors.review}
              value={value}
              onChangeText={value => {
                onChange(value);
              }}
              maxLength={350}
            />
          )}
          name="review"
          rules={{required: 'El campo es requerido'}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Rating
              tintColor={theme.background}
              style={{
                backgroundColor: theme.background,
                borderColor: 'transparent',
                borderWidth: 20,
                width: 212,
                marginBottom: 30,
              }}
              ratingColor={COLORS.dark.textPrimary}
              onSwipeRating={value => onChange(value)}
            />
          )}
          name="rating"
          rules={{required: 'El campo es requerido'}}
        />
        <ButtonGradient
          onPress={handleSubmit(onSubmit)}
          isLoading={isPending}
          text={'Guardar'}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 20,
  },
  goBackArrow: {
    marginBottom: 20,
    position: 'absolute',
    left: 10,
    top: 40,
  },
});
