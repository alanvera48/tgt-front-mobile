import {View} from 'react-native';
import React, {useEffect} from 'react';
import InDashboard from '../../../layouts/InDashboard';
import BannerUser from './component/bannerUser';
import ListHorizontal from '../../../components/ListHorizontal/ListHorizontal';

import {useIsConnected} from '../../../hooks/user/queries';
import {useGetChampsRutines} from '../../../hooks/rutines/queries';

import Card from '../../../components/Card/Card';
import {useGetChampDiets} from '../../../hooks/diets/queries';
import CardDiets from '../../../components/Card/CardDiets/CardDiets';
import PostCard from '../../../components/PostCard';
import CardMyTrainer from '../../../components/CardMyTrainer/CardMyTrainer';
import {CustomDrawerContainer} from '../../../components/CustomDrawerContainer';
import {
  CarouselItemBigMore,
  CarouselItemEmptyWithTextParameters,
} from '../../../components/CarouselItems';
import {FlatListHorizontal} from '../../../components/FlatListHorizontal';
import {CardImage} from '../../../components/CardImage/CardImage';
import {CARDS} from '../../../constants/newTgtVideos';
import {formatData} from '../../../utils/flatListUtil';
import {useAuthStore} from '../../../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import {useGetFeed} from '../../../hooks/feed/queries';
import {useIsFocused} from '@react-navigation/native';

export default function DashboardUser({navigation}) {
  const isFocused = useIsFocused();
  const {userInfo, setTrainerData} = useAuthStore(
    useShallow(state => ({
      userInfo: state.userInfo,
      setTrainerData: state.setTrainerData,
    })),
  );
  const {
    data: trainerData,
    isLoading: isLoadingTrainerInfo,
    refetch: refetchTrainerInfo,
  } = useIsConnected(userInfo?.id, {enabled: isFocused});

  useEffect(() => {
    trainerData && setTrainerData(trainerData);
  }, [trainerData]);

  const {
    data: rutines,
    refetch: refetchRutines,
    isRefetching: isRefetchingRutines,
  } = useGetChampsRutines({enabled: isFocused});

  const {
    data: diets,
    refetch: refetchDiets,
    isRefetching: isRefetchingDiets,
  } = useGetChampDiets({enabled: isFocused});

  const trainerId = trainerData?.trainer?.id;
  const {
    data: feedPosts,
    refetch: refetchFeed,
    isRefetching: isRefetchingFeed,
  } = useGetFeed(trainerId, {enabled: isFocused});

  const feedSlice = feedPosts?.slice(0, 5);

  const navigateToScreen = rutine_id => {
    navigation.navigate('RutineDetail', {
      id: rutine_id,
    });
  };

  const handleToDietDetail = id => {
    navigation.navigate('DietDetail', {
      id,
    });
  };

  console.log(diets, 'diets');

  return (
    <CustomDrawerContainer>
      <InDashboard
        isRefetching={
          isRefetchingDiets ||
          isRefetchingRutines ||
          isLoadingTrainerInfo ||
          isRefetchingFeed
        }
        onRefresh={() => {
          refetchTrainerInfo();
          refetchRutines();
          refetchDiets();
          refetchFeed();
        }}
        containerStyle={{
          paddingHorizontal: 0,
        }}>
        {/* <InputSearch /> */}
        {trainerData?.trainer ? (
          <CardMyTrainer
            trainerprofile={trainerData.trainer}
            title={`${trainerData.trainer.firstName} ${trainerData.trainer.lastName}`}
            isChampAccepted={trainerData?.enabled}
            approvedAt={trainerData?.approvedAt}
          />
        ) : (
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <BannerUser />
          </View>
        )}

        <ListHorizontal title={'Lo nuevo de TGT'}>
          <FlatListHorizontal
            data={formatData(CARDS, 3)}
            renderItem={({item, index}) => (
              <CardImage
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                disabled={true}
              />
            )}
          />
        </ListHorizontal>

        {trainerData?.trainer?.id && feedSlice?.length > 0 && (
          <ListHorizontal
            title={'Publicaciones de tu entrenador'}
            showBrowseAll={feedPosts?.length > 5}
            handleToAll={() => navigation.navigate('FeedList', {trainerId})}
            style={{marginTop: 12}}>
            <FlatListHorizontal
              data={feedSlice}
              renderFooterComponent={() => (
                <View style={{paddingRight: 20}}>
                  {feedPosts?.length > 5 && (
                    <CarouselItemBigMore
                      handleAll={() =>
                        navigation.navigate('FeedList', {trainerId})
                      }
                    />
                  )}
                </View>
              )}
              renderItem={({item}) => (
                <PostCard
                  post={item}
                  onPress={postId =>
                    navigation.navigate('PostDetail', {postId})
                  }
                />
              )}
            />
          </ListHorizontal>
        )}

        <ListHorizontal title={'Rutinas Asignadas'}>
          <FlatListHorizontal
            renderEmptyComponent={() => {
              return (
                <CarouselItemEmptyWithTextParameters
                  text={'Tu entrenamiento está por empezar'}
                  subText={
                    'Apenas tu entrenador te asigne una rutina, la vas a ver acá.'
                  }
                />
              );
            }}
            data={rutines}
            renderFooterComponent={() => {
              return (
                <View style={{paddingRight: 20}}>
                  {rutines?.length > 5 && (
                    <CarouselItemBigMore
                      handleAll={() => navigation.navigate('Rutines')}
                    />
                  )}
                </View>
              );
            }}
            renderItem={({item, index}) => {
              return (
                <Card
                  screenWidth={true}
                  item={item.rutine}
                  index={index}
                  navigate={() => navigateToScreen(item.rutine.id)}
                />
              );
            }}
          />
        </ListHorizontal>
        <ListHorizontal title={'Dietas Asignada'}>
          <FlatListHorizontal
            data={diets || []}
            keyExtractor={(item, index) => index.toString()}
            // TODO: Hacer parametrizable el endpoint de obtener las dietas,
            // para que se pueda obtener una X cantidad de dietas
            renderEmptyComponent={() => {
              return (
                <CarouselItemEmptyWithTextParameters
                  text={'Tu plan de alimentación está en camino'}
                  subText={
                    'Cuando tu entrenador la cargue, vas a poder seguirla desde acá.'
                  }
                />
              );
            }}
            renderFooterComponent={() => {
              return (
                <View style={{paddingRight: 20}}>
                  {diets?.length > 5 && (
                    <CarouselItemBigMore
                      handleAll={() => navigation.navigate('ChampStack')}
                    />
                  )}
                </View>
              );
            }}
            renderItem={({item, index}) => {
              return (
                <CardDiets
                  screenWidth={true}
                  item={item.diet}
                  index={index}
                  onPress={handleToDietDetail}
                />
              );
            }}
            style={{paddingBottom: 75}}
          />
        </ListHorizontal>
      </InDashboard>
    </CustomDrawerContainer>
  );
}
