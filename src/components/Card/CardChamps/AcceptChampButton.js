import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-native-toast-message';
import TextBase from '../../Base/TextBase';
import {COLORS} from '../../../style/style';
import {useApprovedChamp} from '../../../hooks/user/queries';

export const AcceptChampButton = ({relationId, viewType = 'grid'}) => {
  const {mutate, isPending} = useApprovedChamp();

  const handleAccept = () => {
    mutate(relationId, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Conectado',
          text2: 'Se ha conectado con el champ',
        });
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Ha ocurrido un error al intentar aceptar al champ',
        });
      },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={isPending}
      onPress={handleAccept}
      style={[
        styles.button,
        viewType === 'grid' ? styles.buttonGrid : styles.buttonList,
      ]}>
      {isPending ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          <FontAwesomeIcon icon={faCheck} size={12} color="#fff" />
          <TextBase
            text="Aceptar"
            size={13}
            color="#fff"
            fontFamily="AirbnbCereal_W_Bd"
            style={{marginLeft: 6}}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.dark.success,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  buttonGrid: {
    marginTop: 10,
  },
  buttonList: {
    marginLeft: 10,
  },
});
