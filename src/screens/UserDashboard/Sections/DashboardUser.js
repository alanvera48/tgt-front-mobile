import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {useAuthStore} from '../../../store/authStore';
import {useShallow} from 'zustand/react/shallow';
import {useGetFeed} from '../../../hooks/feed/queries';
import {useIsFocused} from '@react-navigation/native';
import {SkeletonCard} from '../../../components/Skeleton/Skeleton';

const SKELETON_ITEMS = [
  {id: 'skeleton-1'},
  {id: 'skeleton-2'},
  {id: 'skeleton-3'},
];

export default function DashboardUser({navigation}) {
  const isFocused = useIsFocused();
  // Spinner de pull-to-refresh: solo cuando el usuario lo pide. Los refetch
  // automáticos al volver a foco (staleTime 0 + enabled: isFocused) no deben
  // disparar el loader, o se ve "cargando" cada vez que se re-enfoca la pantalla.
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const {userInfo, setTrainerData} = useAuthStore(
    useShallow(state => ({
      userInfo: state.userInfo,
      setTrainerData: state.setTrainerData,
    })),
  );
  const {data: trainerData, refetch: refetchTrainerInfo} = useIsConnected(
    userInfo?.id,
    {enabled: isFocused},
  );

  useEffect(() => {
    trainerData && setTrainerData(trainerData);
  }, [trainerData]);

  const {
    data: rutines,
    isLoading: isLoadingRutines,
    refetch: refetchRutines,
  } = useGetChampsRutines({
    enabled: isFocused,
  });

  const {
    data: diets,
    isLoading: isLoadingDiets,
    refetch: refetchDiets,
  } = useGetChampDiets({
    enabled: isFocused,
  });

  const trainerId = trainerData?.trainer?.id;
  const {
    data: feedPosts,
    isLoading: isLoadingFeed,
    refetch: refetchFeed,
  } = useGetFeed(trainerId, {
    enabled: isFocused,
  });

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
        isRefetching={isManualRefreshing}
        onRefresh={async () => {
          setIsManualRefreshing(true);
          try {
            await Promise.all([
              refetchTrainerInfo(),
              refetchRutines(),
              refetchDiets(),
              refetchFeed(),
            ]);
          } finally {
            setIsManualRefreshing(false);
          }
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
            data={CARDS}
            separatorWidth={12}
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

        {trainerData?.trainer?.id &&
          (isLoadingFeed || feedSlice?.length > 0) && (
            <ListHorizontal
              title={'Publicaciones de tu entrenador'}
              showBrowseAll={feedPosts?.length > 5}
              handleToAll={() => navigation.navigate('FeedList', {trainerId})}
              style={{marginTop: 12}}>
              <FlatListHorizontal
                data={isLoadingFeed ? SKELETON_ITEMS : feedSlice}
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
                renderItem={({item}) =>
                  isLoadingFeed ? (
                    <SkeletonCard />
                  ) : (
                    <PostCard
                      post={item}
                      onPress={postId =>
                        navigation.navigate('PostDetail', {postId})
                      }
                    />
                  )
                }
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
            data={isLoadingRutines ? SKELETON_ITEMS : rutines}
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
              if (isLoadingRutines) {
                return <SkeletonCard />;
              }
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
            data={isLoadingDiets ? SKELETON_ITEMS : diets || []}
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
              if (isLoadingDiets) {
                return <SkeletonCard />;
              }
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
