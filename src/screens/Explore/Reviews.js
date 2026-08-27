import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Container from '../../layouts/Container';
import {useGetReviewsOfTrainer} from '../../hooks/gym/queries';
import {HStack, VStack} from '@gluestack-ui/themed';
import TextBase from '../../components/Base/TextBase';
import ReviewCard from '../../components/Card/ReviewCard/ReviewCard';
import PercentageBar from '../../components/ProgressBar/ProgressBar';
import {GoBackArrow} from '../../components/GoBackArrow';

export default function Reviews({route}) {
  const {data, isPending, hasNextPage, fetchNextPage} = useGetReviewsOfTrainer(
    route.params.trainerId || '',
  );

  const dataArr = data?.pages.map(page => page.reviews).flat();

  const onReachEnd = () => {
    if (hasNextPage && !isPending) {
      fetchNextPage();
    }
  };

  return (
    <Container
      style={{
        paddingTop: 20,
        paddingBottom: 140,
        paddingHorizontal: 0,
      }}>
      <VStack>
        <View style={styles.header}>
          <GoBackArrow style={{marginRight: 40}} />
          <TextBase
            text={'Calificaciones'}
            color={'#fff'}
            size={24}
            style={{marginRight: 'auto'}}
            fontFamily={'AirbnbCereal_W_Blk'}
          />
        </View>
        <HStack alignItems="center" marginBottom={30} paddingHorizontal={20}>
          <TextBase
            text={route.params.averageRating}
            size={59}
            color={'#fff'}
            fontFamily={'AirbnbCereal_W_Bd'}
            style={{marginRight: 20}}
          />
          <View
            style={{
              height: 100,
              width: '70%',
            }}>
            <View style={{marginVertical: 1}}>
              <PercentageBar
                starText="5"
                percentage={route.params.average.count_5}
              />
            </View>
            <View style={{marginVertical: 1}}>
              <PercentageBar
                starText="4"
                percentage={route.params.average.count_4}
              />
            </View>
            <View style={{marginVertical: 1}}>
              <PercentageBar
                starText="3"
                percentage={route.params.average.count_3}
              />
            </View>
            <View style={{marginVertical: 1}}>
              <PercentageBar
                starText="2"
                percentage={route.params.average.count_2}
              />
            </View>
            <View style={{marginVertical: 1}}>
              <PercentageBar
                starText="1"
                percentage={route.params.average.count_1}
              />
            </View>
          </View>
        </HStack>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            paddingRight: 24,
            marginBottom: 20,
          }}>
          <TextBase
            text={`${dataArr?.length} Calificaciones`}
            color={'#fff'}
            size={18}
            fontFamily={'AirbnbCereal_W_Bk'}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataArr}
          ItemSeparatorComponent={() => <View style={{height: 25}} />}
          renderItem={({item, index}) => (
            <ReviewCard index={index} item={item} />
          )}
          onEndReached={onReachEnd}
          onEndReachedThreshold={0.5}
          style={{marginHorizontal: 10, marginBottom: 160}}
          contentContainerStyle={{alignItems: 'center'}}
        />
      </VStack>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
});
