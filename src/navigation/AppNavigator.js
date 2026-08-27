import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import FloatingTimerBubble from '../components/FloatingTimerBubble';
// import RoutineSummary from '../screens/Rutines/RoutineSummary';

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="StartRutine" component={StartRutine} />
//       <Stack.Screen name="RoutineSummary" component={RoutineSummary} />
//     </Stack.Navigator>
//   );
// };

// Componente de navegación que envuelve toda la app y proporciona el bubble flotante global
const AppNavigatorWithFloatingTimer = ({children}) => {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>{children}</NavigationContainer>
      <FloatingTimerBubble />
    </View>
  );
};

export default AppNavigatorWithFloatingTimer;
