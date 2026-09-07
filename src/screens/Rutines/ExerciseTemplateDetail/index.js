import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faLayerGroup,
  faRepeat,
  faStar,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';
import VideoPlayer from 'react-native-video-player';
import TextBase from '../../../components/Base/TextBase';
import {COLORS} from '../../../style/style';
import {getMuscleGroupColor} from '../../../utils/muscleGroupColors';

function StatTile({icon, label, value}) {
  return (
    <View style={styles.statTile}>
      <FontAwesomeIcon icon={icon} color={COLORS.dark.primary} size={16} />
      <TextBase
        text={value}
        size={16}
        color={'#fff'}
        fontFamily="AirbnbCereal_W_Bd"
        style={{marginTop: 6}}
      />
      <TextBase
        text={label}
        size={11}
        color={COLORS.dark.textMuted}
        style={{marginTop: 2}}
      />
    </View>
  );
}

export default function ExerciseTemplateDetail({route}) {
  const exercise = route?.params?.exercise ?? {};
  const [loading, setLoading] = useState(false);

  const muscleGroupColor = getMuscleGroupColor(exercise.muscleGroup);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      {exercise.exerciseVideo?.url ? (
        <View style={styles.videoWrapper}>
          <VideoPlayer
            video={{uri: exercise.exerciseVideo.url}}
            style={styles.video}
            thumbnail={require('../../../assets/image/pexels-cottonbro-4753890.jpg')}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
          {loading && (
            <View style={styles.videoLoader}>
              <ActivityIndicator size="large" color={COLORS.dark.primary} />
            </View>
          )}
        </View>
      ) : (
        <View style={styles.noVideo}>
          <FontAwesomeIcon
            icon={faVideoSlash}
            size={40}
            color={COLORS.dark.textWhite}
          />
          <TextBase
            text="Todavía no subiste un video para este ejercicio"
            color={COLORS.dark.textWhite}
            fontFamily="AirbnbCereal_W_Md"
            size={14}
            lines={2}
            style={{marginTop: 10, textAlign: 'center'}}
          />
        </View>
      )}

      <View style={styles.titleRow}>
        <TextBase
          text={exercise.name}
          size={22}
          color={'#fff'}
          fontFamily="AirbnbCereal_W_Bd"
          lines={2}
          style={{flex: 1}}
        />
        {exercise.isFavorite ? (
          <FontAwesomeIcon
            icon={faStar}
            color={COLORS.dark.primary}
            size={20}
          />
        ) : null}
      </View>

      <View style={styles.tagsRow}>
        {!!exercise.muscleGroup && (
          <View
            style={[
              styles.tag,
              {backgroundColor: muscleGroupColor.background},
            ]}>
            <TextBase
              text={exercise.muscleGroup}
              size={12}
              color={muscleGroupColor.color}
              fontFamily="AirbnbCereal_W_Bd"
            />
          </View>
        )}
        {!!exercise.category && (
          <View style={[styles.tag, {backgroundColor: COLORS.dark.backgroundCard}]}>
            <TextBase
              text={exercise.category}
              size={12}
              color={COLORS.dark.textSecondary}
              fontFamily="AirbnbCereal_W_Bd"
            />
          </View>
        )}
      </View>

      <View style={styles.statsRow}>
        <StatTile
          icon={faLayerGroup}
          label={exercise.sets === 1 ? 'Serie' : 'Series'}
          value={exercise.sets ?? '-'}
        />
        <StatTile
          icon={faRepeat}
          label="Repeticiones"
          value={exercise.reps ?? '-'}
        />
        <StatTile icon={faClock} label="Descanso" value={exercise.rest ?? '-'} />
      </View>

      <TextBase
        text={`Usado ${exercise.usageCount ?? 0} ${
          exercise.usageCount === 1 ? 'vez' : 'veces'
        } en tus rutinas`}
        size={12}
        color={COLORS.dark.textMuted}
        style={{marginTop: 16}}
      />

      {!!exercise.description && (
        <View style={styles.descriptionSection}>
          <TextBase
            text={'Descripción'}
            size={14}
            color={'#fff'}
            fontFamily="AirbnbCereal_W_Bd"
            style={{marginBottom: 8}}
          />
          <TextBase
            text={exercise.description}
            size={14}
            lines={20}
            color={COLORS.dark.textSecondary}
            fontFamily="AirbnbCereal_W_Bk"
            style={{lineHeight: 20}}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  videoWrapper: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  video: {
    height: 240,
  },
  videoLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  noVideo: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundElevated,
    borderRadius: 16,
    paddingHorizontal: 30,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 18,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statTile: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 14,
    paddingVertical: 14,
    marginHorizontal: 4,
  },
  descriptionSection: {
    marginTop: 20,
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 14,
    padding: 16,
  },
});
