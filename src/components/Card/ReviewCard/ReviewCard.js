import React from 'react';
import {formatInTimeZone} from 'date-fns-tz';
import TextBase from '../../Base/TextBase';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  VStack,
} from '@gluestack-ui/themed';
import {DEVICE_WIDTH} from '../../../constants';
import {COLORS} from '../../../style/style';
import {getDifferenceInTime} from '../../../utils/time';

const {dark: theme} = COLORS;

export default function ReviewCard({item, index}) {
  // Convertir la fecha a zona horaria de Buenos Aires
  const getArgentinaTime = dateString => {
    // Convertir a objeto Date si es string
    const dateObj =
      typeof dateString === 'string' ? new Date(dateString) : dateString;

    // Convertir a zona horaria de Argentina
    const argentinaTime = formatInTimeZone(
      dateObj,
      'America/Argentina/Buenos_Aires', // A mi me funciona con este parametro 'America/Argentina/Buenos_Aires'
      'yyyy-MM-dd HH:mm:ssXXX',
    );

    return argentinaTime;
  };

  return (
    <VStack
      marginHorizontal={5}
      backgroundColor={COLORS.dark.backgroundInput}
      paddingVertical={24}
      width={DEVICE_WIDTH - 40}
      paddingHorizontal={20}
      borderRadius={16}>
      <HStack alignItems="center" jus>
        {item?.user?.imageUrl ? (
          <Avatar size="md">
            <AvatarFallbackText>
              {`${item?.user?.firstName} ${item?.user?.lastName}`}
            </AvatarFallbackText>
            <AvatarImage
              size="lg"
              alt="image-avatar"
              source={{
                uri: item?.user?.imageUrl,
              }}
            />
          </Avatar>
        ) : (
          <Avatar>
            <AvatarFallbackText>
              {`${item?.user?.firstName} ${item?.user?.lastName}`}
            </AvatarFallbackText>
          </Avatar>
        )}
        <TextBase
          fontFamily={'AirbnbCereal_W_Bd'}
          size={16}
          lines={2}
          style={{
            width: 150,
            marginLeft: 12,
            textTransform: 'capitalize',
          }}
          color={'#fff'}
          text={`${item?.user?.firstName} ${item?.user?.lastName}`}
        />
        <HStack
          backgroundColor={theme.primary}
          borderRadius={10}
          paddingHorizontal={10}
          paddingVertical={2}
          marginLeft={'auto'}>
          <TextBase
            fontFamily={'AirbnbCereal_W_Bd'}
            size={16}
            lines={2}
            color={'#fff'}
            text={`${item.rating}`}
          />
        </HStack>
      </HStack>

      <TextBase
        text={item.review}
        lines={4}
        color={'#fff'}
        style={{
          marginVertical: 10,
        }}
        fontFamily={'AirbnbCereal_W_Md'}
      />
      <TextBase
        text={getDifferenceInTime(getArgentinaTime(item.createdAt))}
        style={{
          marginLeft: 'auto',
        }}
        color={'#fff'}
      />
    </VStack>
  );
}
