import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faDumbbell,
  faLayerGroup,
  faMagnifyingGlass,
  faStar,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import InDashboard from '../../../layouts/InDashboard';
import TextBase from '../../../components/Base/TextBase';
import {COLORS} from '../../../style/style';
import {getMuscleGroupColor} from '../../../utils/muscleGroupColors';
import {useGetExerciseTemplatesByTrainer} from '../../../hooks/exerciseTemplates/queries';
import {useAuthStore} from '../../../store/authStore';

function MuscleGroupFilter({groups, selected, onSelect}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{marginBottom: 6}}
      contentContainerStyle={{paddingHorizontal: 4}}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.filterItem}>
          <TouchableOpacity
            onPress={() => onSelect(null)}
            activeOpacity={0.8}
            style={[
              styles.filterCircle,
              {backgroundColor: '#2A2A2E'},
              selected === null && styles.filterCircleSelected,
            ]}>
            <FontAwesomeIcon icon={faLayerGroup} size={24} color={'#fff'} />
          </TouchableOpacity>
          <TextBase
            text="Todos"
            size={12}
            color={selected === null ? '#fff' : COLORS.dark.textMuted}
            fontFamily="AirbnbCereal_W_Bd"
            style={styles.filterLabel}
          />
        </View>

        {groups.map(group => {
          const isSelected = selected === group;
          const {color, background} = getMuscleGroupColor(group);
          return (
            <View key={group} style={styles.filterItem}>
              <TouchableOpacity
                onPress={() => onSelect(group)}
                activeOpacity={0.8}
                style={[
                  styles.filterCircle,
                  {backgroundColor: background},
                  isSelected && [styles.filterCircleSelected, {borderColor: color}],
                ]}>
                <FontAwesomeIcon icon={faDumbbell} size={24} color={color} />
              </TouchableOpacity>
              <TextBase
                text={group}
                size={12}
                lines={1}
                color={isSelected ? '#fff' : COLORS.dark.textMuted}
                style={styles.filterLabel}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default function ExerciseBank() {
  const navigation = useNavigation();
  const trainerId = useAuthStore(state => state.userInfo?.id);
  const [searchTerm, setSearchTerm] = useState('');
  const [muscleGroup, setMuscleGroup] = useState(null);

  const {data, isPending, isRefetching, refetch} =
    useGetExerciseTemplatesByTrainer(trainerId);

  const exercises = data?.data ?? data ?? [];

  const muscleGroups = useMemo(() => {
    return [...new Set(exercises.map(e => e.muscleGroup).filter(Boolean))];
  }, [exercises]);

  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesSearch = searchTerm
        ? exercise.name?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesMuscleGroup = muscleGroup
        ? exercise.muscleGroup === muscleGroup
        : true;
      return matchesSearch && matchesMuscleGroup;
    });
  }, [exercises, searchTerm, muscleGroup]);

  const goToDetail = exercise =>
    navigation.navigate('ExerciseTemplateDetail', {exercise});

  return (
    <InDashboard
      onRefresh={refetch}
      isRefetching={isRefetching}
      containerStyle={styles.container}>
      <View style={styles.searchBar}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          color={COLORS.dark.textMuted}
          size={16}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar en mis ejercicios..."
          placeholderTextColor={COLORS.dark.textMuted}
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoCapitalize="none"
        />
      </View>

      {muscleGroups.length > 0 && (
        <MuscleGroupFilter
          groups={muscleGroups}
          selected={muscleGroup}
          onSelect={setMuscleGroup}
        />
      )}

      {isPending ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.dark.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredExercises}
          scrollEnabled={false}
          keyExtractor={(item, index) => item.id ?? String(index)}
          contentContainerStyle={{paddingBottom: 20}}
          ListEmptyComponent={
            <TextBase
              text={
                searchTerm || muscleGroup
                  ? 'No se encontraron ejercicios con ese filtro'
                  : 'Todavía no tenés ejercicios guardados'
              }
              size={13}
              lines={2}
              color={COLORS.dark.textMuted}
              style={{textAlign: 'center', marginTop: 30}}
            />
          }
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.card}
              onPress={() => goToDetail(item)}>
              <View style={styles.thumbnail}>
                <FontAwesomeIcon
                  icon={item.exerciseVideo?.url ? faVideo : faDumbbell}
                  color={'#fff'}
                  size={18}
                />
              </View>
              <View style={{flex: 1}}>
                <View style={styles.cardHeader}>
                  <TextBase
                    text={item.name}
                    size={15}
                    color={'#fff'}
                    fontFamily="AirbnbCereal_W_Bd"
                    style={{flex: 1}}
                  />
                  {item.isFavorite ? (
                    <FontAwesomeIcon
                      icon={faStar}
                      color={COLORS.dark.primary}
                      size={16}
                    />
                  ) : null}
                </View>
                <TextBase
                  text={[item.category, item.muscleGroup]
                    .filter(Boolean)
                    .join(' · ')}
                  size={12}
                  color={COLORS.dark.textMuted}
                  style={{marginTop: 2}}
                />
                {(item.sets || item.reps || item.rest) && (
                  <TextBase
                    text={`${item.sets ?? '-'}x${item.reps ?? '-'} · ${
                      item.rest ?? '-'
                    }`}
                    size={12}
                    color={COLORS.dark.textMuted}
                    style={{marginTop: 2}}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </InDashboard>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 320,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  filterItem: {
    alignItems: 'center',
    marginRight: 14,
    width: 64,
  },
  filterCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterCircleSelected: {
    borderColor: COLORS.dark.primary,
  },
  filterLabel: {
    textAlign: 'center',
    marginTop: 6,
  },
  centered: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: COLORS.dark.backgroundElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
