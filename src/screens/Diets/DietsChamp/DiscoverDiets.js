import React from 'react';
import {ActivityIndicator, View, Dimensions} from 'react-native';
import ListHorizontal from '../../../components/ListHorizontal/ListHorizontal';
import {useGetChampDiets} from '../../../hooks/diets/queries';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import InDashboard from '../../../layouts/InDashboard';
import CardDiets from '../../../components/Card/CardDiets/CardDiets';
import {
  CarouselItemBigMore,
  CarouselItemEmptyBig,
} from '../../../components/CarouselItems';
import {FlatListHorizontal} from '../../../components/FlatListHorizontal';
import {COLORS} from '../../../style/style';

export default function DiscoverDiets() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {data: diets, isPending: isPendingDiets} = useGetChampDiets({
    enabled: isFocused,
  });

  const navigateToDietDetail = id => {
    navigation.navigate('DietDetail', {
      id,
    });
  };

  if (isPendingDiets) {
    return (
      <View
        style={{
          backgroundColor: COLORS.dark.background,
          justifyContent: 'center',
          alignItems: 'center',
          height: Dimensions.get('window').height * 0.5,
        }}>
        <ActivityIndicator size="large" color={COLORS.dark.textPrimary} />
      </View>
    );
  }

  return (
    <InDashboard
      containerStyle={{
        marginRight: 0,
        paddingHorizontal: 0,
      }}>
      <ListHorizontal title={'Dietas asignadas'} style={{marginBottom: 320}}>
        <FlatListHorizontal
          renderEmptyComponent={() => (
            <CarouselItemEmptyBig type="dietas asignadas" />
          )}
          renderHeaderComponent={() => <View style={{width: 20}} />}
          renderFooterComponent={() => (
            <View style={{width: 20}}>
              {diets?.length > 5 && (
                <CarouselItemBigMore
                  handleAll={() => navigation.navigate('ChampStack')}
                />
              )}
            </View>
          )}
          data={diets}
          // TODO: Hacer parametrizable el endpoint de obtener las dietas,
          // para que se pueda obtener una X cantidad de dietas
          renderItem={({item}) => (
            <CardDiets
              screenWidth
              item={item.diet}
              onPress={() => navigateToDietDetail(item.diet.id)}
            />
          )}
        />
      </ListHorizontal>
    </InDashboard>
  );
}
