/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../style/style';

const PercentageBar = ({starText, percentage}) => {
  const [animation] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animation, {
      toValue: percentage,
      duration: 500,
    }).start();
  }, [percentage]);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={styles.progressText}>{starText}</Text>
      <View style={styles.progressMiddle}>
        <View style={styles.progressWrap}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: animation.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default PercentageBar;

const styles = StyleSheet.create({
  progressText: {
    width: 10,
    fontSize: 14,
    color: '#fff',
    fontFamily: 'AirbnbCereal_W_Bd',
  },
  progressPercentText: {width: 40, fontSize: 14, color: '#fff'},
  progressMiddle: {
    height: 6,
    flex: 1,
    marginHorizontal: 10,
  },
  progressWrap: {
    backgroundColor: COLORS.dark.backgroundInput,
    borderRadius: 18,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  progressBar: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    minWidth: 5,
  },
});
