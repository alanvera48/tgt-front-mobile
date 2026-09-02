import React from 'react';
import {View} from 'react-native';
import {BaseToast} from 'react-native-toast-message';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';

export const COLORS = {
  light: {},
  dark: {
    // Backgrounds
    background: '#141414',
    backgroundLight: '#252525',
    backgroundDark: '#0c0c0c',
    backgroundCard: '#232222',
    backgroundInput: '#2C2C2E',
    backgroundElevated: '#1a1a1a',

    // Text
    textWhite: '#ffffff',
    textBlack: '#000000',
    textPrimary: '#FFAC37',
    textSecondary: '#C4C4CC',
    textMuted: '#9CA3AF',

    // Brand / Primary
    primary: '#DF4800',
    primaryLight: '#FE7F00',
    primaryDark: '#BD0101',
    gray: '#BCBCBC',

    // Semantic
    error: '#E74C3C',
    success: '#00a061',
    info: '#0d79c8',
  },
};

export const mapCustomStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {featureType: 'road', elementType: 'geometry', stylers: [{color: '#38414e'}]},
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];

const TOAST_VARIANTS = {
  success: {color: COLORS.dark.success, icon: faCircleCheck},
  error: {color: COLORS.dark.error, icon: faCircleExclamation},
  info: {color: COLORS.dark.info, icon: faCircleInfo},
};

// Alpha hex suffix (RRGGBBAA) sobre el color semántico, para el fondo
// tenue del ícono — evita un color plano sólido que compita con el resto.
const renderThemedToast = variant => props => {
  const {color, icon} = TOAST_VARIANTS[variant];

  return (
    <BaseToast
      {...props}
      style={{
        backgroundColor: COLORS.dark.backgroundElevated,
        borderLeftWidth: 0,
        borderRadius: 16,
        minHeight: 64,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      text1Style={{
        fontFamily: 'AirbnbCereal_W_Bd',
        fontSize: 15,
        color: COLORS.dark.textWhite,
      }}
      text2Style={{
        fontFamily: 'AirbnbCereal_W_Bk',
        fontSize: 13,
        color: COLORS.dark.textSecondary,
        marginTop: 2,
      }}
      renderLeadingIcon={() => (
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: `${color}26`,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginLeft: 12,
          }}>
          <FontAwesomeIcon icon={icon} size={18} color={color} />
        </View>
      )}
    />
  );
};

export const toastConfig = {
  success: renderThemedToast('success'),
  error: renderThemedToast('error'),
  info: renderThemedToast('info'),
};
