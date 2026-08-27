/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {View} from 'react-native';
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS} from '../../style/style';

export default function LabelNav({size, focused, icon}) {
  return (
    <MaskedView
      style={{
        flex: 1,
        flexDirection: 'row',
        height: size,
        transform:
          focused && icon.iconName === 'dumbbell' ? [{rotate: '140deg'}] : '',
      }}
      maskElement={
        <View
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesomeIcon icon={icon} size={size} />
        </View>
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
        style={{flex: 1}}
      />
    </MaskedView>
  );
}
