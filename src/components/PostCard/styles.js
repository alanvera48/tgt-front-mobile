import {StyleSheet} from 'react-native';
import {COLORS} from '../../style/style';

export const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.dark.backgroundCard,
  },
  containerFullWidth: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.dark.backgroundCard,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundLight,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  trainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  description: {
    marginTop: 4,
  },
  trainerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});
