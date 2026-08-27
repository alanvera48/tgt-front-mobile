import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Svg, {Circle, Defs, RadialGradient, Stop} from 'react-native-svg';
import {COLORS} from '../../style/style';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function AuthBackground() {
  return (
    <Svg
      style={StyleSheet.absoluteFillObject}
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      pointerEvents="none">
      <Defs>
        <RadialGradient id="glowTop" cx="50%" cy="50%" r="50%">
          <Stop
            offset="0%"
            stopColor={COLORS.dark.primaryLight}
            stopOpacity={0.35}
          />
          <Stop
            offset="100%"
            stopColor={COLORS.dark.primaryLight}
            stopOpacity={0}
          />
        </RadialGradient>
        <RadialGradient id="glowBottom" cx="50%" cy="50%" r="50%">
          <Stop
            offset="0%"
            stopColor={COLORS.dark.primaryDark}
            stopOpacity={0.3}
          />
          <Stop
            offset="100%"
            stopColor={COLORS.dark.primaryDark}
            stopOpacity={0}
          />
        </RadialGradient>
      </Defs>

      <Circle
        cx={SCREEN_WIDTH * 0.85}
        cy={SCREEN_HEIGHT * 0.05}
        r={150}
        fill="url(#glowTop)"
      />
      <Circle
        cx={SCREEN_WIDTH * 0.1}
        cy={SCREEN_HEIGHT * 0.6}
        r={150}
        fill="url(#glowBottom)"
      />

      <Circle
        cx={SCREEN_WIDTH * 0.16}
        cy={SCREEN_HEIGHT * 0.11}
        r={26}
        stroke={COLORS.dark.primaryLight}
        strokeOpacity={0.25}
        strokeWidth={1.5}
        fill="none"
      />
      <Circle
        cx={SCREEN_WIDTH * 0.82}
        cy={SCREEN_HEIGHT * 0.63}
        r={18}
        stroke={COLORS.dark.primaryLight}
        strokeOpacity={0.3}
        strokeWidth={1.5}
        fill="none"
      />
      <Circle
        cx={SCREEN_WIDTH * 0.7}
        cy={SCREEN_HEIGHT * 0.16}
        r={5}
        fill={COLORS.dark.primaryLight}
        fillOpacity={0.4}
      />
      <Circle
        cx={SCREEN_WIDTH * 0.3}
        cy={SCREEN_HEIGHT * 0.57}
        r={4}
        fill={COLORS.dark.primaryLight}
        fillOpacity={0.35}
      />
    </Svg>
  );
}
