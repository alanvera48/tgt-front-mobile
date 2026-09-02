import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextBase from '../../components/Base/TextBase';
import {
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
  Box,
  Divider,
  HStack,
  Tabs,
  VStack,
} from '@gluestack-ui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faDumbbell,
  faChevronLeft,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import {
  useGetTrainerInfoOfGym,
  useGetAlreadyRated,
} from '../../hooks/gym/queries';
import {
  useConnectUserToTrainer,
  useUnlinkTrainerFromChamp,
  useDismissChampRequest,
} from '../../hooks/user/queries';
import Toast from 'react-native-toast-message';
import ReviewCard from '../../components/Card/ReviewCard/ReviewCard';
import {COLORS} from '../../style/style';
import {
  FieldName,
  FieldValue,
  FieldContainer,
} from '../Champs/PersonalInformationChampSection';
import {ConfirmationPopUp} from '../../components/ConfirmationPopUp';
import {MINIMUM_DAYS_TO_RATE_TRAINER} from '../../constants';
import {TabList, TabItem} from '../../components/TabComponents';

const {dark: theme} = COLORS;

export default function TrainerInfo({route, navigation}) {
  const insets = useSafeAreaInsets();
  const isChampAccepted = route?.params?.isChampAccepted;
  const approvedAt = route?.params?.approvedAt;

  const [showUnlinkPopUp, setShowUnlinkPopUp] = useState(false);
  const [showDismissPopUp, setShowDismissPopUp] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  const {mutateAsync, isPending: isPendingConnect} = useConnectUserToTrainer();
  const {mutateAsync: unlinkMutate, isPending: isPendingUnlink} =
    useUnlinkTrainerFromChamp(route.params.trainer_id);
  const {mutateAsync: dismissMutate, isPending: isPendingDismiss} =
    useDismissChampRequest(route.params.trainer_id);

  const {data, isPending} = useGetTrainerInfoOfGym(route.params.trainer_id);

  const {data: alreadyRated} = useGetAlreadyRated(
    isChampAccepted ? route.params.trainer_id : null,
  );

  // Un entrenador puede estar registrado (por su gimnasio) sin haber
  // completado su propio formulario de onboarding todavía: en ese caso
  // onboardingTrainer viene null y no hay experiencia/especialidades/teléfono.
  const onboardingTrainer = data?.user?.onboardingTrainer;
  const hasCompletedProfile = Boolean(onboardingTrainer);
  const specialtiesCount = onboardingTrainer?.specialties?.length ?? 0;
  const reviewsCount = data?.reviews?.length ?? 0;

  const photoSource =
    data?.user?.imageUrl !== null
      ? {uri: data?.user?.imageUrl}
      : onboardingTrainer?.gender === 'FEMENINO'
      ? require('../../assets/image/placeholder-female.png')
      : require('../../assets/image/placeholder-male.png');

  const onPressWhatsapp = () => {
    Linking.openURL(
      `whatsapp://send?text=&phone=${onboardingTrainer?.mobileNumber}`,
    );
  };

  const ratingsSection = (
    <>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={12}
        marginHorizontal={20}>
        <TextBase
          color={'#fff'}
          text={'Calificaciones'}
          fontFamily={'AirbnbCereal_W_Md'}
          size={18}
        />
        {data?.averageRating != null && (
          <HStack
            backgroundColor={theme.primary}
            borderRadius={10}
            justifyContent="center"
            alignItems="center"
            paddingVertical={2}
            paddingHorizontal={12}
            marginLeft={'auto'}>
            <TextBase
              fontFamily={'AirbnbCereal_W_Bd'}
              size={16}
              color={theme.textWhite}
              text={`${data.averageRating.toFixed(1)}`}
            />
          </HStack>
        )}
      </HStack>

      <HStack
        justifyContent="space-between"
        alignItems="center"
        marginHorizontal={32}>
        {reviewsCount > 0 && (
          <>
            <AvatarGroup>
              {data.reviews.slice(0, 4).map((el, index) =>
                el?.user?.imageUrl ? (
                  <Avatar size="md" key={index}>
                    <AvatarFallbackText>
                      {`${el?.user?.firstName} ${el?.user?.lastName}`}
                    </AvatarFallbackText>
                    <AvatarImage
                      size="lg"
                      alt="image-avatar-image"
                      source={{uri: el.user.imageUrl}}
                    />
                  </Avatar>
                ) : (
                  <Avatar alt="image-avatar" key={index}>
                    <AvatarFallbackText>
                      {`${el?.user?.firstName} ${el?.user?.lastName}`}
                    </AvatarFallbackText>
                  </Avatar>
                ),
              )}
            </AvatarGroup>
            <View style={{marginVertical: 35}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Reviews', {
                    trainerId: route?.params.trainer_id,
                    average: data?.average,
                    averageRating:
                      data?.averageRating != null
                        ? data.averageRating.toFixed(1)
                        : null,
                  })
                }>
                <TextBase
                  text={'Ver calificaciones'}
                  size={16}
                  fontFamily={'AirbnbCereal_W_Md'}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </HStack>

      <FlatList
        horizontal
        scrollEnabled={true}
        style={{marginTop: 20, paddingLeft: 20}}
        data={data?.reviews}
        renderItem={({item, index}) => (
          <ReviewCard index={index} item={item} separator={80} />
        )}
        contentInsetAdjustmentBehavior="never"
        snapToAlignment="center"
        decelerationRate="fast"
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        ItemSeparatorComponent={<View style={{width: 10}} />}
        ListEmptyComponent={() => (
          <TextBase
            fontFamily={'AirbnbCereal_W_Bk'}
            text={'Aún no hay calificaciones para este entrenador'}
            color={COLORS.dark.textMuted}
          />
        )}
        contentContainerStyle={{paddingRight: 40}}
      />
    </>
  );

  const hasMinimumTime = () => {
    if (!approvedAt) return false;
    const diffMs = new Date() - new Date(approvedAt);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays >= MINIMUM_DAYS_TO_RATE_TRAINER;
  };

  const canRate = isChampAccepted && !alreadyRated && hasMinimumTime();

  const onPressUnlink = async () => {
    await unlinkMutate(undefined, {
      onSuccess: () => {
        setShowUnlinkPopUp(false);
        Toast.show({
          type: 'success',
          text1: 'Hecho',
          text2: 'Te has desconectado del entrenador',
        });
        navigation.navigate('UserDashboard');
      },
      onError: error => {
        setShowUnlinkPopUp(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.message,
        });
      },
    });
  };

  const onPressDismiss = async () => {
    await dismissMutate(undefined, {
      onSuccess: () => {
        setShowDismissPopUp(false);
        Toast.show({
          type: 'success',
          text1: 'Hecho',
          text2: 'Se canceló la solicitud de conexión',
        });
        navigation.navigate('UserDashboard');
      },
      onError: error => {
        setShowDismissPopUp(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.message,
        });
      },
    });
  };

  const onPressConnect = async () => {
    mutateAsync(
      {trainerId: route.params.trainer_id},
      {
        onSuccess: succes => {
          Toast.show({
            type: 'success',
            text1: 'Hecho',
            text2: 'Se ha enviado la solicitud para conectar con el entrenador',
          });
          navigation.navigate('UserDashboard');
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Ha ocurrido un error al conectar',
          });
        },
      },
    );
  };

  if (isPending) {
    return <LoadingScreen backgroundColor={COLORS.dark.background} />;
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: COLORS.dark.background}}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[style.buttonBackContainer, {top: insets.top + 10}]}
        onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faChevronLeft} size={25} color="#fff" />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.dark.background,
          paddingBottom: 160,
        }}>
        {/* Empuja la foto debajo del notch/Dynamic Island: si arranca en
        y=0 la cara queda tapada, y la altura de esa zona varía por modelo. */}
        <View style={{paddingTop: insets.top}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsPhotoOpen(true)}>
            <Image
              alt="image-trainer"
              source={photoSource}
              resizeMode="cover"
              resizeMethod="scale"
              style={{
                width: '100%',
                height: 280,
              }}
            />
          </TouchableOpacity>
        </View>
        <VStack paddingHorizontal={0}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              paddingHorizontal: 20,
            }}>
            <View>
              <TextBase
                color={'#fff'}
                text={`${data?.user?.firstName} ${data?.user?.lastName}`}
                fontFamily={'AirbnbCereal_W_Bd'}
                lines={2}
                size={24}
                style={{
                  textTransform: 'capitalize',
                }}
              />
              {isChampAccepted === false && (
                <TextBase
                  color={COLORS.dark.textPrimary}
                  text={'Pendiente de aceptación'}
                  fontFamily={'AirbnbCereal_W_Bd'}
                  size={16}
                  style={{marginTop: 6}}
                />
              )}
            </View>
            {onboardingTrainer?.mobileNumber && (
              <TouchableOpacity
                activeOpacity={0.9}
                style={style.itemPress}
                onPress={onPressWhatsapp}>
                <Image
                  source={require('../../assets/image/whatsapp.png')}
                  resizeMode="center"
                  style={{width: 24, height: 24}}
                  alt="whatsapp"
                />
              </TouchableOpacity>
            )}
          </View>

          {hasCompletedProfile && (
            <HStack
              marginTop={20}
              marginBottom={10}
              backgroundColor={COLORS.dark.backgroundInput}
              justifyContent="center"
              borderRadius={16}
              marginHorizontal={20}
              paddingHorizontal={20}
              paddingVertical={30}>
              <VStack flex={1} justifyContent="center" alignItems="center">
                <TextBase
                  color={'#fff'}
                  text={`${onboardingTrainer?.experienceYears ?? 0}`}
                  fontFamily={'AirbnbCereal_W_Bd'}
                  size={20}
                  marginTop={20}
                />
                <TextBase
                  color={'#fff'}
                  text={'Años exp.'}
                  fontFamily={'AirbnbCereal_W_Bk'}
                  size={14}
                  marginTop={10}
                />
              </VStack>
              <Divider
                orientation="vertical"
                backgroundColor="#3A3A3C"
                marginHorizontal={10}
              />
              <VStack flex={1} justifyContent="center" alignItems="center">
                <TextBase
                  color={'#fff'}
                  text={`${specialtiesCount}`}
                  fontFamily={'AirbnbCereal_W_Bd'}
                  size={20}
                  marginTop={20}
                />
                <TextBase
                  color={'#fff'}
                  text={'Especialidades'}
                  fontFamily={'AirbnbCereal_W_Bk'}
                  size={14}
                  marginTop={10}
                />
              </VStack>
              <Divider
                orientation="vertical"
                backgroundColor="#3A3A3C"
                marginHorizontal={10}
              />
              <VStack flex={1} justifyContent="center" alignItems="center">
                <TextBase
                  color={'#fff'}
                  text={`${reviewsCount}`}
                  fontFamily={'AirbnbCereal_W_Bd'}
                  size={20}
                  marginTop={20}
                />
                <TextBase
                  color={'#fff'}
                  text={'Reseñas'}
                  fontFamily={'AirbnbCereal_W_Bk'}
                  size={14}
                  marginTop={10}
                />
              </VStack>
            </HStack>
          )}

          {data?.gymName && (
            <View style={style.gymCard}>
              <View style={style.gymIconWrapper}>
                <FontAwesomeIcon
                  icon={faDumbbell}
                  size={18}
                  color={theme.primary}
                />
              </View>
              <View style={{flex: 1}}>
                <TextBase
                  color={'#fff'}
                  text={data.gymName}
                  fontFamily={'AirbnbCereal_W_Bd'}
                  size={16}
                />
                {data?.gymAddress && (
                  <TextBase
                    color={COLORS.dark.textMuted}
                    text={data.gymAddress}
                    fontFamily={'AirbnbCereal_W_Bk'}
                    size={13}
                    lines={2}
                    style={{marginTop: 2}}
                  />
                )}
              </View>
            </View>
          )}

          {hasCompletedProfile ? (
            <View style={{marginTop: 12}}>
              <Tabs value="tab1">
                <TabList>
                  <TabItem value="tab1" label="Sobre mí" />
                  <TabItem value="tab2" label="Calificaciones" />
                </TabList>
                <Tabs.TabPanels>
                  <Tabs.TabPanel value="tab1">
                    <View style={{paddingHorizontal: 20}}>
                      <FieldContainer>
                        <FieldName text={'Especialidades'} />
                        <FieldValue
                          text={
                            onboardingTrainer?.specialties
                              ?.join(', ')
                              ?.replace(/_/g, ' ') || 'Sin especialidades'
                          }
                        />
                      </FieldContainer>
                      {onboardingTrainer?.mobileNumber && (
                        <FieldContainer>
                          <FieldName text={'Teléfono'} />
                          <FieldValue text={onboardingTrainer.mobileNumber} />
                        </FieldContainer>
                      )}
                    </View>
                  </Tabs.TabPanel>
                  <Tabs.TabPanel value="tab2">{ratingsSection}</Tabs.TabPanel>
                </Tabs.TabPanels>
              </Tabs>
            </View>
          ) : (
            <View style={{marginTop: 20}}>
              <View style={{marginHorizontal: 20, marginBottom: 12}}>
                <TextBase
                  fontFamily={'AirbnbCereal_W_Bk'}
                  text={'Este entrenador todavía no completó su perfil.'}
                  color={COLORS.dark.textMuted}
                />
              </View>
              {ratingsSection}
            </View>
          )}
        </VStack>

        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={40}
          justifyContent="center"
          alignItems="center"
          marginHorizontal={'auto'}>
          {isChampAccepted === undefined && (
            <ButtonGradient
              text={'Conectar'}
              isLoading={isPendingConnect}
              onPress={onPressConnect}
            />
          )}
          {isChampAccepted === false && (
            <TouchableOpacity
              onPress={() => setShowDismissPopUp(true)}
              activeOpacity={0.7}>
              <TextBase
                text={'Cancelar solicitud'}
                size={16}
                fontFamily={'AirbnbCereal_W_Md'}
                color={'#FF453A'}
              />
            </TouchableOpacity>
          )}
          {isChampAccepted && (
            <>
              {canRate && (
                <ButtonGradient
                  onPress={() =>
                    navigation.navigate('TrainerFeedbackForm', {
                      trainerId: route.params.trainer_id,
                    })
                  }
                  text={'Calificar Entrenador'}
                  style={{marginBottom: 12}}
                />
              )}
              <TouchableOpacity
                onPress={() => setShowUnlinkPopUp(true)}
                activeOpacity={0.7}>
                <TextBase
                  text={'Desconectar'}
                  size={16}
                  fontFamily={'AirbnbCereal_W_Md'}
                  color={'#FF453A'}
                />
              </TouchableOpacity>
            </>
          )}
        </Box>

        {showUnlinkPopUp && (
          <ConfirmationPopUp
            title={'¿Deseas desconectarte de este entrenador?'}
            subtitle={'Se eliminará la relación con tu entrenador actual.'}
            confirmText={'Desconectar'}
            onConfirm={onPressUnlink}
            onCancel={() => setShowUnlinkPopUp(false)}
            isLoading={isPendingUnlink}
          />
        )}
        {showDismissPopUp && (
          <ConfirmationPopUp
            title={'¿Cancelar solicitud de conexión?'}
            subtitle={'Se eliminará la solicitud enviada a este entrenador.'}
            confirmText={'Cancelar solicitud'}
            onConfirm={onPressDismiss}
            onCancel={() => setShowDismissPopUp(false)}
            isLoading={isPendingDismiss}
          />
        )}
      </View>

      <Modal
        visible={isPhotoOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsPhotoOpen(false)}>
        <View style={style.fullscreenPhotoBackdrop}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[style.buttonBackContainer, {top: insets.top + 10}]}
            onPress={() => setIsPhotoOpen(false)}>
            <FontAwesomeIcon icon={faXmark} size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={style.fullscreenPhotoTouchable}
            onPress={() => setIsPhotoOpen(false)}>
            <Image
              alt="image-trainer-fullscreen"
              source={photoSource}
              resizeMode="contain"
              style={style.fullscreenPhoto}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  itemPress: {
    backgroundColor: COLORS.dark.textPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 100,
    marginLeft: 'auto',
  },
  buttonBackContainer: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#3A3A3C',
    padding: 5,
    top: 50,
    left: 30,
    borderRadius: 100,
  },
  gymCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 20,
    backgroundColor: COLORS.dark.backgroundInput,
    borderRadius: 16,
    padding: 16,
  },
  gymIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.dark.backgroundElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fullscreenPhotoBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  fullscreenPhotoTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenPhoto: {
    width: '100%',
    height: '100%',
  },
});
