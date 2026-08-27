import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useAuthStore} from '../../store/authStore';
import TextBase from '../../components/Base/TextBase';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faLocationDot,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {COLORS} from '../../style/style';
import {
  useGetCurrentLocation,
  useGetNearbyPlaces,
  usePostTrainersGym,
} from '../../hooks/gym/queries';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import Toast from 'react-native-toast-message';
import InputSearch from '../../components/Input/InputSearch';

const {width, height} = Dimensions.get('window');
const {dark: theme} = COLORS;

export default function UserGym({navigation}) {
  const userInfo = useAuthStore(state => state.userInfo);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGyms, setSelectedGyms] = useState(userInfo?.userGyms || []);
  const [showMap, setShowMap] = useState(false);

  const {
    data: location,
    isLoading: isLoadingLocation,
    error: locationError,
  } = useGetCurrentLocation();

  const {data: nearbyPlaces, isLoading: isLoadingPlaces} = useGetNearbyPlaces(
    location?.latitude,
    location?.longitude,
  );

  const createTrainerGymMutation = usePostTrainersGym();

  const handleSearch = text => {
    setSearchQuery(text);
  };

  const handleToggleMap = () => {
    setShowMap(!showMap);
  };

  const handleSelectGym = gym => {
    const isAlreadySelected = selectedGyms.some(
      selected => selected.gymPlaceId === gym.place_id,
    );

    if (isAlreadySelected) {
      setSelectedGyms(
        selectedGyms.filter(selected => selected.gymPlaceId !== gym.place_id),
      );
    } else if (selectedGyms.length < 5) {
      setSelectedGyms([
        ...selectedGyms,
        {
          gymPlaceId: gym.place_id,
          gymName: gym.name,
          gymAddress: gym.formatted_address,
          gymLatitude: gym.geometry.location.lat,
          gymLongitude: gym.geometry.location.lng,
        },
      ]);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Máximo 5 gimnasios',
        text2: 'No puedes seleccionar más de 5 gimnasios',
      });
    }
  };

  const handleUnselectGym = (gym, section) => {
    if (section === 'top') {
      // Si lo deselecciono de la lista de mis gimnasios (gymPlaceId)
      setSelectedGyms(
        selectedGyms.filter(selected => selected.gymPlaceId !== gym.gymPlaceId),
      );
    } else {
      // Si lo deselecciono de la lista de gimnasios cercanos (place_id)
      setSelectedGyms(
        selectedGyms.filter(selected => selected.gymPlaceId !== gym.place_id),
      );
    }
  };

  const handleSaveGyms = async () => {
    try {
      createTrainerGymMutation.mutateAsync(selectedGyms, {
        onSuccess: response => {
          console.log(response, 'response');
          Toast.show({
            type: 'success',
            text1: 'Gimnasios actualizados',
            text2: 'Los gimnasios han sido actualizados correctamente',
          });
          navigation.goBack();
        },
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.message || 'Algo salió mal',
      });
    }
  };

  const isGymSelected = placeId => {
    return selectedGyms.some(gym => gym.gymPlaceId === placeId);
  };

  if (isLoadingLocation || isLoadingPlaces) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (locationError) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <TextBase
          text="Por favor activa la ubicación para ver los gimnasios cercanos"
          color="#fff"
          size={16}
          fontFamily={'AirbnbCereal_W_Md'}
          style={{textAlign: 'center', paddingHorizontal: 20}}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <FontAwesomeIcon icon={faChevronLeft} size={24} color="#fff" />
        </TouchableOpacity>
        <TextBase
          text="Mis Gimnasios"
          color="#fff"
          size={20}
          fontFamily={'AirbnbCereal_W_Md'}
        />
        <TouchableOpacity onPress={handleToggleMap}>
          <TextBase
            text={showMap ? 'Lista' : 'Mapa'}
            color={COLORS.dark.primary}
            size={16}
            fontFamily={'AirbnbCereal_W_Md'}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {/* <View style={styles.searchWrapper}>
          <FontAwesomeIcon
            icon={faSearch}
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <InputCustom
            placeholder="Buscar gimnasio"
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.searchInput}
            placeholderTextColor="#666"
          />
        </View> */}
        <InputSearch
          placeholder={'Buscar gimnasio'}
          value={searchQuery}
          setValue={handleSearch}
        />
      </View>

      {showMap ? (
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location?.latitude || -34.603722,
              longitude: location?.longitude || -58.381592,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={mapStyle}>
            {selectedGyms.map(gym => (
              <Marker
                key={gym.id}
                coordinate={{
                  latitude: parseFloat(gym.gymLatitude),
                  longitude: parseFloat(gym.gymLongitude),
                }}
                title={gym.gymName}
                description={gym.gymAddress}>
                <View style={styles.customMarker}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size={30}
                    color={COLORS.dark.primary}
                  />
                </View>
              </Marker>
            ))}
          </MapView>
        </View>
      ) : null}

      <ScrollView style={styles.contentContainer}>
        {/* Mis Gimnasios Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextBase
              text="Mis Gimnasios"
              color="#fff"
              size={18}
              fontFamily={'AirbnbCereal_W_Bd'}
            />
            <TextBase
              text={`${selectedGyms.length}/5`}
              color="#666"
              size={14}
              fontFamily={'AirbnbCereal_W_Md'}
            />
          </View>
          {selectedGyms.map(gym => (
            <TouchableOpacity
              key={gym.id}
              style={styles.gymCard}
              onPress={() => handleUnselectGym(gym, 'top')}>
              <View style={styles.gymInfo}>
                <TextBase
                  text={gym.gymName}
                  color="#fff"
                  size={16}
                  fontFamily={'AirbnbCereal_W_Md'}
                />
                <TextBase
                  text={gym.gymAddress}
                  color="#666"
                  size={14}
                  fontFamily={'AirbnbCereal_W_Bk'}
                />
              </View>
              <View style={styles.selectedBadge}>
                <FontAwesomeIcon icon={faCheck} size={12} color="#fff" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Gimnasios Cercanos Section */}
        <View style={styles.section}>
          <TextBase
            text="Gimnasios Cercanos"
            color="#fff"
            size={18}
            fontFamily={'AirbnbCereal_W_Bd'}
            style={styles.sectionTitle}
          />
          {nearbyPlaces
            ?.filter(
              place =>
                place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                place.formatted_address
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            )
            .map(place => (
              <TouchableOpacity
                key={place.place_id}
                style={[
                  styles.gymCard,
                  isGymSelected(place.place_id) && styles.gymCardSelected,
                ]}
                onPress={() => {
                  if (isGymSelected(place.place_id)) {
                    console.log('unselect');
                    handleUnselectGym(place, 'bottom');
                  } else {
                    handleSelectGym(place);
                  }
                }}>
                <View style={styles.gymInfo}>
                  <TextBase
                    text={place.name}
                    color="#fff"
                    size={16}
                    fontFamily={'AirbnbCereal_W_Md'}
                  />
                  <TextBase
                    text={place.formatted_address}
                    color="#666"
                    size={14}
                    fontFamily={'AirbnbCereal_W_Bk'}
                  />
                </View>
                {isGymSelected(place.place_id) && (
                  <View style={styles.selectedBadge}>
                    <FontAwesomeIcon icon={faCheck} size={12} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <ButtonGradient
          text="Guardar Cambios"
          onPress={handleSaveGyms}
          isLoading={createTrainerGymMutation.isPending}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  searchContainer: {
    // paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'blue',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'red',
  },
  mapContainer: {
    height: height * 0.25,
    width: width,
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  customMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  gymCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  gymCardSelected: {
    borderColor: COLORS.dark.primary,
    borderWidth: 1,
  },
  gymInfo: {
    flex: 1,
  },
  selectedBadge: {
    backgroundColor: COLORS.dark.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.backgroundCard,
  },
});

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8ec3b9',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1a3646',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#64779e',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#334e87',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6f9ba5',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3C7680',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#304a7d',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2c6675',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#255763',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#b0d5ce',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3a4762',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0e1626',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#4e6d70',
      },
    ],
  },
];
