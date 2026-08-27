import React from 'react';
import {View} from 'react-native';
import InDashboard from '../../../layouts/InDashboard';
import {DEVICE_HEIGHT} from '../../../constants';
import {ComingSoonEmptyState} from '../../../components/EmptyState/ComingSoonEmptyState';

export const Foods = () => {
  return (
    <InDashboard>
      <View
        style={{
          flex: 1,
          height: DEVICE_HEIGHT - 220,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ComingSoonEmptyState />
      </View>
    </InDashboard>
  );
};
