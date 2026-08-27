import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import InputSearch from '../../../components/Input/InputSearch';
import TextBase from '../../../components/Base/TextBase';
import {COLORS} from '../../../style/style';
import LinearGradient from 'react-native-linear-gradient';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Text, StyleSheet, Pressable} from 'react-native';
import {
  useGetCurrentLocation,
  useGetNearbyPlaces,
  usePostTrainersGym,
} from '../../../hooks/gym/queries';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import ButtonGradient from '../../../components/Buttons/ButtonGradient';

const {dark: theme} = COLORS;

const GradientTextCard = ({title, subtitle, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
          marginHorizontal: 15,
          marginBottom: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <TextBase
          text={title}
          fontFamily={'AirbnbCereal_W_Bd'}
          size={20}
          color={COLORS.dark.textWhite}
          style={{marginBottom: 10}}
        />
        <TextBase
          text={
            'Esto va a ayudarte a que tus alumnos puedan buscarte con más facilidad.'
          }
          fontFamily={subtitle}
          size={14}
          color={'#ffff'}
          lines={2}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const GrayTextCard = ({title, subtitle, color, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 15,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      onPress={onPress}>
      <TextBase
        text={title}
        fontFamily={'AirbnbCereal_W_Bd'}
        size={20}
        color={COLORS.dark.textWhite}
        style={{marginBottom: 10}}
      />
      <TextBase
        text={subtitle}
        // fontFamily={subtitle}
        size={14}
        color={'#ffff'}
        lines={2}
      />
    </TouchableOpacity>
  );
};

const MaxGymsText = () => {
  return (
    <TextBase
      text={'Máximo 5 gimnasios'}
      fontFamily={'AirbnbCereal_W_Bk'}
      size={12}
      color={COLORS.dark.primary}
      style={{marginLeft: 20, marginVertical: 10}}
    />
  );
};

export default function SelectGym({navigation}) {
  const [selectedGym, setSelectedGym] = useState([]);
  const [search, setSearch] = useState('');
  const createTrainerGymMutation = usePostTrainersGym();

  const {
    data: location,
    isLoading: isLoadingLocation,
    error: locationError,
    refetch: refetchLocation,
  } = useGetCurrentLocation();
  const {data: places, isLoading: isLoadingPlaces} = useGetNearbyPlaces(
    location?.latitude,
    location?.longitude,
  );

  const handleSubmit = () => {
    if (selectedGym.length > 4) return;

    const body = selectedGym.map(gym => ({
      gymPlaceId: gym.place_id,
      gymName: gym.name,
      gymAddress: gym.formatted_address,
      gymLatitude: gym.geometry.location.lat,
      gymLongitude: gym.geometry.location.lng,
    }));

    createTrainerGymMutation.mutateAsync(body, {
      onSuccess: response => {
        console.log(response, 'response');
        navigation.navigate('TrainerOnboarding', {
          screen: 'WelcomeTrainer',
        });
      },
      onError: error => {
        console.log(error, 'error');
      },
    });
  };

  if (isLoadingLocation || isLoadingPlaces) {
    return <LoadingScreen backgroundColor={theme.background} />;
  }

  // Si no activamos la ubicación en el dispositivo
  if (locationError) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#1C1C1E',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextBase
          text={
            'Activa la ubicación en la configuración de tu dispositivo para continuar'
          }
          fontFamily={'AirbnbCereal_W_Bd'}
          lines={3}
          size={24}
          color={COLORS.dark.textWhite}
          style={{marginHorizontal: 20, marginBottom: 50, textAlign: 'center'}}
        />
        <ButtonGradient
          text={'Buscar gimnasios cerca de tu ubicación'}
          isLoading={isLoadingPlaces}
          onPress={() => refetchLocation()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1C1C1E'}}>
      <ScrollView
        style={{
          paddingHorizontal: 10,
          paddingTop: 40,
        }}>
        <TextBase
          text={'Dónde entrenas?'}
          fontFamily={'AirbnbCereal_W_Bd'}
          size={24}
          color={COLORS.dark.textWhite}
          style={{marginHorizontal: 20, marginBottom: 10}}
        />
        <TextBase
          text={
            'Esto va a ayudarte a que tus alumnos puedan buscarte con más facilidad.'
          }
          fontFamily={'AirbnbCereal_W_Bk'}
          size={14}
          color={'#ffff'}
          lines={2}
          style={{marginHorizontal: 20, width: '80%', marginBottom: 10}}
        />
        <InputSearch
          placeholder={'Buscar gimnasio'}
          value={search}
          setValue={setSearch}
        />
        {selectedGym.length > 0 && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextBase
              text={'Seleccionados'}
              fontFamily={'AirbnbCereal_W_Bd'}
              size={20}
              color={COLORS.dark.textWhite}
              style={{marginLeft: 20, marginVertical: 10}}
            />
            <MaxGymsText />
          </View>
        )}
        {selectedGym.map((item, index) => (
          <GradientTextCard
            key={index}
            title={item.name}
            subtitle={item.formatted_address}
            onPress={() =>
              setSelectedGym(prevState => prevState.filter(gym => gym !== item))
            }
          />
        ))}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextBase
            text={
              search !== '' ? 'Resultados de búsqueda' : 'Gimnasios cerca tuyo'
            }
            fontFamily={'AirbnbCereal_W_Bd'}
            size={20}
            color={COLORS.dark.textWhite}
            style={{marginLeft: 20, marginVertical: 10}}
          />
          {search === '' && selectedGym.length === 0 && <MaxGymsText />}
        </View>

        <View style={{paddingBottom: 120}}>
          {places
            ?.filter(item => !selectedGym.includes(item))
            ?.filter(item =>
              item.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((item, index) => (
              <GrayTextCard
                key={index}
                title={item.name}
                subtitle={item.formatted_address}
                color={COLORS.dark.backgroundInput}
                onPress={() =>
                  selectedGym.length < 5 &&
                  setSelectedGym(prevState => [...prevState, item])
                }
              />
            ))}
        </View>

        {places
          ?.filter(item => !selectedGym.some(gym => gym.id === item.id))
          ?.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          ).length === 0 && (
          <TextBase
            text={'No se encontraron gimnasios'}
            fontFamily={'AirbnbCereal_W_Bk'}
            size={20}
            color={COLORS.dark.textWhite}
            style={{marginLeft: 20, marginVertical: 10}}
          />
        )}
      </ScrollView>

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
        opacity={1}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 100,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: 20,
        }}>
        {selectedGym.length > 0 && (
          <LinearGradient
            hitSlop={40}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[
              COLORS.dark.primaryLight,
              COLORS.dark.primary,
              COLORS.dark.primaryDark,
            ]}
            style={styles.buttonColor}>
            {createTrainerGymMutation.isPending ? (
              <ActivityIndicator color={'#FFF'} />
            ) : (
              <Pressable
                style={styles.buttonPress}
                onPress={handleSubmit}
                hitSlop={16}>
                <Text style={styles.text}>Finalizar</Text>
                <FontAwesomeIcon icon={faPlay} color={'#FFF'} size={25} />
              </Pressable>
            )}
          </LinearGradient>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#FFFF',
    textAlign: 'center',
    fontFamily: 'AirbnbCereal_W_Bd',
    fontSize: 19,
    marginRight: 16,
  },
  buttonPress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonColor: {
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 30,
    width: 200,
    maxWidth: 280,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
