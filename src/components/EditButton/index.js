import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons';

export const EditButton = ({onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        backgroundColor: '#323337',
        padding: 10,
        borderRadius: 11,
        width: 40,
      }}>
      <FontAwesomeIcon icon={faPencil} color={'#8A8B8D'} size={20} />
    </TouchableOpacity>
  );
};
