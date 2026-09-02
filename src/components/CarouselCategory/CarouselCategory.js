import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLayerGroup} from '@fortawesome/free-solid-svg-icons';
import {HStack, ScrollView} from '@gluestack-ui/themed';
import TextBase from '../Base/TextBase';
import {RUTINE_TYPE} from '../../constants/rutineType';
import {COLORS} from '../../style/style';

export default function CarouselCategory({selectedType, onSelectType}) {
  return (
    <ScrollView
      horizontal
      marginVertical={10}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}>
      <HStack>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => onSelectType(null)}
            activeOpacity={0.8}
            style={[
              styles.categoryStyle,
              {backgroundColor: '#2A2A2E'},
              selectedType === null && styles.categorySelected,
            ]}>
            <FontAwesomeIcon icon={faLayerGroup} size={30} color={'#fff'} />
          </TouchableOpacity>
          <TextBase
            text="Todos"
            size={14}
            color={selectedType === null ? '#fff' : '#8E9094'}
            fontFamily="AirbnbCereal_W_Bd"
            style={styles.label}
          />
        </View>

        {RUTINE_TYPE.map(item => {
          const isSelected = selectedType === item.value;
          return (
            <View key={item.value} style={styles.cardContainer}>
              <TouchableOpacity
                onPress={() => onSelectType(item.value)}
                activeOpacity={0.8}
                style={[
                  styles.categoryStyle,
                  {backgroundColor: item.background},
                  isSelected && [
                    styles.categorySelected,
                    {borderColor: item.color},
                  ],
                ]}>
                <FontAwesomeIcon
                  icon={item.icon}
                  size={30}
                  color={item.color}
                />
              </TouchableOpacity>
              <TextBase
                text={item.label}
                size={14}
                color={isSelected ? '#fff' : '#8E9094'}
                fontFamily="AirbnbCereal_W_Bd"
                style={styles.label}
              />
            </View>
          );
        })}
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
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categorySelected: {
    borderColor: COLORS.dark.primary,
  },
  label: {
    textAlign: 'center',
    marginTop: 5,
  },
  cardContainer: {marginHorizontal: 5},
});
