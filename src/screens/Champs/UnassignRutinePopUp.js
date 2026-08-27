import React from 'react';
import {BounceInDown, BounceOutDown} from 'react-native-reanimated';
import {Modal, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {COLORS} from '../../style/style';
import TextBase from '../../components/Base/TextBase';
import ButtonGradient from '../../components/Buttons/ButtonGradient';
import ButtonSecundary from '../../components/Buttons/ButtonSecundary';

const {dark: theme} = COLORS;

export const UnassignRutinePopUp = ({onPress, onPressCancel}) => {
  const AnimatedView = Animated.createAnimatedComponent(View);

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}>
        <AnimatedView entering={BounceInDown} exiting={BounceOutDown}>
          <View
            style={[
              {
                borderTopWidth: 1,
                backgroundColor: theme.backgroundLight,
                borderTopColor: theme.background,
                borderRadius: 20,
              },
            ]}>
            <View
              style={[
                {
                  alignItems: 'center',
                  backgroundColor: theme.background,
                  paddingHorizontal: 30,
                  paddingVertical: 50,
                  borderRadius: 20,
                },
              ]}>
              <TextBase
                color={'#ffff'}
                text={'¿Seguro que querés desasignar esta rutina?'}
                lines={2}
                fontFamily="AirbnbCereal_W_Bd"
                size={20}
                style={{marginBottom: 40, textAlign: 'center'}}
              />
              <ButtonGradient
                text={'Aceptar'}
                onPress={() => onPress()}
                style={{marginBottom: 20}}
              />
              <ButtonSecundary
                text={'Cancelar'}
                onPress={() => onPressCancel()}
              />
            </View>
          </View>
        </AnimatedView>
      </View>
    </Modal>
  );
};
