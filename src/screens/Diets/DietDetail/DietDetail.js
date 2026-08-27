import {
  Animated,
  Dimensions,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
// import {DrawerContentScrollView} from '@react-navigation/drawer';
import Hero from '../../../components/Hero/Hero';
import InDashboard from '../../../layouts/InDashboard';
import TextBase from '../../../components/Base/TextBase';
import Collapsible from '../../../components/Collapsible/Collapsible';
import {useGetDietChampsByDietId} from '../../../hooks/diets/queries';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import {COLORS} from '../../../style/style';
import {useGetShoppingListDietById} from '../../../hooks/diets/queries';
import {useAuthStore} from '../../../store/authStore';
import {EditButton} from '../../../components/EditButton';
import {getBadgeConfig} from '../../Rutines/RutineDetail/RutineDetail';
import InfoBadge from '../../../components/Badge/InfoBadge';
import {getExpirationStatus} from '../../../utils/rutines';

const screenWidth = Dimensions.get('window').width;
const drawerWidth = screenWidth * 0.75;

export default function DietDetail({route, navigation}) {
  const userInfo = useAuthStore(state => state.userInfo);
  const {data, isPending} = useGetDietChampsByDietId(route.params.id);
  const {data: shoppingListData} = useGetShoppingListDietById(route.params.id);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-drawerWidth)).current;

  const expirationStatus = getExpirationStatus(data?.alert);

  const badgeConfig = getBadgeConfig('dieta', expirationStatus);

  const handleDietEditScreen = () => {
    navigation.navigate('CreateDiet', {
      diet_id: route.params.id,
    });
  };

  // PanResponder para detectar el deslizamiento
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) =>
      Math.abs(gestureState.dx) > 20,
    onPanResponderMove: (evt, gestureState) => {
      // Deslizar hacia la derecha para abrir y hacia la izquierda para cerrar
      if (gestureState.dx > 0) {
        slideAnim.setValue(gestureState.dx - drawerWidth);
      } else if (isDrawerOpen) {
        slideAnim.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50) {
        openDrawer();
      } else if (gestureState.dx < -50) {
        closeDrawer();
      } else {
        // Si el deslizamiento es insuficiente en cualquier dirección, vuelve a la posición actual
        isDrawerOpen ? openDrawer() : closeDrawer();
      }
    },
  });

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -drawerWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  if (isPending) {
    return <LoadingScreen backgroundColor={COLORS.dark.background} />;
  }

  return (
    <View
      style={{
        flex: 1,
        height: Dimensions.get('window').height,
      }}
      {...panResponder.panHandlers}>
      <Animated.View
        style={[styles.drawer, {transform: [{translateX: slideAnim}]}]}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: COLORS.dark.background,
            paddingTop: 60,
            paddingBottom: 40,
          }}>
          {/* <DrawerContentScrollView style={{paddingHorizontal: 30}}>
            <TextBase
              text={'Lista de compras'}
              color={'#fff'}
              size={24}
              lines={3}
              fontFamily={'AirbnbCereal_W_Bd'}
              style={{marginTop: 20, marginBottom: 20}}
            />
            {shoppingListData?.map(item => {
              return (
                <View style={{marginBottom: 20}}>
                  <TextBase
                    text={`${item.foodName}`}
                    color={'#fff'}
                    size={16}
                    lines={3}
                    fontFamily={'AirbnbCereal_W_Bk'}
                  />
                  <TextBase
                    text={`Cantidad: ${item.quantity} grs.`}
                    color={'#fff'}
                    size={16}
                    lines={3}
                    fontFamily={'AirbnbCereal_W_Bk'}
                  />
                </View>
              );
            })}
          </DrawerContentScrollView> */}
        </SafeAreaView>
      </Animated.View>
      <InDashboard>
        <View style={{paddingTop: 0, paddingHorizontal: 20, paddingBottom: 30}}>
          <View style={{position: 'absolute', top: 20, right: 30, zIndex: 2}}>
            {userInfo.role === 'TRAINER' && (
              <EditButton onPress={handleDietEditScreen} />
            )}
          </View>
          <Hero item={data.diet} />
          {badgeConfig && (
            <View style={{marginTop: 10, marginBottom: 20}}>
              <InfoBadge
                message={badgeConfig.message}
                color={badgeConfig.color}
              />
            </View>
          )}
          <TextBase
            text={'Descripción'}
            color={'#fff'}
            fontFamily={'AirbnbCereal_W_Bd'}
            style={{marginBottom: 2}}
          />
          <TextBase
            text={data?.diet?.description}
            fontFamily={'AirbnbCereal_W_Bk'}
            lines={3}
            color={'#747688'}
            style={{marginBottom: 10}}
          />
          <TextBase
            text={'Duración'}
            color={'#fff'}
            fontFamily={'AirbnbCereal_W_Bd'}
            style={{marginBottom: 2}}
          />
          <TextBase
            text={data?.diet?.duration}
            fontFamily={'AirbnbCereal_W_Bk'}
            lines={3}
            color={'#747688'}
          />
          <TextBase
            text={'Comidas del día'}
            color={'#fff'}
            fontFamily={'AirbnbCereal_W_Bd'}
            style={{marginVertical: 20}}
          />
          <Collapsible meals={data?.diet?.meals} />
          {/* <View style={{alignItems: 'center', marginVertical: 40}}>
            <ButtonSecundary
              onPress={() => openDrawer()}
              text={'Mostrar lista de compras'}
            />
          </View> */}
        </View>
      </InDashboard>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    left: 0,
    top: -40,
    bottom: 0,
    width: drawerWidth,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 99999,
    height: Dimensions.get('window').height,
  },
  drawerText: {
    fontSize: 18,
    marginVertical: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 20,
    marginVertical: 10,
  },
});
