import React from 'react';
import {BaseToast, ErrorToast} from 'react-native-toast-message';

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

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      contentContainerStyle={{height: 80}}
      style={{height: 80, borderLeftColor: '#00a061', borderLeftWidth: 5}}
      text2NumberOfLines={2}
      text1Style={{
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
        color: '#000000',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      contentContainerStyle={{height: 80}}
      style={{height: 80, borderLeftColor: '#f71a1a', borderLeftWidth: 5}}
      text2NumberOfLines={2}
      text1Style={{
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
        color: '#000000',
      }}
    />
  ),
  info: props => (
    <ErrorToast
      {...props}
      contentContainerStyle={{height: 80}}
      style={{height: 80, borderLeftColor: '#0d79c8', borderLeftWidth: 5}}
      text2NumberOfLines={2}
      text1Style={{
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
        color: '#000000',
      }}
    />
  ),
};
