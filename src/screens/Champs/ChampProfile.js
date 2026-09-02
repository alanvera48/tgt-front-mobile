import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TextBase from '../../components/Base/TextBase';
import {VStack} from '@gluestack-ui/themed';
import {COLORS} from '../../style/style';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPhone, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useGetMyChampById} from '../../hooks/user/queries';
import {Spinner} from '@gluestack-ui/themed';
import {Tabs} from '@gluestack-ui/themed';
import {PersonalInformationChampSection} from './PersonalInformationChampSection';
import {DietsAndRutinesChampSection} from './DietsAndRutinesChampSection';
import {TabItem} from '../../components/TabComponents';
import {useQueryClient} from '@tanstack/react-query';
import {DEVICE_WIDTH} from '../../constants';
import {BlurView} from '@react-native-community/blur';
import {useUnassignRutineMutation} from '../../hooks/rutines/queries';
import ChampProgressSeenByTrainer from '../ChampProgress/ChampProgressSeenByTrainer';

const {dark: theme} = COLORS;

export default function ChampProfile({route, navigation}) {
  const {isPending, data} = useGetMyChampById(route.params.champ_id);
  const queryClient = useQueryClient();

  const {
    mutateAsync: unassignRutineMutate,
    isPending: isPendingUnassignRutine,
  } = useUnassignRutineMutation();

  useEffect(() => {
    return () => {
      // Limpia la caché al desmontar
      queryClient.removeQueries({
        queryKey: ['myChamp', route.params.champ_id],
      });
    };
  }, [queryClient, route.params.champ_id]);

  if (isPending) {
    return (
      <VStack
        height={'100%'}
        justifyContent="center"
        alignItems="center"
        backgroundColor={COLORS.dark.background}>
        <Spinner size="large" color={COLORS.dark.textPrimary} />
      </VStack>
    );
  }

  return (
    <>
      {isPendingUnassignRutine && (
        <>
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9,
            }}
            blurType="dark"
            blurAmount={5}
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.6)"
          />
          <View
            style={{
              position: 'absolute',
              zIndex: 10,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        </>
      )}
      <View>
        <ScrollView style={{backgroundColor: COLORS.dark.background}}>
          <View>
            <Image
              source={
                data?.user?.imageUrl !== null
                  ? {uri: data?.user?.imageUrl}
                  : data?.user?.onboardingUser?.gender === 'FEMENINO'
                  ? require('../../assets/image/placeholder-female.png')
                  : require('../../assets/image/placeholder-male.png')
              }
              resizeMode="cover"
              alt="image-champ"
              style={styles.image}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttonBackContainer}
              onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faChevronLeft} size={25} color="#fff" />
            </TouchableOpacity>
          </View>
          <VStack>
            <View style={styles.infoHeader}>
              <View style={{width: '80%'}}>
                <TextBase
                  text={`${data?.user?.firstName} ${data?.user?.lastName}`}
                  size={24}
                  color={COLORS.dark.textWhite}
                  fontFamily="AirbnbCereal_W_Bd"
                />
                <TextBase
                  text={
                    [
                      data?.user?.onboardingUser?.city,
                      data?.user?.onboardingUser?.province,
                    ]
                      .filter(Boolean)
                      .join(', ') || 'Ubicación no disponible'
                  }
                  size={16}
                  lines={2}
                  color={COLORS.dark.textPrimary}
                  fontFamily="AirbnbCereal_W_Bk"
                />
              </View>
              <LinearGradient
                colors={[
                  COLORS.dark.primaryLight,
                  COLORS.dark.primary,
                  COLORS.dark.primaryDark,
                ]}
                style={{
                  marginHorizontal: 10,
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                  }}
                  onPress={() => {}}>
                  <FontAwesomeIcon
                    icon={faPhone}
                    size={24}
                    style={{color: COLORS.dark.textWhite}}
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </VStack>
          <Tabs value={'tab1'}>
            <Tabs.TabList
              style={{
                marginLeft: 20,
                width: DEVICE_WIDTH - 40,
                justifyContent: 'space-between',
              }}>
              <TabItem value="tab1" label="Perfil" />
              <TabItem
                value="tab2"
                label="Chequeos"
                display={
                  data?.user?.onboardingFinished !== null && data?.enabled
                    ? 'flex'
                    : 'none'
                }
              />
              <TabItem
                value="tab3"
                display={
                  data?.user?.onboardingFinished !== null && data?.enabled
                    ? 'flex'
                    : 'none'
                }
                label="Dietas y Rutinas"
              />
            </Tabs.TabList>

            <Tabs.TabPanels>
              <Tabs.TabPanel value="tab1">
                <PersonalInformationChampSection route={route} data={data} />
              </Tabs.TabPanel>
              <Tabs.TabPanel value="tab2">
                <ChampProgressSeenByTrainer champ_id={route.params.champ_id} />
              </Tabs.TabPanel>
              <Tabs.TabPanel value="tab3">
                <DietsAndRutinesChampSection
                  data={data}
                  champ_id={route.params.champ_id}
                  unassignRutineMutate={unassignRutineMutate}
                />
              </Tabs.TabPanel>
            </Tabs.TabPanels>
          </Tabs>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    flex: 1,
    flexGrow: 1,
    height: 500,
    width: '100%',
  },
  contentContainer: {
    backgroundColor: COLORS.dark.backgroundLight,
    padding: 10,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: 300,
  },
  infoHeader: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 24,
  },
  buttonBackContainer: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#3A3A3C',
    padding: 5,
    top: 80,
    left: 20,
    borderRadius: 100,
  },
});
