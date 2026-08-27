import React, {useEffect, useState} from 'react';
import {Avatar, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import TextBase from '../../components/Base/TextBase';

import {
  useAuthenticateUser,
  useUpdateProfilePic,
} from '../../hooks/user/queries';
import {useAuthStore} from '../../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import {
  faCamera,
  faUser,
  faMessage,
  faLocationDot,
  faCog,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

import {COLORS} from '../../style/style';
import {DangerAlert} from '../../components/DangerAlert';

import Svg, {
  Path,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
} from 'react-native-svg';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';

const MenuItem = ({icon, text, count, onPress, disabled}) => (
  <TouchableOpacity
    style={[styles.menuItem, disabled && styles.menuItemDisabled]}
    onPress={onPress}
    activeOpacity={0.7}
    disabled={disabled}>
    <View style={[styles.menuIconContainer, disabled && styles.iconDisabled]}>
      <FontAwesomeIcon
        icon={icon}
        size={20}
        color={disabled ? '#666' : '#fff'}
      />
    </View>
    <View style={styles.menuTextContainer}>
      <TextBase
        text={text}
        color={disabled ? '#666' : '#fff'}
        size={16}
        fontFamily={'AirbnbCereal_W_Md'}
      />
    </View>
    <View style={styles.menuRightContainer}>
      {count && (
        <View
          style={[styles.countBadge, disabled && styles.countBadgeDisabled]}>
          <TextBase
            text={count.toString()}
            color={disabled ? '#666' : '#fff'}
            size={14}
            fontFamily={'AirbnbCereal_W_Md'}
          />
        </View>
      )}
      <FontAwesomeIcon icon={faChevronRight} size={16} color="#666" />
    </View>
  </TouchableOpacity>
);

export default function Profile({navigation}) {
  const [image, setImage] = useState(undefined);
  const {userInfo, updateUserState} = useAuthStore(
    useShallow(state => ({
      userInfo: state.userInfo,
      updateUserState: state.updateUserState,
    })),
  );

  const {data, isPending, refetch} = useAuthenticateUser();

  useEffect(() => {
    if (data?.data) {
      updateUserState(data.data);
    }
  }, [data?.data]);

  // TODO: Deuda técnica, este useEffect de abajo arregla el problema cuando nos registramos y completamos
  // el onboarding tanto sea champ o trainer, y venimos a esta pantalla, y no se muestran los datos
  // aunque se hayan agregado a la base, por alguna razon, desp de completar el onboarding, en GeneralTrainer para trainer,
  // y para champ en GeneralSecondPart, se debe hacer el invalidateQueries del hook useAuthenticateUser, pero por alguna razon no funciona.
  useEffect(() => {
    refetch({force: true});
  }, []);

  const {mutateAsync: updateProfilePicAsync} = useUpdateProfilePic();

  const handleFinishChampForm = () => {
    if (userInfo?.role === 'CHAMP') {
      navigation.navigate('OnboardingChamp');
    } else {
      navigation.navigate('TrainerOnboarding');
    }
  };

  const uploadImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(imageResult => {
      setImage(imageResult?.path);
      updateProfilePicAsync(imageResult, {
        onSuccess: () => {
          refetch(); // Forzar una nueva solicitud de datos
          Toast.show({
            type: 'success',
            text1: 'Foto actualizada',
            text2: 'La foto de perfil ha sido actualizada correctamente',
          });
        },
        onError: error => {
          console.log(error.message);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Algo salió mal, por favor intenta de nuevo',
          });
        },
      });
    });
    // .catch(error => {
    //   console.log(error.message);
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Error',
    //     text2: 'Algo salió mal, por favor intenta de nuevo',
    //   });
    // });
  };

  const capitalizeWord = word => {
    if (!word) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const fullName = `${capitalizeWord(userInfo?.firstName)} ${capitalizeWord(
    userInfo?.lastName,
  )}`;

  const role = userInfo?.role === 'CHAMP' ? 'Champ' : 'Personal Trainer';

  const handlePersonalInfo = () => {
    navigation.navigate('UserProfile');
  };

  const handleAddress = () => {
    navigation.navigate('UserAddress');
  };

  const handleGyms = () => {
    navigation.navigate('UserGym');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            // Aquí iría la lógica para eliminar la cuenta
            Toast.show({
              type: 'success',
              text1: 'Solicitud enviada',
              text2: 'Tu solicitud para eliminar la cuenta ha sido recibida',
            });
          },
        },
      ],
    );
  };

  if (isPending) {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: COLORS.dark.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={COLORS.dark.textPrimary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Wave Background */}
      <View style={styles.waveContainer}>
        <Svg
          height="250"
          width="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <Defs>
            <SvgGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={COLORS.dark.primaryLight} />
              <Stop offset="0.5" stopColor={COLORS.dark.primary} />
              <Stop offset="1" stopColor={COLORS.dark.primaryDark} />
            </SvgGradient>
          </Defs>
          <Path d="M0,0 L100,0 L100,75 Q50,100 0,75 Z" fill="url(#grad)" />
        </Svg>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            {userInfo?.imageUrl ? (
              <Avatar size="2xl" borderWidth={4} borderColor="white">
                <AvatarFallbackText>{fullName}</AvatarFallbackText>
                <AvatarImage
                  source={{uri: userInfo?.imageUrl}}
                  alt="avatar-profile"
                />
              </Avatar>
            ) : (
              <Avatar size="2xl" borderWidth={4} borderColor="white">
                <AvatarFallbackText>{fullName}</AvatarFallbackText>
              </Avatar>
            )}
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={uploadImageFromGallery}
              activeOpacity={0.9}>
              <FontAwesomeIcon icon={faCamera} size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {userInfo.role === 'CHAMP' ? (
            !userInfo.onboardingUser ? (
              <DangerAlert
                message={
                  'Todavia no terminaste las preguntas iniciales para conocerte mejor!'
                }
                onPress={handleFinishChampForm}
                onPressText={'Finalizar encuesta'}
              />
            ) : null
          ) : !userInfo.onboardingTrainer ? (
            <DangerAlert
              message={
                'Todavia no terminaste las preguntas iniciales para conocerte mejor!'
              }
              onPress={handleFinishChampForm}
              onPressText={'Finalizar encuesta'}
            />
          ) : null}
          <TextBase
            text={fullName}
            color="#fff"
            size={24}
            fontFamily={'AirbnbCereal_W_Bd'}
            style={styles.nameText}
          />
          <TextBase
            text={role}
            color="#ECECEC"
            size={16}
            fontFamily={'AirbnbCereal_W_Bd'}
            style={styles.roleText}
          />
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon={faUser}
            text="Información Personal"
            onPress={handlePersonalInfo}
          />
          <MenuItem
            icon={faLocationDot}
            text="Mi Dirección"
            onPress={handleAddress}
          />
          <MenuItem
            icon={faMessage}
            text="Mensajes"
            count={7}
            disabled={true}
          />
          {userInfo.role === 'TRAINER' ? (
            <MenuItem
              icon={faLocationDot}
              text="Mis Gimnasios"
              onPress={handleGyms}
            />
          ) : null}
          <MenuItem
            icon={faCog}
            text="Configuración"
            onPress={() => {}}
            disabled={true}
          />
        </View>
        <View style={styles.deleteAccountContainer}>
          {/* <TouchableOpacity
            style={styles.deleteAccountButton}
            onPress={handleDeleteAccount}
            activeOpacity={0.7}>
            <FontAwesomeIcon icon={faCircleXmark} size={20} color="#fff" />
            <TextBase
              text="Eliminar Cuenta"
              color="#fff"
              size={16}
              fontFamily={'AirbnbCereal_W_Bd'}
              style={styles.deleteAccountText}
            />
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 30,
  },
  avatarContainer: {
    marginBottom: 16,
    position: 'relative',
    zIndex: 2,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.dark.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.dark.background,
  },
  nameText: {
    marginTop: 12,
  },
  roleText: {
    marginTop: 4,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.backgroundCard,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.dark.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countBadge: {
    backgroundColor: COLORS.dark.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  iconDisabled: {
    backgroundColor: '#333',
  },
  countBadgeDisabled: {
    backgroundColor: '#333',
  },
  deleteAccountContainer: {
    marginVertical: 40,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  deleteAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dark.primaryDark,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  deleteAccountText: {
    marginLeft: 10,
  },
});
