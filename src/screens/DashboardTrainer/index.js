import {TouchableOpacity, View, Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight, faDumbbell} from '@fortawesome/free-solid-svg-icons';
import ListHorizontal from '../../components/ListHorizontal/ListHorizontal';
import TextBase from '../../components/Base/TextBase';
import {useGetMyRutines} from '../../hooks/rutines/queries';
import {useGetMyChamps} from '../../hooks/user/queries';

import {CARDS} from '../../constants/newTgtVideos';
import {formatData} from '../../utils/flatListUtil';
import {CardImage} from '../../components/CardImage/CardImage';
import React from 'react';
import {CustomDrawerContainer} from '../../components/CustomDrawerContainer';
import InDashboard from '../../layouts/InDashboard';
import {useGetDietsCreatedByTrainer} from '../../hooks/diets/queries';
import Card from '../../components/Card/Card';
import CardDiets from '../../components/Card/CardDiets/CardDiets';
import CardChamps from '../../components/Card/CardChamps/CardChamps';
import {
  CarouselItemSmallMore,
  CarouselItemBigAdd,
  CarouselItemBigMore,
  CarouselItemEmptySmall,
  CarouselItemSmallAdd,
} from '../../components/CarouselItems';
import {FlatListHorizontal} from '../../components/FlatListHorizontal';
import {COLORS} from '../../style/style';

export default function DashboardTrainer({navigation}) {
  const {
    data: rutines,
    refetch: refetchRutines,
    isRefetching: isRefetchingRutines,
  } = useGetMyRutines();
  const {
    data: champs,
    refetch: refetchChamps,
    isRefetching: isRefetchingChamps,
  } = useGetMyChamps();

  const {
    data: diets,
    refetch: refetchDiets,
    isPending: isPendingDiets,
  } = useGetDietsCreatedByTrainer();

  const navigateToAllChamps = () => navigation.navigate('ChampsStack');

  const navigateToAllRutines = () => {
    navigation.navigate('Rutines', {
      activeTab: 'tab2',
    });
  };

  const navigateToExerciseBank = () => {
    navigation.navigate('Rutines', {
      activeTab: 'tab3',
    });
  };

  const navigateToAllDiets = () =>
    navigation.navigate('Diets', {
      activeTab: 'tab2',
    });

  const navigateToRutineDetail = id => {
    navigation.navigate('RutineDetail', {
      id,
    });
  };

  const navigateToDietDetail = id => {
    navigation.navigate('DietDetail', {
      id,
    });
  };

  const renderPlusCard = (type, CreateScreen) => (
    <View style={{paddingLeft: 20}}>
      <CarouselItemBigAdd
        screenWidth
        type={type}
        onPressEmptyCard={() => navigation.navigate(CreateScreen)}
      />
    </View>
  );

  return (
    <CustomDrawerContainer>
      <InDashboard
        containerStyle={{
          paddingHorizontal: 0,
        }}
        isRefetching={
          isRefetchingRutines || isRefetchingChamps || isPendingDiets
        }
        onRefresh={() => {
          refetchRutines();
          refetchChamps();
          refetchDiets();
        }}>
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: COLORS.dark.textMuted,
            borderRadius: 10,
          }}>
          {/* <InputSearch /> */}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={navigateToExerciseBank}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginTop: 16,
            padding: 14,
            borderRadius: 14,
            backgroundColor: COLORS.dark.backgroundCard,
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              marginRight: 12,
              backgroundColor: COLORS.dark.backgroundElevated,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon={faDumbbell}
              color={COLORS.dark.primary}
              size={18}
            />
          </View>
          <View style={{flex: 1}}>
            <TextBase
              text={'Mis ejercicios'}
              size={14}
              color={'#fff'}
              fontFamily="AirbnbCereal_W_Bd"
            />
            <TextBase
              text={'Ejercicios que ya cargaste, listos para reutilizar'}
              size={12}
              lines={2}
              color={COLORS.dark.textMuted}
              style={{marginTop: 2}}
            />
          </View>
          <FontAwesomeIcon
            icon={faChevronRight}
            color={COLORS.dark.textMuted}
            size={16}
          />
        </TouchableOpacity>

        <ListHorizontal
          // TODO: deshabiltado temporalmente
          // showBrowseAll={CARDS?.length > 0}
          title={'Lo nuevo de TGT'}
          handleToAll={() => console.log('Ir a todo lo nuevo de TGT')}>
          <FlatListHorizontal
            data={formatData(CARDS, 3)}
            renderEmptyComponent={() => (
              <CarouselItemEmptySmall type="dieta" navigation={navigation} />
            )}
            renderItem={({item, index}) => {
              if (item.empty === true) {
                return (
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      flex: 1,
                      padding: 0,
                      height: Dimensions.get('window').width / 2,
                    }}
                  />
                );
              } else {
                return (
                  <CardImage
                    title={item.title}
                    subtitle={item.subtitle}
                    image={item.image}
                    disabled={item.disabled}
                  />
                );
              }
            }}
          />
        </ListHorizontal>
        <ListHorizontal
          title={'Últimos champs'}
          showBrowseAll={champs?.length > 0}
          handleToAll={navigateToAllChamps}>
          <FlatListHorizontal
            renderHeaderComponent={() => (
              <View style={{paddingLeft: 20}}>
                <CarouselItemSmallAdd
                  type="champ"
                  onPressEmptyCard={() => navigation.navigate('CreateChamp')}
                />
              </View>
            )}
            renderFooterComponent={() => {
              return (
                <View style={{paddingRight: 20}}>
                  {champs?.length > 5 && (
                    <CarouselItemSmallMore handleAll={navigateToAllChamps} />
                  )}
                </View>
              );
            }}
            data={champs?.slice(0, 3) || []}
            renderItem={({item}) => (
              <CardChamps
                item={item}
                navigateToScreen={() =>
                  navigation.navigate('ChampProfile', {
                    champ_id: item.user.id,
                    relation_id: item.id,
                  })
                }
              />
            )}
          />
        </ListHorizontal>
        <ListHorizontal
          title={'Últimas Rutinas'}
          showBrowseAll={rutines?.data?.length > 0}
          handleToAll={navigateToAllRutines}>
          <FlatListHorizontal
            renderHeaderComponent={renderPlusCard('rutina', 'CreateRutine')}
            renderFooterComponent={() => {
              return (
                <View style={{paddingRight: 20}}>
                  {rutines?.length > 3 && (
                    <CarouselItemBigMore handleAll={navigateToAllRutines} />
                  )}
                </View>
              );
            }}
            data={rutines?.data?.slice(0, 4) || []}
            renderItem={({item}) => (
              <Card
                screenWidth
                item={item}
                navigate={() => navigateToRutineDetail(item.id)}
              />
            )}
          />
        </ListHorizontal>
        <ListHorizontal
          title={'Últimas dietas'}
          showBrowseAll={diets?.length > 0}
          handleToAll={navigateToAllDiets}
          style={{marginBottom: 90}}>
          <FlatListHorizontal
            renderHeaderComponent={renderPlusCard('dieta', 'CreateDiet')}
            renderFooterComponent={() => {
              return (
                <View style={{paddingRight: 20}}>
                  {diets?.length > 5 && (
                    <CarouselItemBigMore handleAll={navigateToAllDiets} />
                  )}
                </View>
              );
            }}
            data={diets?.slice(0, 3) || []}
            // TODO: Hacer parametrizable el endpoint de obtener las dietas,
            // para que se pueda obtener una X cantidad de dietas

            renderItem={({item}) => (
              <CardDiets
                screenWidth
                item={item}
                onPress={() => navigateToDietDetail(item.id)}
              />
            )}
          />
        </ListHorizontal>
      </InDashboard>
    </CustomDrawerContainer>
  );
}
