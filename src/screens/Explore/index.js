import React from 'react';
import MapExplore from './MapExplore';
import GymList from './GymList';
import {Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import TrainerList from './TrainerList';
import TrainerInfo from './TrainerInfo';
import Reviews from './Reviews';
import Explore from './Explore';
import {COLORS} from '../../style/style';

const ExploreStack = ({route}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="MapExplore"
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        drawerPosition: 'right',
        drawerWidth: Dimensions.get('window').width * 0.75,
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: COLORS.dark.primary,
        drawerInactiveTintColor: '#ffff',
        drawerLabelStyle: {
          fontFamily: 'AirbnbCereal_W_Bk',
          fontSize: 16,
        },
        drawerStyle: {
          width: '90%',
        },
      }}>
      <Stack.Screen name="MapExplore" component={MapExplore} />
      <Stack.Screen name="GymList" component={GymList} />
      <Stack.Screen name="TrainerList" component={TrainerList} />
      <Stack.Screen name="TrainerInfo" component={TrainerInfo} />
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={{
          headerLeft: null,
        }}
      />
      <Stack.Screen name="Explore" component={Explore} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
