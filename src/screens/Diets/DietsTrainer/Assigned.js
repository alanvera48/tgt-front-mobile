import React from 'react';
import InDashboard from '../../../layouts/InDashboard';
import {Text} from '@gluestack-ui/themed';
import {View, Dimensions} from 'react-native';

export const Assigned = () => {
  return (
    <InDashboard>
      <View
        style={{
          flex: 1,
          height: Dimensions.get('window').height - 220,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff'}}>Disponible Próximamente!</Text>
      </View>
    </InDashboard>
  );
};
