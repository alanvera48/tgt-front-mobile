import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Gender from './Sections/Gender';
import Weight from './Sections/Weight';
import Height from './Sections/Height';
import Goal from './Sections/Goal';
import ActivityLevel from './Sections/ActivityLevel';
import ExperienceLevel from './Sections/ExperienceLevel';
import General from './Sections/General';
import GeneralSecondPart from './Sections/GeneralSecondPart';

const Stack = createNativeStackNavigator();

const OnboardingChamp = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Gender">
      <Stack.Screen name="Gender" component={Gender} />
      <Stack.Screen name="Weight" component={Weight} />
      <Stack.Screen name="Height" component={Height} />
      <Stack.Screen name="Goal" component={Goal} />
      <Stack.Screen name="ExperienceLevel" component={ExperienceLevel} />
      <Stack.Screen name="ActivityLevel" component={ActivityLevel} />
      <Stack.Screen name="General" component={General} />
      <Stack.Screen name="GeneralSecondPart" component={GeneralSecondPart} />
    </Stack.Navigator>
  );
};

export default OnboardingChamp;
