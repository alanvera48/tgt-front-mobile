import React from 'react';
import {Modal, View} from 'react-native';
import Animated, {BounceInDown, BounceOutDown} from 'react-native-reanimated';
import {COLORS} from '../../style/style';
import TextBase from '../Base/TextBase';
import ButtonGradient from '../Buttons/ButtonGradient';
import ButtonSecundary from '../Buttons/ButtonSecundary';

const {dark: theme} = COLORS;
const AnimatedView = Animated.createAnimatedComponent(View);

export const ConfirmationPopUp = ({
  title = '¿Estás seguro?',
  subtitle,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  isLoading,
}) => {
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
            style={{
              borderTopWidth: 1,
              backgroundColor: theme.backgroundLight,
              borderTopColor: theme.background,
              borderRadius: 20,
            }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: theme.background,
                paddingHorizontal: 30,
                paddingVertical: 50,
                borderRadius: 20,
              }}>
              <TextBase
                color={'#ffff'}
                text={title}
                lines={2}
                fontFamily="AirbnbCereal_W_Bd"
                size={20}
                style={{marginBottom: 12, textAlign: 'center'}}
              />
              {subtitle && (
                <TextBase
                  color={COLORS.dark.textMuted}
                  text={subtitle}
                  lines={3}
                  fontFamily="AirbnbCereal_W_Bk"
                  size={16}
                  style={{marginBottom: 28, textAlign: 'center'}}
                />
              )}
              <ButtonGradient
                text={confirmText}
                onPress={onConfirm}
                isLoading={isLoading}
                style={{marginBottom: 20}}
              />
              <ButtonSecundary text={cancelText} onPress={onCancel} />
            </View>
          </View>
        </AnimatedView>
      </View>
    </Modal>
  );
};
