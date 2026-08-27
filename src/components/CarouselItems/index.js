import React from 'react';
import {GrayCardBig} from '../Card/GrayRectangle/GrayRectangleBig';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faInbox} from '@fortawesome/free-solid-svg-icons';
import TextBase from '../Base/TextBase';
import {
  EmptyCardSmall,
  GrayCardSmall,
} from '../Card/GrayRectangle/GrayRectangleSmall';
import {View} from 'react-native';
import {COLORS} from '../../style/style';

export const CarouselItemSmallAdd = ({onPressEmptyCard, type, style}) => {
  return (
    <GrayCardSmall
      onPress={onPressEmptyCard}
      type={'champ'}
      style={[{marginRight: 20}, style]}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 18,
        }}>
        <FontAwesomeIcon
          icon={faPlus}
          size={30}
          color={COLORS.dark.primary}
          style={{marginBottom: 10}}
        />
        <TextBase
          text={`Agregar ${type}`}
          lines={2}
          size={16}
          color={'#ffff'}
          fontFamily="AirbnbCereal_W_Bk"
          style={{textAlign: 'center'}}
        />
      </View>
    </GrayCardSmall>
  );
};

export const CarouselItemSmallMore = ({handleAll}) => {
  return (
    <GrayCardSmall onPress={handleAll} style={{marginLeft: 20}}>
      <TextBase
        text={'Ver más'}
        lines={2}
        size={18}
        color={'#ffff'}
        fontFamily="AirbnbCereal_W_Bk"
        style={{textAlign: 'center'}}
      />
    </GrayCardSmall>
  );
};

export const CarouselItemBigAdd = ({
  onPressEmptyCard,
  type,
  screenWidth = false,
  style,
}) => (
  <GrayCardBig
    screenWidth={screenWidth}
    onPress={onPressEmptyCard}
    style={[{marginRight: 20}, style]}>
    <FontAwesomeIcon
      icon={faPlus}
      size={screenWidth ? 30 : 24}
      color={COLORS.dark.primary}
      style={{marginBottom: 10}}
    />
    <TextBase
      text={`Agregar ${type}`}
      lines={2}
      size={screenWidth ? 16 : 14}
      color={'#ffff'}
      fontFamily="AirbnbCereal_W_Bk"
      style={{textAlign: 'center'}}
    />
  </GrayCardBig>
);

export const CarouselItemBigMore = ({handleAll}) => {
  return (
    <GrayCardBig onPress={handleAll} style={{marginLeft: 20}}>
      <TextBase
        text={'Ver más'}
        lines={2}
        size={20}
        color={'#ffff'}
        fontFamily="AirbnbCereal_W_Bk"
        style={{textAlign: 'center'}}
      />
    </GrayCardBig>
  );
};

export const CarouselItemEmptySmall = ({type}) => {
  return (
    <EmptyCardSmall>
      <View style={{alignItems: 'center', paddingHorizontal: 16}}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: 'rgba(223, 72, 0, 0.15)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <FontAwesomeIcon
            icon={faInbox}
            size={28}
            color={COLORS.dark.primary}
          />
        </View>
        <TextBase
          text={`Aún no tenés ${type}`}
          lines={2}
          size={15}
          color={'#B8B8B8'}
          fontFamily="AirbnbCereal_W_Bk"
          style={{textAlign: 'center', marginBottom: 4}}
        />
        <TextBase
          text={'Pronto tu entrenador te asignará una'}
          lines={1}
          size={12}
          color={'#7A7A7A'}
          fontFamily="AirbnbCereal_W_Bk"
          style={{textAlign: 'center'}}
        />
      </View>
    </EmptyCardSmall>
  );
};
export const CarouselItemEmptyBig = ({type}) => {
  return (
    <GrayCardBig screenWidth>
      <View style={{alignItems: 'center', paddingHorizontal: 35}}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: 'rgba(223, 72, 0, 0.15)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <FontAwesomeIcon
            icon={faInbox}
            size={32}
            color={COLORS.dark.primary}
          />
        </View>
        <TextBase
          text={`Aún no tenés ${type}`}
          lines={2}
          size={17}
          color={'#B8B8B8'}
          fontFamily="AirbnbCereal_W_Bk"
          style={{textAlign: 'center', marginBottom: 6}}
        />
        <TextBase
          text={'Comenzá agregando uno'}
          lines={1}
          size={14}
          color={'#7A7A7A'}
          fontFamily="AirbnbCereal_W_Bk"
          style={{textAlign: 'center'}}
        />
      </View>
    </GrayCardBig>
  );
};

export const CarouselItemEmptyWithTextParameters = ({type, text, subText}) => {
  return (
    <GrayCardBig screenWidth>
      <View style={{alignItems: 'center', paddingHorizontal: 35}}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: 'rgba(223, 72, 0, 0.15)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <FontAwesomeIcon
            icon={faInbox}
            size={32}
            color={COLORS.dark.primary}
          />
        </View>
        <TextBase
          text={text || `Aún no tenés ${type}`}
          lines={2}
          size={17}
          color={'#B8B8B8'}
          fontFamily="AirbnbCereal_W_Bk"
          style={{textAlign: 'center', marginBottom: 6}}
        />
        <TextBase
          text={subText || 'Comenzá agregando uno'}
          lines={2}
          size={14}
          color={'#7A7A7A'}
          fontFamily="AirbnbCereal_W_Bk"
          style={{textAlign: 'center'}}
        />
      </View>
    </GrayCardBig>
  );
};
