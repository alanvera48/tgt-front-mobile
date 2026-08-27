import {View, Text} from 'react-native';
import React from 'react';
import {Avatar, AvatarFallbackText, AvatarGroup} from '@gluestack-ui/themed';

export default function AvatarGroupPeople({extraAvatars, remainingCount}) {
  return (
    <AvatarGroup>
      {extraAvatars.map((avatar, index) => {
        return (
          <Avatar
            key={index}
            size="sm"
            borderColor="$white"
            borderWidth="$2"
            bg={avatar.color}
            $dark-borderColor="$black">
            <AvatarFallbackText>{avatar.alt}</AvatarFallbackText>
          </Avatar>
        );
      })}
      {remainingCount && (
        <Avatar
          size="sm"
          borderColor="$white"
          borderWidth="$2"
          bg="green"
          $dark-borderColor="$black">
          <AvatarFallbackText>{'+ ' + remainingCount + ''}</AvatarFallbackText>
        </Avatar>
      )}
    </AvatarGroup>
  );
}
