import React from 'react';
import {View} from 'react-native';
import {Tabs} from '@gluestack-ui/themed';
import {COLORS} from '../../style/style';

export const TabList = ({children}) => {
  return (
    <Tabs.TabList
      style={{
        backgroundColor: COLORS.dark.background,
        marginBottom: 12,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
      }}>
      {children}
    </Tabs.TabList>
  );
};

export const TabItem = ({value, label, display, badge}) => {
  return (
    <Tabs.Tab
      value={value}
      display={display || 'flex'}
      $active-borderBottomColor={COLORS.dark.primary}
      $active-borderBottomWidth={4}
      $active-borderBottomEndRadius={0}
      $active-borderBottomStartRadius={0}
      marginHorizontal={4}
      paddingHorizontal={8}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Tabs.TabTitle
          fontFamily="AirbnbCereal_W_Bk"
          color="#ffff"
          fontSize={15}>
          {label}
        </Tabs.TabTitle>
        {!!badge && (
          <View
            style={{
              marginLeft: 6,
              minWidth: 20,
              height: 20,
              borderRadius: 10,
              paddingHorizontal: 5,
              backgroundColor: COLORS.dark.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Tabs.TabTitle
              fontFamily="AirbnbCereal_W_Bd"
              color="#fff"
              fontSize={12}>
              {badge}
            </Tabs.TabTitle>
          </View>
        )}
      </View>
    </Tabs.Tab>
  );
};
