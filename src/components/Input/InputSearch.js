import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../style/style';

export default function InputSearch({placeholder, value, setValue}) {
  // return null;
  // Comentamos el InputSearch hasta implementarlo con funcionalidad
  // TODO COMENTAR PERO DONDE NO SE USA ASI SE SIGUE VIENDO EN EL BUSCADOR DE GYMS
  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: COLORS.dark.textMuted,
        marginVertical: 5,
        borderRadius: 10,
      }}>
      <View style={styles.searchInput}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size={25}
          color={COLORS.dark.textMuted}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder ?? 'Buscar'}
          placeholderTextColor={COLORS.dark.textMuted}
          value={value}
          onChangeText={val => setValue(val)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTopBar: {
    paddingVertical: 20,
    backgroundColor: COLORS.dark.background,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 50,
  },
  searchInput: {
    backgroundColor: '#505050',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 9,
    border: 'none',
  },
  input: {
    height: 40,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'AirbnbCereal_W_Bk',
    paddingVertical: 0,
    color: COLORS.dark.textMuted,
  },
});
