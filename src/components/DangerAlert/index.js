import React from 'react';
import {Alert, AlertIcon, AlertText} from '@gluestack-ui/themed';
import {InfoIcon} from '@gluestack-ui/themed';
import {TouchableOpacity} from 'react-native';
import {Text} from '@gluestack-ui/themed';
import {COLORS} from '../../style/style';

export const DangerAlert = ({message, onPress, onPressText}) => {
  return (
    <Alert
      mx="$2.5"
      action="error"
      variant="solid"
      marginTop={20}
      marginBottom={40}
      bgColor="$red500"
      borderRadius={15}>
      <AlertIcon as={InfoIcon} mr="$3" color={COLORS.dark.textWhite} />
      <AlertText color={COLORS.dark.textWhite}>
        {message}
        {onPress && onPressText && (
          <TouchableOpacity onPress={onPress}>
            <Text
              color={COLORS.dark.textWhite}
              fontWeight="bold"
              underline
              alignItems="center">
              {onPressText}
            </Text>
          </TouchableOpacity>
        )}
      </AlertText>
    </Alert>
  );
};
