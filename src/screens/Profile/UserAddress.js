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
import InputCustom from '../../components/Input/Input';
import {Controller, useForm} from 'react-hook-form';
import {useUpdateProfile} from '../../hooks/user/queries';
import Toast from 'react-native-toast-message';
import {DropdownInput} from '../../components/DropdownInput/DropdownInput';
import {PROVINCES_OPTIONS} from '../../constants/inputs-options';
import {useAuthStore} from '../../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import {COLORS} from '../../style/style';

export default function UserAddress({navigation}) {
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
      [`${onboardingString}`]: {
        province: 'Buenos Aires' || '',
        city: onboardingData?.city || '',
        zipCode: onboardingData?.zipCode || '',
        address: onboardingData?.address || '',
        apartment: onboardingData?.apartment || '',
      },
    },
  });

  const onSubmit = async data => {
    try {
      const result = await updateProfileAsync(data);
      updateUserState(result);
      setIsEditing(false);
      Toast.show({
        type: 'success',
        text1: 'Dirección actualizada',
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} size={24} color="#fff" />
        </TouchableOpacity>
        <TextBase
          text="Mi Dirección"
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
        {isEditing ? (
          <View>
            <Controller
              control={control}
              name={`${onboardingString}.province`}
              rules={{required: 'Este campo es requerido'}}
              render={({field: {onChange, value}}) => (
                <DropdownInput
                  labelText="Provincia"
                  items={PROVINCES_OPTIONS}
                  value={value}
                  onValueChange={onChange}
                  error={errors?.[onboardingString]?.province?.message}
                />
              )}
            />

            <Controller
              control={control}
              name={`${onboardingString}.city`}
              rules={{required: 'Este campo es requerido'}}
              render={({field: {onChange, value}}) => (
                <InputCustom
                  label="Ciudad"
                  value={value}
                  onChangeText={onChange}
                  error={errors?.[onboardingString]?.city?.message}
                  placeholder="La Plata"
                />
              )}
            />

            <Controller
              control={control}
              name={`${onboardingString}.zipCode`}
              rules={{required: 'Este campo es requerido'}}
              render={({field: {onChange, value}}) => (
                <InputCustom
                  label="Código Postal"
                  value={value}
                  onChangeText={onChange}
                  error={errors?.[onboardingString]?.zipCode?.message}
                  keyboardType="numeric"
                  placeholder="3452"
                />
              )}
            />

            <Controller
              control={control}
              name={`${onboardingString}.address`}
              rules={{required: 'Este campo es requerido'}}
              render={({field: {onChange, value}}) => (
                <InputCustom
                  label="Dirección"
                  value={value}
                  onChangeText={onChange}
                  error={errors?.[onboardingString]?.address?.message}
                  placeholder="Juan B Justo 1234"
                />
              )}
            />

            <Controller
              control={control}
              name={`${onboardingString}.apartment`}
              render={({field: {onChange, value}}) => (
                <InputCustom
                  label="Apartamento (opcional)"
                  value={value}
                  onChangeText={onChange}
                  error={errors?.[onboardingString]?.apartment?.message}
                  placeholder="tu-email@mail.com"
                />
              )}
            />
          </View>
        ) : (
          <View>
            <InfoItem label="Provincia" value={onboardingData?.province} />
            <InfoItem label="Ciudad" value={onboardingData?.city} />
            <InfoItem label="Código Postal" value={onboardingData?.zipCode} />
            <InfoItem label="Dirección" value={onboardingData?.address} />
            <InfoItem label="Apartamento" value={onboardingData?.apartment} />
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
  infoItem: {
    marginBottom: 16,
  },
});
