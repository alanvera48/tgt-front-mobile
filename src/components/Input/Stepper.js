import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import TextBase from '../Base/TextBase';
import {COLORS} from '../../style/style';

export default function Stepper({
  label,
  value,
  onChange,
  min = 0,
  step = 1,
  error,
  disabled,
}) {
  const handleStep = delta => {
    const current = parseInt(value, 10);
    const base = Number.isNaN(current) ? min : current;
    const next = Math.max(min, base + delta);
    onChange(String(next));
  };

  return (
    <View style={styles.container}>
      {label && (
        <TextBase
          text={label}
          size={12}
          color={COLORS.dark.textMuted}
          fontFamily="AirbnbCereal_W_Bk"
          style={{marginBottom: 6}}
        />
      )}
      <View
        style={[
          styles.row,
          error ? {borderColor: COLORS.dark.error} : undefined,
        ]}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => handleStep(-step)}
          style={styles.button}>
          <FontAwesomeIcon icon={faMinus} color={'#fff'} size={14} />
        </TouchableOpacity>
        <TextInput
          style={styles.value}
          value={value != null ? String(value) : ''}
          onChangeText={onChange}
          editable={!disabled}
          keyboardType="numbers-and-punctuation"
          textAlign="center"
        />
        <TouchableOpacity
          disabled={disabled}
          onPress={() => handleStep(step)}
          style={styles.button}>
          <FontAwesomeIcon icon={faPlus} color={'#fff'} size={14} />
        </TouchableOpacity>
      </View>
      {!!error && (
        <TextBase
          text={error.message || 'Requerido'}
          size={11}
          color={COLORS.dark.error}
          style={{marginTop: 4}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dark.backgroundElevated,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  button: {
    width: 36,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323337',
  },
  value: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 8,
  },
});
