import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGripLines} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../../style/style';
import ExerciseCard from './ExerciseCard';

export default function DraggableExerciseCard({
  index,
  totalCount,
  onMeasure,
  getLayoutForIndex,
  onDragEnd,
  onDragStateChange,
  dragDisabled,
  ...exerciseCardProps
}) {
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const handleDragEnd = useCallback(
    finalTranslationY => {
      const startLayout = getLayoutForIndex(index);
      if (!startLayout) {
        return;
      }
      const draggedMidpoint =
        startLayout.y + finalTranslationY + startLayout.height / 2;

      let targetIndex = index;
      let bestDistance = Infinity;
      for (let i = 0; i < totalCount; i++) {
        const layout = getLayoutForIndex(i);
        if (!layout) {
          continue;
        }
        const midpoint = layout.y + layout.height / 2;
        const distance = Math.abs(midpoint - draggedMidpoint);
        if (distance < bestDistance) {
          bestDistance = distance;
          targetIndex = i;
        }
      }

      if (targetIndex !== index) {
        onDragEnd(index, targetIndex);
      }
    },
    [index, getLayoutForIndex, totalCount, onDragEnd],
  );

  const panGesture = Gesture.Pan()
    .activateAfterLongPress(180)
    .enabled(!dragDisabled)
    .onStart(() => {
      isDragging.value = true;
      runOnJS(onDragStateChange)(true);
    })
    .onUpdate(event => {
      translateY.value = event.translationY;
    })
    .onEnd(event => {
      const finalTranslationY = translateY.value;
      translateY.value = withSpring(0);
      isDragging.value = false;
      runOnJS(onDragStateChange)(false);
      runOnJS(handleDragEnd)(finalTranslationY);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: translateY.value},
      {scale: isDragging.value ? 1.02 : 1},
    ],
    zIndex: isDragging.value ? 100 : 0,
    shadowColor: '#000',
    shadowOpacity: isDragging.value ? 0.35 : 0,
    shadowRadius: 10,
    elevation: isDragging.value ? 6 : 0,
  }));

  return (
    <Animated.View
      style={animatedStyle}
      onLayout={event => {
        const {y, height} = event.nativeEvent.layout;
        onMeasure(index, {y, height});
      }}>
      <View style={styles.row}>
        <GestureDetector gesture={panGesture}>
          <View style={styles.handle} hitSlop={{left: 10, right: 10}}>
            <FontAwesomeIcon
              icon={faGripLines}
              color={COLORS.dark.textMuted}
              size={18}
            />
          </View>
        </GestureDetector>
        <View style={{flex: 1}}>
          <ExerciseCard index={index} {...exerciseCardProps} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  handle: {
    width: 28,
    alignItems: 'center',
    paddingTop: 18,
  },
});
