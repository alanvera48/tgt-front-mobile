import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import CardDiets from '../../../components/Card/CardDiets/CardDiets';
import InDashboard from '../../../layouts/InDashboard';
import {HStack, VStack} from '@gluestack-ui/themed';
import {
  useGetChampsRutines,
  useGetMyRutines,
} from '../../../hooks/rutines/queries';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import CarouselCategory from '../../../components/CarouselCategory/CarouselCategory';
import TextBase from '../../../components/Base/TextBase';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import Card from '../../../components/Card/Card';
import {useAuthStore} from '../../../store/authStore';

export default function AllRutines({navigation}) {
  const userInfo = useAuthStore(state => state.userInfo);
  const isChamp = userInfo.role === 'CHAMP';

  const {data, isPending, refetch, isRefetching} = useGetMyRutines();

  const dataRutineType = useMemo(() => {
    if (!isPending) {
      const types =
        (data?.length > 0 && data?.map(rutine => rutine.rutineType)) || [];

      const rutinatypesSinRepetir = [...new Set(types || [])];
      return rutinatypesSinRepetir || [];
    }
  }, [data, isPending]);

  const handleCreateRutine = () => {
    navigation.navigate('CreateRutine');
  };

  const navigateToScreen = rutine_id => {
    navigation.navigate('RutineDetail', {
      rutine_id,
    });
  };

  if (isPending) {
    return <LoadingScreen />;
  }

  return (
    <InDashboard>
      <VStack
        marginTop={100}
        paddingHorizontal={10}
        flexDirection="column"
        marginBottom={100}>
        <CarouselCategory dataRutineType={dataRutineType} />
        <HStack justifyContent="space-between" marginVertical={10}>
          <TextBase
            text={'Agregar Rutina'}
            color={'#ffff'}
            fontFamily={'AirbnbCereal_W_Bd'}
            size={18}
            style={{marginBottom: 20}}
          />
          {!isChamp && (
            <TouchableOpacity
              onPress={handleCreateRutine}
              style={{
                backgroundColor: '#323337',
                padding: 10,
                borderRadius: 11,
              }}>
              <FontAwesomeIcon icon={faPlus} color={'#8A8B8D'} size={20} />
            </TouchableOpacity>
          )}
        </HStack>
        <FlatList
          refreshing={isRefetching}
          refreshControl={refetch}
          data={data}
          numColumns={2}
          style={{flex: 1, paddingHorizontal: 10}}
          ListEmptyComponent={() => {
            return (
              <View>
                <TextBase text={'No hay rutinas creadas.'} color={'#ffff'} />
              </View>
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={{width: 10, height: 10}} />;
          }}
          contentContainerStyle={styles.listContainer}
          renderItem={({item, index}) => (
            <Card
              item={item}
              index={index}
              key={index}
              navigate={() => navigateToScreen(item.id)}
            />
          )}
        />
      </VStack>
    </InDashboard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  },
  listContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 40,
  },
});
