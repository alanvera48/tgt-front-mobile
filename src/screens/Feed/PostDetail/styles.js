import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../style/style';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mediaContainer: {
    width,
    height: width * 0.65,
    backgroundColor: COLORS.dark.backgroundLight,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
  },
  trainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trainerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: COLORS.dark.backgroundLight,
  },
  trainerInfo: {
    flex: 1,
  },
  videoErrorContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: COLORS.dark.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.dark.backgroundLight,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.backgroundLight,
  },
});
