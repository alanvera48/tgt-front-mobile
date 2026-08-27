import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from '../screens/LogIn';
import CompleteRegistration from '../screens/LogIn/CompleteRegistration';
import VerifyAccount from '../screens/LogIn/VerifyAccount';

import OnboardingMain from '../screens/Onboarding/OnboardingMain';
import SignUp from '../screens/SignUp/SignUp';
import OnboardingChamp from '../screens/Onboarding/OnboardingChamp';
import OnboardingTrainer from '../screens/Onboarding/OnboardingTrainer';
import {useAuthStore} from '../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import {useNavigation} from '@react-navigation/native';
import Onboarding from '../screens/Onboarding';
import ResetNewPassword from '../screens/LogIn/ResetNewPassword';
import ForgotPassword from '../screens/LogIn/ForgotPassword';
import VerificationCode from '../screens/LogIn/VerificationCode';
import TrainerPlans from '../screens/SignUp/TrainerPlans';
import PaymentMethod from '../screens/SignUp/PaymentMethod';
import {COLORS} from '../style/style';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const [initialRoute, setInitialRoute] = useState('LoginScreen');
  const {verifyToken, isFirstTime} = useAuthStore(
    useShallow(state => ({
      verifyToken: state.verifyToken,
      isFirstTime: state.isFirstTime,
    })),
  );
  const navigation = useNavigation();

  useEffect(() => {
    if (verifyToken) {
      navigation.reset({
        index: 0,
        routes: [{name: 'VerifyAccount'}],
      });
    }
  }, [verifyToken, navigation]);

  // const initialRoute =
  //   isFirstTime === 'true' ? 'OnboardingMain' : 'LoginScreen';

  useEffect(() => {
    if (isFirstTime) {
      setInitialRoute('OnboardingMain');
    }
  }, [isFirstTime]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRoute}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OnboardingMain" component={OnboardingMain} />
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false,
          headerTitle: '',
          headerLeftContainerStyle: {
            color: 'black',
          },
          headerStyle: {
            backgroundColor: COLORS.dark.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Stack.Screen name="LoginScreen" component={LogIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="ResetNewPassword" component={ResetNewPassword} />
      <Stack.Screen
        name="CompleteRegistration"
        component={CompleteRegistration}
      />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
      <Stack.Screen name="OnboardingChamp" component={OnboardingChamp} />
      <Stack.Screen name="OnboardingTrainer" component={OnboardingTrainer} />
      <Stack.Screen name="TrainerPlans" component={TrainerPlans} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
    </Stack.Navigator>
  );
}
