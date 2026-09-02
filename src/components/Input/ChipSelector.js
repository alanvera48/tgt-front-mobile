import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import TextBase from '../Base/TextBase';
import {COLORS} from '../../style/style';

export default function ChipSelector({
  label,
  items,
  value,
  onChange,
  error,
  disabled,
  includeAllOption,
  horizontal,
}) {
  const options = includeAllOption
    ? [{label: 'Todos', value: null}, ...items]
    : items;

  const chips = options.map(option => {
    const isSelected = option.value === value;
    return (
      <TouchableOpacity
        key={String(option.value)}
        disabled={disabled}
        activeOpacity={0.8}
        onPress={() => onChange(option.value)}
        style={[styles.chip, isSelected && styles.chipSelected]}>
        <TextBase
          text={option.label}
          size={13}
          color={isSelected ? '#fff' : COLORS.dark.textMuted}
          fontFamily={isSelected ? 'AirbnbCereal_W_Bd' : 'AirbnbCereal_W_Bk'}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      {label && (
        <TextBase
          text={label}
          size={13}
          color={COLORS.dark.textMuted}
          fontFamily="AirbnbCereal_W_Bd"
          style={{marginBottom: 8}}
        />
      )}
      {horizontal ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRowHorizontal}>
          {chips}
        </ScrollView>
      ) : (
        <View style={styles.chipsRow}>{chips}</View>
      )}
      {!!error && (
        <TextBase
          text={error.message || 'Requerido'}
          size={11}
          color={COLORS.dark.error}
          style={{marginTop: 6}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipsRowHorizontal: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: COLORS.dark.backgroundElevated,
  },
  chipSelected: {
    backgroundColor: COLORS.dark.primary,
  },
});
