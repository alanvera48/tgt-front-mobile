import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS} from '../../style/style';
import TextBase from '../../components/Base/TextBase';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import Animated from 'react-native-reanimated';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import ButtonSecundary from '../../components/Buttons/ButtonSecundary';
import {
  useGetChampProgress,
  useUpdateChampProgress,
} from '../../hooks/user/queries';
import {DropdownYear} from './DropdownYear';
import {DEVICE_HEIGHT} from '../../constants';
import {IMAGE_KEYS, INITIAL_YEAR, MONTHS, YEARS_OPTIONS} from './Constants';
import {useAuthStore} from '../../store/authStore';
import {
  EmptyCard,
  NextArrow,
  PictureCard,
  PreviousArrow,
  TextCard,
} from './Components';
import {useManagePictures} from './useManagePictures';
import {CenteredModal} from '../../components/AnimatedContainers/CenteredModal';

// TODO: ESTE COMPONENTE NECESITA REFACTOR!!!
export default function ChampProgressSeenByChamp({champ_id}) {
  const trainerData = useAuthStore(state => state.trainerData);
  const [dateState, setDateState] = useState({
    monthIndex: 0,
    year: 2025,
  });
  const [visible, setVisible] = useState(false);
  const AnimatedView = Animated.createAnimatedComponent(View);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    data: champProgress,
    refetch: refetchChampProgress,
    isPending: isPendingChampProgress,
  } = useGetChampProgress({
    champId: champ_id,
    year: dateState.year,
    enabled: trainerData?.enabled,
  });

  const {mutateAsync: updateChampProgress, isPending: isPendingUpdateProgress} =
    useUpdateChampProgress();

  const {images, selectImage} = useManagePictures(champProgress, dateState);

  const onSubmit = image => {
    updateChampProgress(
      {
        id: champProgress[dateState.monthIndex]?.id,
        data: {
          newPhoto: image,
          keyPhoto: selectedImage,
        },
      },
      {
        onSuccess: result => {
          refetchChampProgress();
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error?.message,
          });
        },
      },
    );
  };

  useEffect(() => {
    refetchChampProgress();
  }, [refetchChampProgress, dateState.year]);

  const handlePressPreviousArrow = () => {
    if (dateState.monthIndex === 0) {
      const newDateState = {
        monthIndex: 11, // Diciembre
        year: dateState.year - 1,
      };
      setDateState(newDateState);
    } else {
      setDateState(prevState => ({
        ...prevState,
        monthIndex: prevState.monthIndex - 1,
      }));
    }
  };

  const handlePressNextArrow = () => {
    if (dateState.monthIndex !== 11) {
      setDateState(prevState => ({
        ...prevState,
        monthIndex: prevState.monthIndex + 1,
      }));
    } else {
      setDateState(prevState => ({
        monthIndex: 0,
        year: prevState.year + 1,
      }));
    }
  };

  const uploadImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(imageResult => {
      onSubmit(imageResult);
      setVisible(false);
    });
    // .catch(error => {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Error',
    //     text2: 'Algo salió mal, por favor intenta de nuevo',
    //   });
    // });
  };

  const uploadImageFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(imageResult => {
      onSubmit(imageResult);
      setVisible(false);
    });
    // .catch(error => {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Error',
    //     text2: 'Algo salió mal, por favor intenta de nuevo',
    //   });
    // });
  };

  if (isPendingChampProgress && !images) {
    return (
      <View style={styles.containerView}>
        <View
          style={{
            height: DEVICE_HEIGHT - 260,
            justifyContent: 'center',
            width: '100%',
            zIndex: 2,
          }}>
          <ActivityIndicator size="large" color={COLORS.dark.textPrimary} />
        </View>
      </View>
    );
  }

  if (champProgress === undefined && !isPendingChampProgress) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.dark.background,
          height: DEVICE_HEIGHT - 300,
          paddingHorizontal: 30,
          textAlign: 'center',
        }}>
        <TextBase
          text={
            'No hay progresos disponibles, ya que no tenés un entrenador asignado, o aún no aceptó tu solicitud.'
          }
          color={COLORS.dark.textWhite}
          style={{textAlign: 'center'}}
          lines={3}
          size={16}
          fontFamily={'AirbnbCereal_W_Bk'}
        />
      </View>
    );
  }

  return (
    <>
      <View style={styles.containerView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          {isPendingUpdateProgress && (
            <View
              style={{
                height: DEVICE_HEIGHT,
                position: 'absolute',
                width: '100%',
                justifyContent: 'center',
                zIndex: 2,
              }}>
              <ActivityIndicator size="large" color={COLORS.dark.textPrimary} />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 10,
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <PreviousArrow
              onPress={() => handlePressPreviousArrow()}
              style={{
                opacity:
                  dateState.year === INITIAL_YEAR && dateState.monthIndex === 0
                    ? 0.3
                    : 1,
              }}
              disabled={
                dateState.year === INITIAL_YEAR && dateState.monthIndex === 0
              }
            />
            <View style={{alignItems: 'center'}}>
              <TextBase
                text={MONTHS[dateState.monthIndex]}
                fontFamily={'AirbnbCereal_W_Bd'}
                size={24}
                color={COLORS.dark.primary}
                style={{marginBottom: 6}}
              />
              <View
                style={{
                  height: 40,
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <DropdownYear
                  items={YEARS_OPTIONS}
                  onValueChange={value => {
                    setDateState(prevState => ({
                      ...prevState,
                      year: value ?? INITIAL_YEAR,
                      monthIndex: prevState.monthIndex,
                    }));
                  }}
                  value={dateState.year}
                />
              </View>
            </View>
            <NextArrow
              onPress={() => handlePressNextArrow()}
              style={{
                opacity:
                  dateState.year ===
                    YEARS_OPTIONS[YEARS_OPTIONS.length - 1].value &&
                  dateState.monthIndex === 11
                    ? 0.3
                    : 1,
              }}
              disabled={
                dateState.year ===
                  YEARS_OPTIONS[YEARS_OPTIONS.length - 1].value &&
                dateState.monthIndex === 11
              }
            />
          </View>
          {images?.[0]?.img ? (
            <PictureCard
              index={0}
              imageUri={images?.[0]?.img}
              isBig
              onPress={() => selectImage(0)}
            />
          ) : (
            <EmptyCard
              isBig
              isChamp
              onPress={() => {
                setVisible(!visible);
                setSelectedImage(IMAGE_KEYS[images?.[0]?.name]);
              }}
            />
          )}
          <TextCard text={images?.[0]?.name} isBig />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}
            style={styles.secondaryPicturesContainer}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              {images && images[1]?.img ? (
                <PictureCard
                  index={1}
                  imageUri={images[1]?.img}
                  onPress={() => selectImage(1)}
                />
              ) : (
                <EmptyCard
                  isChamp
                  onPress={() => {
                    setVisible(!visible);
                    setSelectedImage(IMAGE_KEYS[images?.[1]?.name]);
                  }}
                />
              )}
              <TextCard text={images?.[1]?.name} />
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              {images && images[2]?.img ? (
                <PictureCard
                  index={2}
                  imageUri={images?.[2]?.img}
                  onPress={() => selectImage(2)}
                />
              ) : (
                <EmptyCard
                  isChamp
                  onPress={() => {
                    setVisible(!visible);
                    setSelectedImage(IMAGE_KEYS[images?.[2]?.name]);
                  }}
                />
              )}
              <TextCard text={images?.[2]?.name} />
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              {images && images[3]?.img ? (
                <PictureCard
                  index={3}
                  imageUri={images?.[3]?.img}
                  onPress={() => selectImage(3)}
                />
              ) : (
                <EmptyCard
                  isChamp
                  onPress={() => {
                    setVisible(!visible);
                    setSelectedImage(IMAGE_KEYS[images?.[3]?.name]);
                  }}
                />
              )}
              <TextCard text={images?.[3]?.name} />
            </View>
          </ScrollView>
        </ScrollView>
      </View>
      <CenteredModal isVisible={visible} setIsVisible={setVisible}>
        <ButtonGradient
          text={'Tomar una foto'}
          onPress={() => uploadImageFromCamera()}
        />
        <ButtonSecundary
          style={{marginTop: 20, position: 'relative', zIndex: 9999}}
          text={'Seleccionar de la galería'}
          onPress={() => uploadImageFromGallery()}
        />
      </CenteredModal>
    </>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
    paddingBottom: 20,
  },
  secondaryPicturesContainer: {
    marginVertical: 20,
    width: '100%',
    flex: 1,
  },
});
