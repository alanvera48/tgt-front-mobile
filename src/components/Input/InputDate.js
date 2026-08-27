import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {parse, isValid, getYear} from 'date-fns';
import TextBase from '../Base/TextBase';
import {COLORS} from '../../style/style';

const THIS_YEAR = getYear(new Date());

export default function InputDate({
  value,
  onChangeText,
  readOnly = false,
  label,
  error,
  style,
}) {
  const [date, setDate] = useState(undefined);
  const [day, setDay] = useState(undefined);
  const [month, setMonth] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [validationMessage, setValidationMessage] = useState('');

  const errorColor = error ? COLORS.dark.error : undefined;

  useEffect(() => {
    if (day && month && year) {
      setDate(`${day}/${month}/${year}`);
      onChangeText(
        `${year}-${month.length === 1 ? `0${month}` : month}-${
          day.length === 1 ? `0${day}` : day
        }`,
      );
    }
  }, [day, month, year]);

  useEffect(() => {
    let initialValue;
    if (value) {
      initialValue = value.split('/');
      setDay(initialValue[0]);
      setMonth(initialValue[1]);
      setYear(initialValue[2]);
    }
  }, []);

  useEffect(() => {
    if (date) {
      if (year?.length < 4 || Number(year) < 1930 || Number(year) > THIS_YEAR) {
        setValidationMessage('La fecha no es válida.');
        return;
      }
      const dateResult = parse(date, 'dd/MM/yyyy', new Date());

      if (isValid(dateResult, 'dd/MM/yyyy')) {
        setValidationMessage('');
      } else {
        setValidationMessage('La fecha no es válida.');
      }
    }
  }, [date]);

  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            width: 200,
            height: 20,
          }}>
          <Text style={styles.errorText}>
            {validationMessage ? validationMessage : error ? error.message : ''}
          </Text>
        </View>

        <View
          style={[
            styles.inputContainer,
            errorColor && {borderColor: errorColor},
            style,
          ]}>
          <TextBase text={label} style={styles.label} />
          <View style={styles.dateRow}>
            <TextInput
              style={[styles.input, errorColor && {color: errorColor}]}
              placeholder={'dd'}
              maxLength={2}
              keyboardType="numeric"
              placeholderTextColor={errorColor || '#BBCBCB'}
              value={day}
              onChangeText={setDay}
              editable={!readOnly}
            />
            <TextBase
              text={'/'}
              size={16}
              color={errorColor || (value ? '#fff' : '#BBCBCB')}
              lines={1}
              style={{marginTop: 10}}
            />
            <TextInput
              style={[styles.input, errorColor && {color: errorColor}]}
              placeholder={'mm'}
              maxLength={2}
              keyboardType="numeric"
              placeholderTextColor={errorColor || '#BBCBCB'}
              value={month}
              onChangeText={setMonth}
              editable={!readOnly}
            />
            <TextBase
              text={'/'}
              size={16}
              color={errorColor || (value ? '#fff' : '#BBCBCB')}
              lines={1}
              style={{marginTop: 10}}
            />
            <TextInput
              style={[
                styles.input,
                {width: 45},
                errorColor && {color: errorColor},
              ]}
              placeholder={'yyyy'}
              maxLength={4}
              keyboardType="numeric"
              placeholderTextColor={errorColor || '#BBCBCB'}
              value={year}
              onChangeText={setYear}
              editable={!readOnly}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    height: 72,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLORS.dark.backgroundInput,
    backgroundColor: 'transparent',
    position: 'relative',
    marginBottom: 15,
    marginLeft: 10,
  },
  label: {
    position: 'absolute',
    top: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
    color: COLORS.dark.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    padding: 0,
    fontSize: 17,
    fontFamily: 'AirbnbCereal_W_Bk',
    color: '#fff',
    textAlign: 'center',
    width: 'auto',
    borderColor: 'transparent',
    borderWidth: 1,
  },
  errorText: {
    color: COLORS.dark.error,
    fontSize: 12,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});
