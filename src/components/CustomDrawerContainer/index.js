import {View, Dimensions} from 'react-native';
import React from 'react';
import TopBar from '../../components/TopBar/TopBar';

// El drawer deslizable ahora lo maneja @react-navigation/drawer (ver
// UserDashboard.js / TrainerDashboard/index.js), no este componente. Esto
// solo pone el TopBar arriba del contenido de cada tab.
export function CustomDrawerContainer({children}) {
  return (
    <View
      style={{
        flex: 1,
        height: Dimensions.get('window').height,
      }}>
      <TopBar />
      {children}
    </View>
  );
}
