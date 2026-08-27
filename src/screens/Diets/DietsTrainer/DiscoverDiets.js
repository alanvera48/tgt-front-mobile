import React from 'react';
import {ActivityIndicator, View, Dimensions} from 'react-native';
import ListHorizontal from '../../../components/ListHorizontal/ListHorizontal';
import {formatData} from '../../../utils/flatListUtil';
import {useGetDietsCreatedByTrainer} from '../../../hooks/diets/queries';
import {useNavigation} from '@react-navigation/native';
import {EmptyCardSmall} from '../../../components/Card/GrayRectangle/GrayRectangleSmall';
import {CardImage} from '../../../components/CardImage/CardImage';
import {CARDS} from '../../../constants/newTgtVideos';
import InDashboard from '../../../layouts/InDashboard';
import CardDiets from '../../../components/Card/CardDiets/CardDiets';
import {
  CarouselItemBigAdd,
  CarouselItemBigMore,
} from '../../../components/CarouselItems';
import {FlatListHorizontal} from '../../../components/FlatListHorizontal';
import {COLORS} from '../../../style/style';

export default function DiscoverDiets() {
  const navigation = useNavigation();

  const {data: diets, isPending: isPendingDiets} =
    useGetDietsCreatedByTrainer();

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
          height: Dimensions.get('window').height - 200,
        }}>
        <ActivityIndicator size="large" color={COLORS.dark.textPrimary} />
      </View>
    );
  }

  return (
    <InDashboard containerStyle={{paddingHorizontal: 0}}>
      <ListHorizontal
        // TODO: deshabiltado temporalmente
        // showBrowseAll={CARDS?.length > 0}
        title={'Lo nuevo de TGT'}
        handleToAll={() => console.log('Ir a todo lo nuevo de TGT')}>
        <FlatListHorizontal
          data={formatData(CARDS, 3)}
          renderEmptyComponent={() => (
            <EmptyCardSmall type="dieta" navigation={navigation} />
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
                  disabled={item.disabled}
                  image={item.image}
                />
              );
            }
          }}
        />
      </ListHorizontal>

      <ListHorizontal
        showBrowseAll={diets?.length > 0}
        title={'Dietas recomendadas'}
        handleToAll={() =>
          navigation.replace('TrainerDashboard', {
            screen: 'Diets',
            params: {activeTab: 'tab2'},
          })
        }
        style={{marginBottom: 320}}>
        <FlatListHorizontal
          data={diets?.slice(0, 3) || []}
          // TODO: Hacer parametrizable el endpoint de obtener las dietas,
          // para que se pueda obtener una X cantidad de dietas
          renderHeaderComponent={() => {
            return (
              <View style={{paddingLeft: 20}}>
                <CarouselItemBigAdd
                  screenWidth
                  type="dieta"
                  onPressEmptyCard={() => navigation.navigate('CreateDiet')}
                />
              </View>
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
  );
}
