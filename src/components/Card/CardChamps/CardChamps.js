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

export default function CardChamps({
  item,
  navigateToScreen,
  viewType = 'grid',
}) {
  if (viewType === 'list') {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.touchableContainerList}
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

          <View style={styles.containerTextList}>
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

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.touchableContainer}
      onPress={() => navigateToScreen()}>
      {!item.enabled && <ChipDate enabled={item.enabled} />}
      {item.user.imageUrl ? (
        <Avatar size="lg">
          <AvatarImage
            alt="image-avatar"
            size="lg"
            source={{
              uri: item.user.imageUrl,
            }}
          />
        </Avatar>
      ) : (
        <Avatar size="lg">
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
            maxWidth: 120,
            textAlign: 'center',
          }}
        />
        <TextBase
          text={item?.user?.onboardingUser?.city}
          size={14}
          color={COLORS.dark.textMuted}
          fontFamily="AirbnbCereal_W_Bk"
          style={{marginTop: 6, textTransform: 'capitalize'}}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    height: 177,
    position: 'relative',
    backgroundColor: COLORS.dark.backgroundCard,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 20,
    paddingVertical: 12,
    width: 147,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  containerText: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  touchableContainerList: {
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
  containerTextList: {
    marginLeft: 16,
    flex: 1,
  },
  listContent: {
    width: '100%',
  },
});
