import React from 'react';
import {Box} from '@gluestack-ui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function DropDownIcon({icon, backgroundColor, color}) {
  return (
    <Box
      backgroundColor={backgroundColor}
      borderRadius={50}
      padding={5}
      justifyContent="center"
      alignItems="center">
      <FontAwesomeIcon icon={icon} color={color ? color : '#fff'} size={20} />
    </Box>
  );
}
