import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {COLORS} from '../../style/style';
import {DEVICE_WIDTH} from '../../constants';

const LIST_WIDTH = DEVICE_WIDTH - 70;

export function SkeletonBox({width, height, borderRadius = 20, style}) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: COLORS.dark.backgroundLight,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function SkeletonCard({width = LIST_WIDTH, style}) {
  return (
    <SkeletonBox width={width} height={220} borderRadius={20} style={style} />
  );
}
