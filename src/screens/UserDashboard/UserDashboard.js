import {Platform, View} from 'react-native';
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  faBarsProgress,
  faDumbbell,
  faFire,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import LabelNav from '../../components/LabelNav/LabelNav';
import NavIcon from '../../components/LabelNav/NavIcon/NavIcon';
import Profile from '../Profile/Profile';
import DashboardUser from './Sections/DashboardUser';
import {COLORS} from '../../style/style';
// import Progress from '../Progress/Progress';
import RutinesChamp from '../Rutines/RutinesChamp';
import {DietsChamp} from '../Diets/DietsChamp';
import CustomDrawer from '../../components/Drawer/CustomDrawer';

function UserDashboardTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: COLORS.dark.background,
        paddingTop: Platform.OS === 'ios' ? 30 : 0,
      }}>
      <Tab.Navigator
        initialRouteName="DashboardUser"
        screenOptions={({route, navigation}) => ({
          header: () => null,
          tabBarStyle: {
            backgroundColor: COLORS.dark.backgroundDark,
            paddingVertical: 12,
            borderTopColor: 'transparent',
            borderWidth: 0,
            borderColor: 'transparent',
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 80,
          },
          tabBarIcon: ({size, focused}) => {
            if (route.name === 'Diets') {
              return <LabelNav size={size} focused={focused} icon={faFire} />;
            } else if (route.name === 'DashboardUser') {
              return <LabelNav size={size} focused={focused} icon={faHome} />;
            } else if (route.name === 'Rutines') {
              return (
                <LabelNav size={size} focused={focused} icon={faDumbbell} />
              );
            } else if (route.name === 'Progress') {
              return (
                <LabelNav size={size} focused={focused} icon={faBarsProgress} />
              );
            }
            return <LabelNav size={size} focused={focused} icon={faUser} />;
          },
          tabBarActiveTintColor: '#0000',
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
          name="DashboardUser"
          component={DashboardUser}
          options={{
            tabBarLabel: ({focused}) => <NavIcon focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Rutines"
          component={RutinesChamp}
          options={{
            tabBarLabel: ({focused}) => <NavIcon focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Diets"
          component={DietsChamp}
          options={{
            tabBarLabel: ({focused}) => <NavIcon focused={focused} />,
          }}
        />
        {/* <Tab.Screen
          name="Progress"
          component={Progress}
          options={{
            tabBarLabel: ({focused}) => <NavIcon focused={focused} />,
          }}
        /> */}
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            unmountOnBlur: true,
            tabBarLabel: ({focused}) => <NavIcon focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function UserDashboard() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {backgroundColor: COLORS.dark.background, width: '78%'},
        overlayColor: 'rgba(0,0,0,0.5)',
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="UserDashboardTabs" component={UserDashboardTabs} />
    </Drawer.Navigator>
  );
}
