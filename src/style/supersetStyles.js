import {StyleSheet} from 'react-native';
import {COLORS} from './style';

export const supersetStyles = StyleSheet.create({
  supersetContainer: {
    borderWidth: 2,
    borderColor: COLORS.dark.textPrimary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 172, 55, 0.05)',
  },
  supersetLabel: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 172, 55, 0.3)',
  },
});
