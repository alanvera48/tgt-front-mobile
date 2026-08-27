import React from 'react';
import {UserContextProvider} from './UserProvider';

export const UserLogic = props => {
  const {children} = props;
  const [onboardingChamp, setOnboardingChamp] = React.useState({
    // General Screen fields
    gender: 'HOMBRE',
    height: 150,
    weight: 50,
    bodyFat: 1,
    activityLevel: 'Intermedio',
    dietsPreferences: null,
    goal: 'Tonificar',
    foodPerDay: null,
    otherConsiderations: null,
    experienceLevel: 'PRINCIPIANTE',
    placeToTrain: null,
    lastInjuries: null,
    isOnline: false,
    trainPerWeek: null,
    trainDuration: null,
    // GeneralSecondPart Screen fields
    mobileNumber: null,
    city: null,
    address: null,
    apartment: null,
    zipCode: null,
    province: null,
    role: 'CHAMP',
  });

  const [onboardingTrainer, setOnboardingTrainer] = React.useState({
    gender: 'HOMBRE',
    dateBirth: null,
    isOnline: false,
    mobileNumber: null,
    city: null,
    address: null,
    floor: null,
    apartment: null,
    zipCode: null,
    province: null,
    specialty: null,
    yearsOfExperience: null,
    role: 'TRAINER',
  });

  const handleOnboardingChamp = (key, value) => {
    setOnboardingChamp({...onboardingChamp, [key]: value});
  };

  const handleOnboardingChampValues = values => {
    setOnboardingChamp({...onboardingChamp, ...values});
  };

  const handleOnboardingTrainer = (key, value) => {
    setOnboardingTrainer({...onboardingTrainer, [key]: value});
  };

  const handleOnboardingTrainerValues = values => {
    setOnboardingTrainer({...onboardingTrainer, ...values});
  };

  return (
    <UserContextProvider
      handleOnboardingChamp={handleOnboardingChamp}
      handleOnboardingChampValues={handleOnboardingChampValues}
      onboardingChamp={onboardingChamp}
      handleOnboardingTrainer={handleOnboardingTrainer}
      handleOnboardingTrainerValues={handleOnboardingTrainerValues}
      onboardingTrainer={onboardingTrainer}>
      {children}
    </UserContextProvider>
  );
};
