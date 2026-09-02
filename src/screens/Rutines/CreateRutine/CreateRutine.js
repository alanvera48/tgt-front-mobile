import React from 'react';
import EditRutineLegacy from './EditRutineLegacy';
import CreateRutineWizard from './CreateRutineWizard';

export default function CreateRutine({navigation, route}) {
  if (route?.params?.rutine_id) {
    return <EditRutineLegacy navigation={navigation} route={route} />;
  }
  return <CreateRutineWizard navigation={navigation} route={route} />;
}
