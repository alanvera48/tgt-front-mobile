import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Avatar, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import TextBase from '../Base/TextBase';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCog,
  faCreditCard,
  faQuestionCircle,
  faShieldAlt,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {useAuthStore} from '../../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {COLORS} from '../../style/style';

const CustomDrawer = props => {
  const {userInfo, logOut} = useAuthStore(
    useShallow(state => ({
      userInfo: state.userInfo,
      logOut: state.logOut,
    })),
  );
  const isTrainer = userInfo?.role === 'TRAINER';

  const NAVIGATION_OPTIONS = [
    {label: 'Perfil', icon: faUser, route: 'Profile', disabled: false},
    {label: 'Configuración', icon: faCog, route: 'Settings', disabled: true},
    ...(isTrainer
      ? [
          {
            label: 'Suscripción',
            icon: faCreditCard,
            route: 'Subscriptions',
            disabled: false,
          },
        ]
      : []), // agrega la opción si es trainer
    {
      label: 'Privacidad y términos',
      icon: faShieldAlt,
      route: 'TermsAndConditions',
      disabled: false,
    },
    {label: 'Ayuda', icon: faQuestionCircle, route: 'Help', disabled: false},
  ];

  const onSignOut = () => {
    logOut();
    navigation.navigate('LoginScreen');
  };

  const navigation = useNavigation();

  const handleNavigate = route => {
    navigation.navigate(route);
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.dark.background,
        paddingTop: 60,
        paddingBottom: 40,
      }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: COLORS.dark.background}}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
          style={{paddingHorizontal: 20}}>
          {userInfo?.imageUrl ? (
            <Avatar>
              <AvatarFallbackText>
                {`${userInfo?.firstName} ${userInfo?.lastName}`}
              </AvatarFallbackText>
              <AvatarImage
                alt="avatar"
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
        </Pressable>

        <View style={styles.optionsContainer}>
          {NAVIGATION_OPTIONS.map((item, index) => {
            return (
              <Pressable
                key={item.label}
                style={styles.link}
                onPress={() => {
                  handleNavigate(item.route);
                }}
                disabled={item.disabled}>
                <FontAwesomeIcon
                  icon={item.icon}
                  size={22}
                  color={item.disabled ? '#5f5f5f' : '#fff'}
                  style={{marginRight: 14}}
                />
                <TextBase
                  text={item.label}
                  size={16}
                  color={item.disabled ? '#5f5f5f' : COLORS.dark.textWhite}
                  fontFamily="AirbnbCereal_W_Bd"
                />
              </Pressable>
            );
          })}
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomContentContainer}>
        <TouchableOpacity onPress={onSignOut} style={styles.signOutBtn}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon icon={faSignOut} size={22} color={'#fff'} />
            <TextBase
              text={'Cerrar sesión'}
              fontFamily="AirbnbCereal_W_Bk"
              color={'#fff'}
              fontSize={15}
              style={{
                marginLeft: 5,
              }}
            />
          </View>
        </TouchableOpacity>
        <TextBase
          text={'Versión 1.0.0'}
          fontFamily="AirbnbCereal_W_Bk"
          color={'#fff'}
          fontSize={12}
          style={{
            marginTop: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  link: {
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 22,
    flexDirection: 'row',
  },
  bottomContentContainer: {
    padding: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  signOutBtn: {
    paddingTop: 10,
    paddingBottom: 30,
  },
});

export default CustomDrawer;
