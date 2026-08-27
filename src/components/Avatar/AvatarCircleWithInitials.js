import React from 'react';
import {Avatar, AvatarFallbackText} from '@gluestack-ui/themed';

export default function AvatarCircleWithInitials({fullName}) {
  return (
    <Avatar>
      <AvatarFallbackText>{fullName}</AvatarFallbackText>
    </Avatar>
  );
}
