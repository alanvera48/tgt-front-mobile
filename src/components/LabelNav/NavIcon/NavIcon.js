/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';

import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import {COLORS} from '../../../style/style';

export default function NavIcon({focused}) {
  return (
    <MaskedView
      style={{
        flex: 1,
        flexDirection: 'row',
        height: 5,
      }}
      maskElement={
        focused ? (
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <FontAwesomeIcon icon={faCircle} size={8} />
          </View>
        ) : (
          <View></View>
        )
      }>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={
          focused
            ? [
                COLORS.dark.primaryLight,
                COLORS.dark.primary,
                COLORS.dark.primaryDark,
              ]
            : [
                COLORS.dark.textMuted,
                COLORS.dark.textMuted,
                COLORS.dark.textMuted,
              ]
        }
        // colors={[COLORS.dark.textMuted, COLORS.dark.textMuted, COLORS.dark.textMuted]}
        style={{flex: 1}}
      />
    </MaskedView>
  );
}
