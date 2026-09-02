import {View, StyleSheet, Dimensions} from 'react-native';
import React, {useMemo, useState} from 'react';

import ListHorizontal from '../../../components/ListHorizontal/ListHorizontal';

import {useGetMyRutines} from '../../../hooks/rutines/queries';

import {useNavigation} from '@react-navigation/native';
import CarouselCategory from '../../../components/CarouselCategory/CarouselCategory';
import {CARDS} from '../../../constants/newTgtVideos';
import {formatData} from '../../../utils/flatListUtil';
import {EmptyCardSmall} from '../../../components/Card/GrayRectangle/GrayRectangleSmall';
import {CardImage} from '../../../components/CardImage/CardImage';
import InDashboard from '../../../layouts/InDashboard';
import {
  CarouselItemBigAdd,
  CarouselItemBigMore,
} from '../../../components/CarouselItems';
import Card from '../../../components/Card/Card';
import {FlatListHorizontal} from '../../../components/FlatListHorizontal';

export default function Discover() {
  const navigation = useNavigation();
  const {data: rutines} = useGetMyRutines();
  const [selectedType, setSelectedType] = useState(null);

  const filteredRutines = useMemo(() => {
    if (!selectedType) {
      return rutines?.data || [];
    }
    return (rutines?.data || []).filter(
      rutine => rutine.rutineType === selectedType,
    );
  }, [rutines, selectedType]);

  const navigateToRutineDetail = id => {
    navigation.navigate('RutineDetail', {
      id,
    });
  };

  return (
    <InDashboard containerStyle={{paddingHorizontal: 0}}>
      <View style={{marginTop: 10, paddingBottom: 300}}>
        <View style={styles.containerCategories}>
          <CarouselCategory
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        </View>
        <ListHorizontal
          // TODO: deshabiltado temporalmente
          // showBrowseAll={CARDS?.length > 0}
          title={'Lo nuevo de TGT'}
          handleToAll={() => {}}>
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
                    image={item.image}
                    disabled={true}
                  />
                );
              }
            }}
          />
        </ListHorizontal>

        <ListHorizontal
          title={selectedType ? 'Rutinas filtradas' : 'Últimas Rutinas'}
          showBrowseAll={rutines?.data?.length > 0}
          handleToAll={() =>
            navigation.navigate('TrainerDashboard', {
              screen: 'Rutines',
              params: {activeTab: 'tab2'},
            })
          }>
          <FlatListHorizontal
            data={filteredRutines}
            renderHeaderComponent={() => (
              <View style={{paddingLeft: 20}}>
                <CarouselItemBigAdd
                  screenWidth
                  type="rutina"
                  onPressEmptyCard={() => navigation.navigate('CreateRutine')}
                />
              </View>
            )}
            renderFooterComponent={() => {
              return (
                <View style={{paddingRight: 20}}>
                  {filteredRutines.length > 5 && (
                    <CarouselItemBigMore handleAll={() => {}} />
                  )}
                </View>
              );
            }}
            renderItem={({item}) => (
              <Card
                screenWidth
                item={item}
                navigate={() => navigateToRutineDetail(item.id)}
              />
            )}
          />
        </ListHorizontal>
      </View>
    </InDashboard>
  );
}

const styles = StyleSheet.create({
  containerCategories: {
    flexDirection: 'row',
  },
});
