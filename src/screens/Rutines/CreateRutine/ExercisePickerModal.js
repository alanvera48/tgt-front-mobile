import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMagnifyingGlass,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import TextBase from '../../../components/Base/TextBase';
import ChipSelector from '../../../components/Input/ChipSelector';
import {COLORS} from '../../../style/style';
import {MUSCULAR_GROUP} from '../../../constants/muscularGroup';
import {useSearchExerciseTemplates} from '../../../hooks/exerciseTemplates/queries';

export default function ExercisePickerModal({
  visible,
  onClose,
  onSelectTemplate,
  onCreateNew,
}) {
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [muscleGroup, setMuscleGroup] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => setSearchTerm(searchInput), 350);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    if (!visible) {
      setSearchInput('');
      setSearchTerm('');
      setMuscleGroup(null);
    }
  }, [visible]);

  const {data, isFetching} = useSearchExerciseTemplates({
    name: searchTerm || undefined,
    muscleGroup: muscleGroup || undefined,
  });

  const results = data?.data ?? data ?? [];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextBase
            text={'Elegir ejercicio'}
            size={18}
            color={'#fff'}
            fontFamily="AirbnbCereal_W_Bd"
          />
          <TouchableOpacity onPress={onClose} hitSlop={10}>
            <FontAwesomeIcon icon={faXmark} color={'#fff'} size={22} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            color={COLORS.dark.textMuted}
            size={16}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar en mi banco de ejercicios..."
            placeholderTextColor={COLORS.dark.textMuted}
            value={searchInput}
            onChangeText={setSearchInput}
            autoCapitalize="none"
          />
        </View>

        <ChipSelector
          items={MUSCULAR_GROUP}
          value={muscleGroup}
          onChange={setMuscleGroup}
          includeAllOption
        />

        {isFetching ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={COLORS.dark.primary} />
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item, index) => item.id ?? String(index)}
            contentContainerStyle={{paddingBottom: 20}}
            ListEmptyComponent={
              <TextBase
                text={
                  searchTerm
                    ? 'No se encontraron ejercicios con ese nombre en tu banco'
                    : 'Todavía no tenés ejercicios guardados en tu banco'
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
                style={styles.resultRow}
                onPress={() => onSelectTemplate(item)}>
                <View style={{flex: 1}}>
                  <TextBase
                    text={item.name}
                    size={15}
                    color={'#fff'}
                    fontFamily="AirbnbCereal_W_Bd"
                  />
                  <TextBase
                    text={[item.category, item.muscleGroup]
                      .filter(Boolean)
                      .join(' · ')}
                    size={12}
                    color={COLORS.dark.textMuted}
                    style={{marginTop: 2}}
                  />
                </View>
                {(item.sets || item.reps || item.rest) && (
                  <TextBase
                    text={`${item.sets ?? '-'}x${item.reps ?? '-'} · ${
                      item.rest ?? '-'
                    }s`}
                    size={12}
                    color={COLORS.dark.textMuted}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.createNewButton}
          onPress={() => onCreateNew(searchInput)}>
          <FontAwesomeIcon icon={faPlus} color={'#fff'} size={16} />
          <TextBase
            text={'Crear ejercicio nuevo'}
            size={15}
            color={'#fff'}
            fontFamily="AirbnbCereal_W_Bd"
            style={{marginLeft: 8}}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  createNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dark.primary,
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 20,
  },
});
