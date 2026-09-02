import {View, StyleSheet, Platform, Pressable} from 'react-native';
import React from 'react';

import TextBase from '../Base/TextBase';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell, faHeart} from '@fortawesome/free-solid-svg-icons';

import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Badge,
  BadgeText,
  Box,
  VStack,
} from '@gluestack-ui/themed';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../store/authStore';
import {Image} from 'react-native-svg';
import {COLORS} from '../../style/style';

export default function TopBar() {
  const navigation = useNavigation();
  const userInfo = useAuthStore(state => state.userInfo);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.dark.background,
        paddingTop: Platform.OS === 'ios' ? 24 : 0,
      }}>
      <View style={styles.containerTopBar}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{
            flexDirection: 'row',
          }}>
          {userInfo?.imageUrl ? (
            <Avatar>
              <AvatarFallbackText>
                {`${userInfo?.firstName} ${userInfo?.lastName}`}
              </AvatarFallbackText>
              <AvatarImage
                alt="image-avatar"
                source={{
                  uri: userInfo?.imageUrl,
                }}
              />
            </Avatar>
          ) : (
            <Avatar>
              <AvatarFallbackText>
                {`${userInfo?.firstName} ${userInfo?.lastName}`}
              </AvatarFallbackText>
            </Avatar>
          )}
          <View
            style={{
              direction: 'column',
              justifyContent: 'center',
              marginLeft: 12,
            }}>
            <TextBase
              text="Buenos dias!"
              size={14}
              fontFamily="AirbnbCereal_W_Bk"
              color={COLORS.dark.textMuted}
            />
            <TextBase
              text={`${userInfo?.firstName} ${userInfo?.lastName}`}
              size={16}
              style={{textTransform: 'capitalize'}}
              fontFamily="AirbnbCereal_W_Bk"
              color="#FFFFFF"
            />
          </View>
        </Pressable>

        <Box alignItems="center" style={{marginLeft: 'auto', marginRight: 20}}>
          {/* <VStack>
            <Badge
              h={22}
              w={22}
              bg="$red600"
              borderRadius="$full"
              mb={-20}
              mr={-14}
              zIndex={1}
              variant="solid"
              alignSelf="flex-end">
              <BadgeText color="$white">2</BadgeText>
            </Badge>
            <FontAwesomeIcon icon={faBell} size={30} color={COLORS.dark.textMuted} />
          </VStack> */}
          {/* <Image
            alt="image-logo"
            source={require('../../assets/image/logo.png')}
            style={{width: 30, height: 30}}
          /> */}
        </Box>

        {/* <FontAwesomeIcon icon={faHeart} size={30} color={COLORS.dark.textMuted} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTopBar: {
    paddingVertical: 20,
    backgroundColor: COLORS.dark.background,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 50,
  },
  searchInput: {
    backgroundColor: '#505050',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 9,
    border: 'none',
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'AirbnbCereal_W_Bk',
    paddingVertical: 0,
    color: COLORS.dark.textMuted,
  },
});
