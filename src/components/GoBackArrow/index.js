import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

export const GoBackArrow = ({style}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      activeOpacity={0.9}
      style={style}>
      <FontAwesomeIcon
        size={24}
        icon={faChevronLeft}
        style={{marginLeft: 30}}
        color="#fff"
      />
    </TouchableOpacity>
  );
};
