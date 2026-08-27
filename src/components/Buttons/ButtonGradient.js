import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, StyleSheet, Pressable, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../style/style';

export default function ButtonGradient({
  onPress,
  text,
  icon,
  style,
  isLoading,
}) {
  return (
    <LinearGradient
      hitSlop={40}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={[
        COLORS.dark.primaryLight,
        COLORS.dark.primary,
        COLORS.dark.primaryDark,
      ]}
      style={[styles.buttonColor, style]}>
      <Pressable style={styles.buttonPress} onPress={onPress} hitSlop={16}>
        {isLoading && <ActivityIndicator color={'#FFF'} />}
        {!isLoading && (
          <>
            <Text style={styles.text}>{text}</Text>
            {icon && <FontAwesomeIcon icon={icon} color={'#FFF'} size={25} />}
          </>
        )}
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#FFFF',
    textAlign: 'center',
    fontFamily: 'AirbnbCereal_W_Bd',
    fontSize: 19,
  },
  buttonPress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonColor: {
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 30,
    width: 280,
    maxWidth: 280,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
