import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSquare, faCheckSquare} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../style/style';
import TextBase from '../Base/TextBase';
import ButtonGradient from '../Buttons/ButtonGradient';
import {DEVICE_WIDTH} from '../../constants';
const {dark: theme} = COLORS;

export const DropdownMultiInput = ({
  label,
  items,
  isOpen,
  setIsOpen,
  selectedItems,
  handleSelectItem,
  handleRemoveItem,
  error,
  disabled = false,
}) => {
  const styles = StyleSheet.create({
    inputContainer: {
      alignItems: 'center',
      height: 60,
      flexDirection: 'row',

      borderBottomWidth: 1,
      borderColor: error ? COLORS.dark.error : COLORS.dark.backgroundInput,
      backgroundColor: 'transparent',

      position: 'relative',
    },
    label: {
      position: 'absolute',
      top: -5,
      left: 5,
      backgroundColor: 'transparent',
      zIndex: 1,
      paddingHorizontal: 5,
      color: COLORS.dark.textPrimary,
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

  return (
    <View
      style={{
        flexDirection: 'column',
        width: '100%',
      }}>
      <View
        style={{
          alignItems: 'flex-start',
          height: 18,
          bottom: 15,
        }}>
        <Text style={{color: COLORS.dark.error, fontSize: 12}}>
          {error ? error.message : ''}
        </Text>
      </View>
      <View
        style={[
          styles.inputContainer,
          {
            zIndex: 5,
          },
        ]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TouchableOpacity disabled={disabled} onPress={() => setIsOpen(true)}>
          <TextBase
            text={
              selectedItems?.length > 0
                ? selectedItems?.toString()
                : 'Seleccionar'
            }
            lines={1}
            size={16}
            color={
              error
                ? COLORS.dark.error
                : selectedItems?.length > 0
                ? COLORS.dark.textWhite
                : COLORS.dark.gray
            }
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isOpen}
          style={{
            width: '100%',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                position: 'absolute',
                justifyContent: 'space-between',
                paddingHorizontal: 40,
                paddingTop: 60,
                paddingBottom: 30,
                borderRadius: 10,
                backgroundColor: COLORS.dark.background,
                maxWidth: DEVICE_WIDTH - 10,
              }}>
              <ScrollView
                style={{maxHeight: 300}}
                contentContainerStyle={{alignItems: 'center'}}>
                <Text
                  style={{
                    zIndex: 5,
                    color: 'white',
                    marginBottom: 20,
                    fontSize: 18,
                  }}>
                  Seleccione sus especialidades
                </Text>
                {items.map((item, index) => {
                  let isSelected = selectedItems?.includes(item.value);
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: 220,
                        backgroundColor: COLORS.dark.backgroundInput,
                        borderRadius: 12,
                        padding: 14,
                      }}>
                      <View>
                        <TextBase
                          text={item.label}
                          lines={2}
                          color={COLORS.dark.textWhite}
                          style={{
                            zIndex: 5,
                            fontSize: 17,
                            maxWidth: 180,
                          }}
                        />
                      </View>
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          isSelected
                            ? handleRemoveItem(item)
                            : handleSelectItem(item)
                        }>
                        <FontAwesomeIcon
                          icon={isSelected ? faCheckSquare : faSquare}
                          size={24}
                          color={isSelected ? theme.textPrimary : 'gray'}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <ButtonGradient
                  onPress={() => setIsOpen(false)}
                  text={'Confirmar'}
                  style={{
                    height: 60,
                    width: 170,
                    justifySelf: 'center',
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
