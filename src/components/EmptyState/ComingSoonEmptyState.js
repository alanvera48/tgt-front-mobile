import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextBase from '../Base/TextBase';

export const ComingSoonEmptyState = ({
  title = '¡Estamos trabajando en esto!',
  description = 'Esta función estará disponible pronto.',
  iconComponent,
}) => {
  return (
    <View style={styles.container}>
      {iconComponent && (
        <View style={styles.iconContainer}>{iconComponent}</View>
      )}

      <View style={styles.emojiContainer}>
        <TextBase text={'🚀'} size={64} style={styles.emoji} />
      </View>

      <View style={styles.contentContainer}>
        <TextBase
          text={title}
          size={20}
          color={'#FFFFFF'}
          fontFamily="AirbnbCereal_W_Bd"
          style={styles.title}
          lines={2}
        />

        <TextBase
          text={description}
          size={14}
          color={'#B0B0B0'}
          fontFamily="AirbnbCereal_W_Bk"
          style={styles.description}
          lines={3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 16,
  },
  emojiContainer: {
    marginBottom: 24,
  },
  emoji: {
    textAlign: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
