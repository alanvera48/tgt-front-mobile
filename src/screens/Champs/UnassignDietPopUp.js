import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Modal} from '@gluestack-ui/themed';
import TextBase from '../../components/Base/TextBase';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import {COLORS} from '../../style/style';

export const UnassignDietPopUp = ({onPress, onPressCancel}) => {
  return (
    <Modal
      isOpen={true}
      onClose={onPressCancel}
      size="md"
      closeOnOverlayClick={false}
      backgroundColor={COLORS.dark.background}
      borderRadius={20}>
      <View style={styles.container}>
        <TextBase
          text={'¿Estás seguro?'}
          color={'#fff'}
          size={24}
          fontFamily={'AirbnbCereal_W_Bd'}
          style={styles.title}
        />
        <TextBase
          text={'¿Deseas desasignar esta dieta?'}
          color={COLORS.dark.textMuted}
          size={16}
          fontFamily={'AirbnbCereal_W_Bk'}
          style={styles.subtitle}
        />
        <View style={styles.buttonContainer}>
          <Pressable onPress={onPressCancel} style={styles.cancelButton}>
            <TextBase
              text="Cancelar"
              color="#fff"
              size={16}
              fontFamily="AirbnbCereal_W_Bd"
            />
          </Pressable>
          <ButtonGradient
            text="Desasignar"
            onPress={onPress}
            style={styles.confirmButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
  },
});
