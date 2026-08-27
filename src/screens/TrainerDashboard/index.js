import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DashboardTrainer from '../DashboardTrainer';

import {
  faCrown,
  faDumbbell,
  faFire,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import LabelNav from '../../components/LabelNav/LabelNav';
import NavIcon from '../../components/LabelNav/NavIcon/NavIcon';
import Rutines from '../Rutines/RutinesTrainer';
import Profile from '../Profile/Profile';
import MyChamps from '../MyChamps/MyChamps';
import CreateChamp from '../Champs/CreateChamp';
import {COLORS} from '../../style/style';
import {DietsTrainer} from '../Diets/DietsTrainer/index';
import {GoBackArrow} from '../../components/GoBackArrow';

const Stack = createNativeStackNavigator();

function ChampsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <Stack.Screen
        name="Champs"
        component={MyChamps}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({focused}) => <NavIcon focused={focused} />,
        }}
      />
      <Stack.Screen
        name="CreateChamp"
        component={CreateChamp}
        options={() => ({
          headerShown: true,
          headerTitle: 'Crear Champ',
          headerLeftLabelVisible: false,
          headerTintColor: '#ffff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.dark.background,
          },
          headerLeft: () => <GoBackArrow />,
        })}
      />
    </Stack.Navigator>
  );
}

export default function TrainerDashboard() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      initialRouteName="Home"
      screenOptions={({route}) => ({
        header: () => null,
        tabBarStyle: {
          paddingVertical: 20,
          borderTopColor: 'transparent',
          borderWidth: 0,
          borderColor: 'transparent',
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 80,
          backgroundColor: COLORS.dark.backgroundDark,
        },
        tabBarIcon: ({size, focused}) => {
          if (route.name === 'Diets') {
            return <LabelNav size={size} focused={focused} icon={faFire} />;
          } else if (route.name === 'Home') {
            return <LabelNav size={size} focused={focused} icon={faHome} />;
          } else if (route.name === 'Rutines') {
            return <LabelNav size={size} focused={focused} icon={faDumbbell} />;
          } else if (route.name === 'ChampsStack') {
            return <LabelNav size={size} focused={focused} icon={faCrown} />;
          }
          return <LabelNav size={size} focused={focused} icon={faUser} />;
        },
        tabBarItemStyle: {
          borderRadius: 8,
          height: 60,
          paddingVertical: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '700',
          textAlign: 'center',
        },
      })}>
      <Tab.Screen
        name="Rutines"
        component={Rutines}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({focused}) => <NavIcon focused={focused} />,
        }}
      />

      <Tab.Screen
        name="Diets"
        component={DietsTrainer}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({focused}) => <NavIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={DashboardTrainer}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({focused}) => <NavIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ChampsStack"
        component={ChampsStackNavigator}
        options={({route}) => ({
          unmountOnBlur: true,
          headerShown: route.name !== 'ChampsStack',
          tabBarLabel: ({focused}) => <NavIcon focused={focused} />,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({focused}) => <NavIcon focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
