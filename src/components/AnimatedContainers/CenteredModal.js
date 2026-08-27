import React from 'react';
import {Modal, View, TouchableOpacity, ScrollView} from 'react-native';
import {COLORS} from '../../style/style';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

export const CenteredModal = ({isVisible, setIsVisible, children}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT,
          display: isVisible ? 'flex' : 'none',
          zIndex: 1,
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        style={{
          width: '100%',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
              paddingTop: 80,
              paddingBottom: 30,
              borderRadius: 10,
              backgroundColor: COLORS.dark.background,
              maxWidth: DEVICE_WIDTH - 10,
            }}>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={{position: 'absolute', top: 20, right: 20}}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.dark.backgroundInput,
                  padding: 5,
                  marginBottom: 30,
                }}>
                <FontAwesomeIcon icon={faTimes} size={24} color="white" />
              </View>
            </TouchableOpacity>
            <ScrollView
              style={{maxHeight: 300}}
              contentContainerStyle={{alignItems: 'center'}}>
              {children}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};
