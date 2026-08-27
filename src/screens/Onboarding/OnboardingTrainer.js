import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GeneralTrainer from './Sections/GeneralTrainer';
import SelectGym from './Sections/SelectGym';
import TrainerOnboarding from '../SignUp/TrainerOnboarding/TrainerOnboarding';
import CreateChamp from '../Champs/CreateChamp';
import {COLORS} from '../../style/style';
import {GoBackArrow} from '../../components/GoBackArrow';

const Stack = createNativeStackNavigator();

const OnboardingTrainer = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="GeneralTrainer">
      <Stack.Screen name="GeneralTrainer" component={GeneralTrainer} />
      <Stack.Screen name="SelectGym" component={SelectGym} />
      <Stack.Screen name="WelcomeTrainer" component={TrainerOnboarding} />
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
};

export default OnboardingTrainer;
