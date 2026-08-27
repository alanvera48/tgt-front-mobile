import {View} from 'react-native';
import React from 'react';
import {useGetChampsRutines} from '../../../hooks/rutines/queries';
import ListHorizontal from '../../../components/ListHorizontal/ListHorizontal';
import Card from '../../../components/Card/Card';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import InDashboard from '../../../layouts/InDashboard';
import {CarouselItemEmptyBig} from '../../../components/CarouselItems';
import {FlatListHorizontal} from '../../../components/FlatListHorizontal';

export default function DiscoverUser() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {data: rutines} = useGetChampsRutines({enabled: isFocused});

  const navigateToScreen = rutine_id => {
    navigation.navigate('RutineDetail', {
      id: rutine_id,
    });
  };

  return (
    <InDashboard
      containerStyle={{
        paddingHorizontal: 0,
      }}>
      <View style={{marginTop: 10, paddingBottom: 300}}>
        <ListHorizontal title={'Rutinas asignadas'}>
          <FlatListHorizontal
            renderEmptyComponent={() => {
              return <CarouselItemEmptyBig type="rutinas asignadas" />;
            }}
            data={rutines}
            renderItem={({item, index}) => {
              return (
                <Card
                  screenWidth={true}
                  item={item?.rutine}
                  index={index}
                  navigate={() => navigateToScreen(item.rutine.id)}
                />
              );
            }}
          />
        </ListHorizontal>
      </View>
    </InDashboard>
  );
}
