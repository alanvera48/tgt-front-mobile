import {Platform, View, Dimensions, Modal, Pressable} from 'react-native';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import React, {useState, useRef} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';
import TopBar from '../../components/TopBar/TopBar';
const IS_IOS = Platform.OS === 'ios';

const screenWidth = Dimensions.get('window').width;
const drawerWidth = screenWidth * 0.75;

export function CustomDrawerContainer({children}) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-drawerWidth)).current;

  // PanResponder para detectar el deslizamiento
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      if (!isDrawerOpen) return;
      return Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx < -5 && isDrawerOpen) {
        slideAnim.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (!isDrawerOpen) return;
      if (gestureState.dx < -50) {
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

  return (
    <View
      style={{
        flex: 1,
        height: Dimensions.get('window').height,
      }}>
      <TopBar openDrawer={openDrawer} />
      {children}

      <Modal
        visible={isDrawerOpen}
        transparent
        animationType="none"
        onRequestClose={closeDrawer}>
        <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers}>
          <Pressable
            style={styles.backdrop}
            onPress={closeDrawer}
            accessibilityLabel="Cerrar menú"
          />
          <Animated.View
            style={[styles.drawer, {transform: [{translateX: slideAnim}]}]}>
            <CustomDrawer closeDrawer={closeDrawer} />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
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
    paddingTop: IS_IOS ? 60 : 0,
    paddingBottom: IS_IOS ? 20 : 0,
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
