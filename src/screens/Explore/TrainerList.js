import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import TextBase from '../../components/Base/TextBase';
import {useGetTrainersByGym} from '../../hooks/gym/queries';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import CardTrainer from '../../components/Card/CardTrainer/CardTrainer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {HStack} from '@gluestack-ui/themed';
import {COLORS} from '../../style/style';

export default function TrainerList({navigation, route}) {
  const {isPending, data} = useGetTrainersByGym(route.params.gym_place_id);

  const onPressCard = trainerId => {
    console.log(trainerId, 'trainerId');

    navigation.navigate('TrainerInfo', {
      trainer_id: trainerId.user.id,
      // gym_id: route.params.gym_place_id,
    });
  };

  if (isPending) {
    return <LoadingScreen backgroundColor={COLORS.dark.background} />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1C1C1E',
        paddingHorizontal: 20,
        paddingTop: 60,
      }}>
      <HStack alignItems="center" marginBottom={20}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.itemPress}>
          <FontAwesomeIcon size={24} icon={faChevronLeft} color="#fff" />
        </TouchableOpacity>

        <TextBase
          text={'Entrenadores'}
          fontFamily={'AirbnbCereal_W_Bd'}
          color={'#fff'}
          size={25}
          style={{marginLeft: 20}}
        />
      </HStack>

      <FlatList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <TextBase
            text={
              'No hay entrenadores registrados en The Good Trainer en este gimnasio'
            }
            fontFamily={'AirbnbCereal_W_Bd'}
            color={'#fff'}
            lines={3}
            size={20}
            style={{textAlign: 'center', marginTop: 50}}
          />
        )}
        data={data.results}
        contentContainerStyle={{paddingBottom: 40}}
        ItemSeparatorComponent={<View style={{height: 20}} />}
        renderItem={({item, index}) => (
          <CardTrainer
            key={index}
            item={item}
            onPress={() => onPressCard(item)}
          />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  itemPress: {
    backgroundColor: COLORS.dark.backgroundInput,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: 10,
    borderRadius: 100,
  },
});
