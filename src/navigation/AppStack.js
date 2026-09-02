import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import DietDetail from '../screens/Diets/DietDetail/DietDetail';
import RutineDetail from '../screens/Rutines/RutineDetail/RutineDetail';
import {useAuthStore} from '../store/authStore';
import ChampProfile from '../screens/Champs/ChampProfile';
import ExploreStack from '../screens/Explore';
import CreateRutine from '../screens/Rutines/CreateRutine/CreateRutine';
import OnboardingChamp from '../screens/Onboarding/OnboardingChamp';
import CreateDiet from '../screens/Diets/CreateDiet/CreateDiet';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../style/style';
import Subscriptions from '../screens/Subscriptions';
import SelectSubscription from '../screens/SelectSubscription';
import AssignRutine from '../screens/Rutines/AssignRutine';
import TermsAndConditions from '../screens/TermsAndConditions';
import Help from '../screens/Help';
import OnboardingTrainer from '../screens/Onboarding/OnboardingTrainer';
import TrainerInfo from '../screens/Explore/TrainerInfo';
import StartRutine from '../screens/Rutines/StartRutine';
import TrainerDashboard from '../screens/TrainerDashboard';
import UserDashboard from '../screens/UserDashboard/UserDashboard';
import AssignDiet from '../screens/Diets/AssignDiet';
import CreateChamp from '../screens/Champs/CreateChamp';
import {GoBackArrow} from '../components/GoBackArrow';
import {TrainerFeedbackForm} from '../screens/Explore/TrainerFeedbackForm';
import Reviews from '../screens/Explore/Reviews';
import UserProfile from '../screens/Profile/UserProfile';
import UserAddress from '../screens/Profile/UserAddress';
import SelectGym from '../screens/Onboarding/Sections/SelectGym';
import UserGym from '../screens/Profile/UserGym';
import RoutineSummary from '../screens/Rutines/RoutineSummary';
import FloatingTimerBubble from '../components/FloatingTimerBubble';
import CountdownScreen from '../screens/Rutines/CountdownScreen';
import LogIn from '../screens/LogIn';
import FeedList from '../screens/Feed/FeedList';
import PostDetail from '../screens/Feed/PostDetail';

const AppStack = () => {
  const Stack = createStackNavigator();
  const userInfo = useAuthStore(state => state.userInfo);
  const isChamp = userInfo?.role === 'CHAMP';
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Stack.Navigator
        detachInactiveScreens={false}
        initialRouteName={isChamp ? 'UserDashboard' : 'TrainerDashboard'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="TrainerDashboard"
          component={TrainerDashboard}
          options={{headerTitle: ''}}
        />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="ExploreStack" component={ExploreStack} />

        <Stack.Screen name="OnboardingChamp" component={OnboardingChamp} />
        <Stack.Screen name="TrainerOnboarding" component={OnboardingTrainer} />
        <Stack.Screen
          name="CreateRutine"
          component={CreateRutine}
          options={({route}) => ({
            headerShown: true,
            headerTintColor: COLORS.dark.textWhite,
            headerTitle: `${
              route?.params?.rutine_id ? 'Editar' : 'Crear'
            } Rutina`,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: COLORS.dark.background,
              shadowColor: 'transparent',
              height: 90,
            },
            headerLeft: () => <GoBackArrow />,
          })}
        />
        <Stack.Screen
          name="AssignRutine"
          component={AssignRutine}
          options={() => ({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Asignar Rutina',
            headerLeftLabelVisible: false,
            headerTintColor: '#ffff',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon
                  size={24}
                  icon={faChevronLeft}
                  style={{marginLeft: 20}}
                  color="#fff"
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="StartRutine" component={StartRutine} />
        <Stack.Screen
          name="RoutineSummary"
          component={RoutineSummary}
          options={() => ({
            headerShown: false,
            gestureEnabled: false,
          })}
        />
        <Stack.Screen name="TrainerInfo" component={TrainerInfo} />
        <Stack.Screen name="Reviews" component={Reviews} />
        <Stack.Screen
          name="TrainerFeedbackForm"
          component={TrainerFeedbackForm}
        />
        <Stack.Screen
          name="DietDetail"
          component={DietDetail}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: 'Plan de alimentación',
            headerLeftLabelVisible: false,
            headerTintColor: '#ffff',
            headerStyle: {
              backgroundColor: COLORS.dark.background,
              height: 80,
              shadowColor: 'transparent',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() => navigation.goBack()}>
                <FontAwesomeIcon
                  size={24}
                  icon={faChevronLeft}
                  style={{marginLeft: 10}}
                  color="#fff"
                />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="RutineDetail"
          component={RutineDetail}
          options={() => ({
            headerTransparent: true,
            headerTitle: '',
            headerLeftLabelVisible: false,
            headerTintColor: '#ffff',
            headerStyle: {
              height: 80,
            },
          })}
        />

        <Stack.Screen name="CountdownScreen" component={CountdownScreen} />

        <Stack.Screen
          name="CreateDiet"
          component={CreateDiet}
          options={({route}) => ({
            headerShown: true,
            headerTitle: `${
              route?.params?.diet_id ? 'Actualizar' : 'Crear'
            } Dieta`,
            headerLeftLabelVisible: false,
            headerTintColor: '#ffff',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: COLORS.dark.background,
              shadowColor: 'transparent',
              height: 90,
            },
            headerLeft: () => <GoBackArrow />,
          })}
        />
        <Stack.Screen
          name="AssignDiet"
          component={AssignDiet}
          options={() => ({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Asignar Dieta',
            headerLeftLabelVisible: false,
            headerTintColor: '#ffff',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: COLORS.dark.background,
              shadowColor: 'transparent',
              height: 90,
            },
            headerLeft: () => <GoBackArrow />,
          })}
        />
        <Stack.Screen
          name="ChampProfile"
          component={ChampProfile}
          options={() => ({
            headerShown: false,
            headerTransparent: true,
            headerTitle: '',
            headerLeftLabelVisible: false,
            headerTintColor: '#ffff',
          })}
          unmountOnBlur={true}
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
              shadowColor: 'transparent',
              height: 90,
            },
            headerLeft: () => <GoBackArrow />,
          })}
        />
        <Stack.Screen
          name="Subscriptions"
          component={Subscriptions}
          options={() => ({
            headerShown: false,
            headerTransparent: true,
            headerTitle: '',
            headerLeftLabelVisible: false,
            headerTintColor: '#ffff',
          })}
        />
        <Stack.Screen
          name="SelectSubscription"
          component={SelectSubscription}
          options={() => ({
            headerShown: false,
            headerTransparent: true,
            headerTitle: '',
            headerLeftLabelVisible: false,
            headerTintColor: '#ffff',
          })}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
          options={() => ({
            headerShown: false,
            headerTransparent: true,
            headerTitle: '',
            headerLeftLabelVisible: false,
            headerTintColor: '#ffff',
          })}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={() => ({
            headerShown: false,
            headerTransparent: true,
            headerTitle: '',
            headerLeftLabelVisible: false,
            headerTintColor: '#ffff',
          })}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserAddress"
          component={UserAddress}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="SelectGym" component={SelectGym} />
        <Stack.Screen
          name="UserGym"
          component={UserGym}
          options={{
            headerShown: false,
          }}
        />

        {/* TODO: Fulero poner el LoginScreen en este stack, pero soluciona el error cuando invitamos a un champ  */}
        {/* siendo trainer y despues de que ese champ completó el onboarding y desde su dashboard pone cerrar sesion, en vez de ir al login va al onboarding champ */}
        {/* estaria genial solucionarlo bien */}
        <Stack.Screen
          name="FeedList"
          component={FeedList}
          options={() => ({
            headerShown: true,
            headerTitle: 'Publicaciones',
            headerTintColor: COLORS.dark.textWhite,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: COLORS.dark.background,
              shadowColor: 'transparent',
              height: 90,
            },
            headerLeft: () => <GoBackArrow />,
          })}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
          options={() => ({
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: COLORS.dark.textWhite,
            headerLeft: () => <GoBackArrow />,
          })}
        />
        <Stack.Screen name="LoginScreen" component={LogIn} />
      </Stack.Navigator>
      <FloatingTimerBubble />
    </View>
  );
};

export default AppStack;
