import React from 'react';
import {Image, View, TouchableOpacity, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../style/style';
import TextBase from '../Base/TextBase';
import {Avatar, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';

const {dark: theme} = COLORS;

export default function CardMyTrainer({
  title,
  trainerprofile,
  isChampAccepted,
  approvedAt,
}) {
  const navigation = useNavigation();

  const handleTrainerProfile = () => {
    navigation.navigate('TrainerInfo', {
      trainer_id: trainerprofile.id,
      isChampAccepted: isChampAccepted,
      approvedAt: approvedAt,
    });
  };

  // El entrenador puede estar registrado por su gimnasio sin haber
  // completado su propio onboarding: en ese caso onboardingTrainer viene
  // null y no hay especialidades ni teléfono todavía.
  const specialtiesText = trainerprofile.onboardingTrainer?.specialties
    ?.join(', ')
    ?.replace(/_/g, ' ');
  const mobileNumber = trainerprofile.onboardingTrainer?.mobileNumber;

  return (
    <TouchableOpacity onPress={handleTrainerProfile} activeOpacity={0.9}>
      <LinearGradient
        hitSlop={40}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[
          COLORS.dark.primaryLight,
          COLORS.dark.primary,
          COLORS.dark.primaryDark,
        ]}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          marginHorizontal: 20,
          marginTop: 20,
          padding: 15,
        }}>
        <View style={{flexDirection: 'row'}}>
          {trainerprofile.imageUrl ? (
            <Avatar size="md">
              <AvatarFallbackText>
                {`${trainerprofile.firstName} ${trainerprofile.lastName}`}
              </AvatarFallbackText>
              <AvatarImage
                alt="image-avatar"
                size="lg"
                source={{
                  uri: trainerprofile?.imageUrl,
                }}
              />
            </Avatar>
          ) : (
            <Avatar>
              <AvatarFallbackText>
                {`${trainerprofile.firstName} ${trainerprofile.lastName}`}
              </AvatarFallbackText>
            </Avatar>
          )}
          <View style={{justifyContent: 'center', marginLeft: 10}}>
            <TextBase
              text={`${trainerprofile.firstName} ${trainerprofile.lastName}`}
              fontFamily={'AirbnbCereal_W_Bd'}
              size={20}
              color={COLORS.dark.textWhite}
              style={{
                textTransform: 'capitalize',
              }}
            />
            {specialtiesText && (
              <TextBase
                text={specialtiesText}
                size={14}
                color={theme.textWhite}
                lines={2}
                style={{
                  maxWidth: 230,
                }}
              />
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{marginTop: 14, marginLeft: 8}}>
            {isChampAccepted ? (
              <TextBase
                text={'Ver Perfil'}
                size={16}
                color={'#ffff'}
                lines={2}
                fontFamily={'AirbnbCereal_W_Bd'}
              />
            ) : (
              <TextBase
                text={'Pendiente de aceptación'}
                size={16}
                color={'#ffff'}
                lines={2}
                fontFamily={'AirbnbCereal_W_Bd'}
              />
            )}
          </View>
          {mobileNumber && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                Linking.openURL(`whatsapp://send?text=&phone=${mobileNumber}`)
              }
              style={{
                backgroundColor: '#30D14F',
                width: 38,
                height: 38,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
              }}>
              <Image
                source={require('../../assets/image/whatsapp.png')}
                resizeMode="center"
                style={{width: 21, height: 21}}
                alt="whatsapp"
              />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
