import React, {useRef, useEffect} from 'react';
import {View, Animated, PanResponder} from 'react-native';

const PanController = ({
  onStartShouldSetPanResponder,
  onMoveShouldSetPanResponder,
  onPanResponderGrant,
  onPanResponderMove,
  onPanResponderRelease,
  onRelease,
  onReleaseX,
  onReleaseY,
  onDirectionChange,
  onOvershoot,
  panX,
  panY,
  xBounds,
  yBounds,
  overshootX,
  overshootY,
  horizontal,
  vertical,
  lockDirection,
  directionLockDistance,
  xMode,
  yMode,
  snapSpacingX,
  snapSpacingY,
  momentumDecayConfig,
  overshootReductionFactor,
  overshootSpringConfig,
  springOriginConfig,
  ...restProps
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const _direction = useRef(null);
  const deceleration = useRef(0.997);

  useEffect(() => {
    if (momentumDecayConfig && momentumDecayConfig.deceleration) {
      deceleration.current = momentumDecayConfig.deceleration;
    }
  }, [momentumDecayConfig]);

  const handleResponderMove = (anim, delta, min, max, overshoot) => {
    let val = anim._offset + delta;

    if (val > max) {
      switch (overshoot) {
        case 'spring':
          val = max + (val - max) / overshootReductionFactor;
          break;
        case 'clamp':
          val = max;
          break;
      }
    }
    if (val < min) {
      switch (overshoot) {
        case 'spring':
          val = min - (min - val) / overshootReductionFactor;
          break;
        case 'clamp':
          val = min;
          break;
      }
    }
    val = val - anim._offset;
    anim.setValue(val);
  };

  const handleResponderRelease = (
    anim,
    min,
    max,
    velocity,
    overshoot,
    mode,
    snapSpacing,
  ) => {
    anim.flattenOffset();

    if (anim._value < min) {
      if (onOvershoot) {
        onOvershoot(); // TODO: what args should we pass to this
      }
      switch (overshoot) {
        case 'spring':
          Animated.spring(anim, {
            ...overshootSpringConfig,
            toValue: min,
            velocity,
          }).start();
          break;
        case 'clamp':
          anim.setValue(min);
          break;
      }
    } else if (anim._value > max) {
      if (onOvershoot) {
        onOvershoot(); // TODO: what args should we pass to this
      }
      switch (overshoot) {
        case 'spring':
          Animated.spring(anim, {
            ...overshootSpringConfig,
            toValue: max,
            velocity,
          }).start();
          break;
        case 'clamp':
          anim.setValue(min);
          break;
      }
    } else {
      switch (mode) {
        case 'snap':
          handleSnappedScroll(anim, min, max, velocity, snapSpacing);
          break;

        case 'decay':
          handleMomentumScroll(anim, min, max, velocity, overshoot);
          break;

        case 'spring-origin':
          Animated.spring(anim, {
            ...springOriginConfig,
            toValue: 0,
            velocity,
          }).start();
          break;
      }
    }
  };

  const handleResponderGrant = (anim, mode) => {
    switch (mode) {
      case 'spring-origin':
        anim.setValue(0);
        break;
      case 'snap':
      case 'decay':
        anim.setOffset(anim._value + anim._offset);
        anim.setValue(0);
        break;
    }
  };

  const handleMomentumScroll = (anim, min, max, velocity, overshoot) => {
    Animated.decay(anim, {
      ...momentumDecayConfig,
      velocity,
    }).start(() => {
      anim.removeListener(_listener);
    });

    const _listener = anim.addListener(({value}) => {
      if (value < min || value > max) {
        anim.removeListener(_listener);
        if (onOvershoot) {
          onOvershoot(); // TODO: what args should we pass to this
        }
        switch (overshoot) {
          case 'spring':
            Animated.spring(anim, {
              ...overshootSpringConfig,
              toValue: value < min ? min : max,
              velocity,
            }).start();
            break;
          case 'clamp':
            anim.setValue(value < min ? min : max);
            break;
        }
      }
    });
  };

  const handleSnappedScroll = (anim, min, max, velocity, spacing) => {
    let endX = momentumCenter(anim._value, velocity, spacing);
    endX = Math.max(endX, min);
    endX = Math.min(endX, max);
    const bounds = [endX - spacing / 2, endX + spacing / 2];
    const endV = velocityAtBounds(anim._value, velocity, bounds);

    const _listener = anim.addListener(({value}) => {
      if (value > bounds[0] && value < bounds[1]) {
        Animated.spring(anim, {
          toValue: endX,
          velocity: endV,
          useNativeDriver: false,
        }).start();
      }
    });

    Animated.decay(anim, {
      ...momentumDecayConfig,
      velocity,
    }).start(() => {
      anim.removeListener(_listener);
    });
  };

  const closestCenter = (x, spacing) => {
    const plus = x % spacing < spacing / 2 ? 0 : spacing;
    return Math.round(x / spacing) * spacing + plus;
  };

  const momentumCenter = (x0, vx, spacing) => {
    let t = 0;
    let x1 = x0;
    let x = x1;

    while (true) {
      t += 16;
      x =
        x0 +
        (vx / (1 - deceleration.current)) *
          (1 - Math.exp(-(1 - deceleration.current) * t));
      if (Math.abs(x - x1) < 0.1) {
        x1 = x;
        break;
      }
      x1 = x;
    }
    return closestCenter(x1, spacing);
  };

  const velocityAtBounds = (x0, vx, bounds) => {
    let t = 0;
    let x1 = x0;
    let x = x1;
    let vf;
    while (true) {
      t += 16;
      x =
        x0 +
        (vx / (1 - deceleration.current)) *
          (1 - Math.exp(-(1 - deceleration.current) * t));
      vf = (x - x1) / 16;
      if (x > bounds[0] && x < bounds[1]) {
        break;
      }
      if (Math.abs(vf) < 0.1) {
        break;
      }
      x1 = x;
    }
    return vf;
  };

  const _responder = PanResponder.create({
    onStartShouldSetPanResponder,
    onMoveShouldSetPanResponder,
    onPanResponderGrant: (...args) => {
      if (onPanResponderGrant) {
        onPanResponderGrant(...args);
      }
      const {panX, panY, horizontal, vertical, xMode, yMode} = restProps;

      handleResponderGrant(panX, xMode);
      handleResponderGrant(panY, yMode);

      _direction.current =
        horizontal && !vertical ? 'x' : vertical && !horizontal ? 'y' : null;
    },
    onPanResponderMove: (_, {dx, dy, x0, y0}) => {
      const {
        panX,
        panY,
        xBounds,
        yBounds,
        overshootX,
        overshootY,
        horizontal,
        vertical,
        lockDirection,
        directionLockDistance,
      } = restProps;

      if (!_direction.current) {
        const dx2 = dx * dx;
        const dy2 = dy * dy;
        if (dx2 + dy2 > directionLockDistance) {
          _direction.current = dx2 > dy2 ? 'x' : 'y';
          if (onDirectionChange) {
            onDirectionChange(_direction.current, {dx, dy, x0, y0});
          }
        }
      }

      const dir = _direction.current;

      if (onPanResponderMove) {
        onPanResponderMove(_, {dx, dy, x0, y0});
      }

      if (horizontal && (!lockDirection || dir === 'x')) {
        let [xMin, xMax] = xBounds;

        handleResponderMove(panX, dx, xMin, xMax, overshootX);
      }

      if (vertical && (!lockDirection || dir === 'y')) {
        let [yMin, yMax] = yBounds;

        handleResponderMove(panY, dy, yMin, yMax, overshootY);
      }
    },
    onPanResponderRelease: (_, {vx, vy, dx, dy}) => {
      const {
        panX,
        panY,
        xBounds,
        yBounds,
        overshootX,
        overshootY,
        horizontal,
        vertical,
        lockDirection,
        xMode,
        yMode,
        snapSpacingX,
        snapSpacingY,
      } = restProps;

      let cancel = false;

      const dir = _direction.current;

      if (onRelease) {
        cancel = onRelease({vx, vy, dx, dy}) === false;
      }

      if (!cancel && horizontal && (!lockDirection || dir === 'x')) {
        let [xMin, xMax] = xBounds;
        if (onReleaseX) {
          cancel = onReleaseX({vx, vy, dx, dy}) === false;
        }
        !cancel &&
          handleResponderRelease(
            panX,
            xMin,
            xMax,
            vx,
            overshootX,
            xMode,
            snapSpacingX,
          );
      }

      if (!cancel && vertical && (!lockDirection || dir === 'y')) {
        let [yMin, yMax] = yBounds;
        if (onReleaseY) {
          cancel = onReleaseY({vx, vy, dx, dy}) === false;
        }
        !cancel &&
          handleResponderRelease(
            panY,
            yMin,
            yMax,
            vy,
            overshootY,
            yMode,
            snapSpacingY,
          );
      }

      _direction.current =
        horizontal && !vertical ? 'x' : vertical && !horizontal ? 'y' : null;
    },
  });

  return <View {...restProps} {..._responder.panHandlers} />;
};

export default PanController;
