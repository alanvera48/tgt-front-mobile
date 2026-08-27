import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import TextBase from '../../Base/TextBase';
import ChipDate from '../../Base/ChipDate';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
} from '@gluestack-ui/themed';
import {COLORS} from '../../../style/style';

export default function CardChampsList({item, navigateToScreen}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.touchableContainer}
      onPress={() => navigateToScreen()}>
      {!item.enabled && <ChipDate enabled={item.enabled} />}
      <HStack alignItems="center" space="md" style={styles.listContent}>
        {item.user.imageUrl ? (
          <Avatar size="md">
            <AvatarImage
              alt="image-avatar"
              size="md"
              source={{
                uri: item.user.imageUrl,
              }}
            />
          </Avatar>
        ) : (
          <Avatar size="md">
            <AvatarFallbackText>
              {`${item.user.firstName} ${item.user.lastName}`}
            </AvatarFallbackText>
          </Avatar>
        )}

        <View style={styles.containerText}>
          <TextBase
            text={`${item.user.firstName} ${item.user.lastName}`}
            lines={3}
            size={16}
            color={'#FFFFFF'}
            fontFamily="AirbnbCereal_W_Bd"
            style={{
              maxWidth: '100%',
              textAlign: 'left',
            }}
          />
          <TextBase
            text={item?.user?.onboardingUser?.city}
            size={14}
            color={COLORS.dark.textMuted}
            fontFamily="AirbnbCereal_W_Bk"
            style={{marginTop: 6}}
          />
        </View>
      </HStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    height: 80,
    width: '100%',
    position: 'relative',
    backgroundColor: COLORS.dark.backgroundCard,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerText: {
    marginLeft: 16,
    flex: 1,
  },
  listContent: {
    width: '100%',
  },
});
