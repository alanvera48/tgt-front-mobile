import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop, Circle} from 'react-native-svg';
import {COLORS} from '../../style/style';

export default function AnimatedLogo({size = 120}) {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="stripesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop
              offset="0%"
              stopColor={COLORS.dark.primaryLight}
              stopOpacity="1"
            />
            <Stop
              offset="50%"
              stopColor={COLORS.dark.primary}
              stopOpacity="1"
            />
            <Stop
              offset="100%"
              stopColor={COLORS.dark.primaryDark}
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>

        {/* Base circle with dark background */}
        <Circle cx="50" cy="50" r="48" fill={COLORS.dark.background} />

        {/* Wide stripes with sharp points */}
        <Path
          d="M10 25
             L 15 25
             C 30 25, 40 42, 50 42
             C 60 42, 70 25, 85 25
             L 90 25
             L 85 39
             C 70 39, 60 56, 50 56
             C 40 56, 30 39, 15 39
             Z"
          fill="url(#stripesGrad)"
        />
        <Path
          d="M10 45
             L 15 45
             C 30 45, 40 62, 50 62
             C 60 62, 70 45, 85 45
             L 90 45
             L 85 59
             C 70 59, 60 76, 50 76
             C 40 76, 30 59, 15 59
             Z"
          fill="url(#stripesGrad)"
        />
        <Path
          d="M10 65
             L 15 65
             C 30 65, 40 82, 50 82
             C 60 82, 70 65, 85 65
             L 90 65
             L 85 79
             C 70 79, 60 96, 50 96
             C 40 96, 30 79, 15 79
             Z"
          fill="url(#stripesGrad)"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
