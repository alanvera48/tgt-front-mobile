import React from 'react';
import InDashboard from '../../../layouts/InDashboard';
import {View} from 'react-native';
import {DEVICE_HEIGHT} from '../../../constants';
import {ComingSoonEmptyState} from '../../../components/EmptyState';

export const Finished = () => {
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
