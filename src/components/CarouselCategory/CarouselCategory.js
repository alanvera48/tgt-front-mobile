import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faDumbbell,
  faEllipsisVertical,
  faHeartPulse,
  faPersonRunning,
} from '@fortawesome/free-solid-svg-icons';
import {HStack, ScrollView} from '@gluestack-ui/themed';
import TextBase from '../Base/TextBase';
import {comingSoonToast} from '../../utils/comingSoonToast';

export default function CarouselCategory({dataRutineType}) {
  return (
    <ScrollView
      horizontal
      marginVertical={10}
      contentContainerStyle={{
        justifyContent: 'center',
        flex: 1,
      }}>
      <HStack justifyContent="space-between" paddingHorizontal={10}>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              comingSoonToast();
            }}
            activeOpacity={0.8}
            style={[styles.categoryStyle, {backgroundColor: '#4E2A25'}]}>
            <FontAwesomeIcon icon={faHeartPulse} size={35} color="#ED6455" />
          </TouchableOpacity>
          <TextBase
            text="Cardio"
            size={14}
            color="#8E9094"
            fontFamily="AirbnbCereal_W_Bd"
            style={styles.label}
          />
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              comingSoonToast();
            }}
            activeOpacity={0.8}
            style={[styles.categoryStyle, {backgroundColor: '#36294E'}]}>
            <FontAwesomeIcon icon={faDumbbell} size={35} color="#9B65FC" />
          </TouchableOpacity>
          <TextBase
            text="Gym"
            size={14}
            color="#8E9094"
            fontFamily="AirbnbCereal_W_Bd"
            style={styles.label}
          />
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              comingSoonToast();
            }}
            activeOpacity={0.8}
            style={[styles.categoryStyle, {backgroundColor: '#164546'}]}>
            <FontAwesomeIcon icon={faPersonRunning} size={35} color="#20D6D1" />
          </TouchableOpacity>
          <TextBase
            text="Running"
            size={14}
            color="#8E9094"
            fontFamily="AirbnbCereal_W_Bd"
            style={styles.label}
          />
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              comingSoonToast();
            }}
            activeOpacity={0.8}
            style={[styles.categoryStyle, {backgroundColor: '#132E48'}]}>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              size={35}
              color="#167CE3"
            />
          </TouchableOpacity>
          <TextBase
            text="More"
            size={14}
            color="#8E9094"
            fontFamily="AirbnbCereal_W_Bd"
            style={styles.label}
          />
        </View>
      </HStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryStyle: {
    width: 68,
    height: 68,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    marginTop: 5,
  },
  cardContainer: {marginHorizontal: 5},
});
