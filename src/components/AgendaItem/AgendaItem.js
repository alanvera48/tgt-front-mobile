import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import TextBase from '../Base/TextBase';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendar,
  faClockRotateLeft,
  faFire,
  faNoteSticky,
} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../style/style';

const AgendaItem = props => {
  const {item} = props;
  const navigation = useNavigation();

  // Si el item está vacío, no renderizamos nada
  if (!item.title) {
    return null;
  }

  const handlePress = () => {
    navigation.navigate('RutineDetail', {
      id: item.originalItem.routineId,
    });
  };

  // Formatear calorías quemadas para mostrar "n calorías"
  const formattedCalories = item.caloriesBurned
    ? `${item.caloriesBurned} calorías`
    : 'No disponible';

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.headerContainer}>
        <TextBase
          text={item.title}
          fontFamily="AirbnbCereal_W_Bd"
          size={16}
          color={'#fff'}
        />
        <View style={styles.timeContainer}>
          <FontAwesomeIcon icon={faClockRotateLeft} color="#FF6B00" size={14} />
          <TextBase
            text={item.hour}
            fontFamily="AirbnbCereal_W_Md"
            size={14}
            color={'#7d7d7d'}
            style={{marginLeft: 5}}
          />
          {item.duration && (
            <TextBase
              text={` • ${item.duration}`}
              fontFamily="AirbnbCereal_W_Md"
              size={14}
              color={'#7d7d7d'}
            />
          )}
        </View>
      </View>

      <View style={styles.detailsContainer}>
        {/* Calorías quemadas */}
        <View style={styles.detailItem}>
          <FontAwesomeIcon icon={faFire} color="#FF6B00" size={14} />
          <TextBase
            text={formattedCalories}
            fontFamily="AirbnbCereal_W_Md"
            size={14}
            color={'#7d7d7d'}
            style={{marginLeft: 8}}
          />
        </View>

        {/* Notas */}
        {item.notes && (
          <View style={styles.notesContainer}>
            <View style={styles.detailItem}>
              <FontAwesomeIcon icon={faNoteSticky} color="#FF6B00" size={14} />
              <TextBase
                text="Notas"
                fontFamily="AirbnbCereal_W_Md"
                size={14}
                color={'#7d7d7d'}
                style={{marginLeft: 8}}
              />
            </View>
            <TextBase
              text={item.notes}
              fontFamily="AirbnbCereal_W_Md"
              size={13}
              color={'#fff'}
              style={styles.notesText}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark.backgroundLight,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    marginTop: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  notesContainer: {
    marginTop: 10,
  },
  notesText: {
    marginTop: 5,
    marginLeft: 22,
    fontStyle: 'italic',
  },
});

export default AgendaItem;
