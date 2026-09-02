import React, {useState} from 'react';
import InDashboard from '../../../layouts/InDashboard';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Card from '../../../components/Card/Card';
import CardRutineList from '../../../components/Card/CardRutineList';
import {useNavigation} from '@react-navigation/native';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import {GrayCardBig} from '../../../components/Card/GrayRectangle/GrayRectangleBig';
import {CarouselItemSmallAdd} from '../../../components/CarouselItems';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import TextBase from '../../../components/Base/TextBase';
import {useGetMyRutines} from '../../../hooks/rutines/queries';
import {HStack} from '@gluestack-ui/themed';
import {faPlus, faList, faGrip} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../../style/style';

export const MyTrainings = () => {
  const {data: rutines, isPending} = useGetMyRutines();
  const [viewType, setViewType] = useState('grid');

  const navigation = useNavigation();

  const handlePress = id => {
    navigation.navigate('RutineDetail', {id});
  };

  if (isPending) {
    return <LoadingScreen />;
  }

  return (
    <InDashboard>
      <View style={styles.container}>
        <HStack
          justifyContent="flex-end"
          alignItems="center"
          style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewType === 'list' && styles.activeToggle,
            ]}
            onPress={() => setViewType('list')}>
            <FontAwesomeIcon
              icon={faList}
              color={
                viewType === 'list'
                  ? COLORS.dark.textPrimary
                  : COLORS.dark.textMuted
              }
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewType === 'grid' && styles.activeToggle,
            ]}
            onPress={() => setViewType('grid')}>
            <FontAwesomeIcon
              icon={faGrip}
              color={
                viewType === 'grid'
                  ? COLORS.dark.textPrimary
                  : COLORS.dark.textMuted
              }
              size={20}
            />
          </TouchableOpacity>
        </HStack>

        <FlatList
          key={viewType}
          data={rutines?.data?.length > 0 ? [null, ...rutines?.data] : [null]}
          numColumns={viewType === 'grid' ? 2 : 1}
          contentContainerStyle={
            viewType === 'grid' ? styles.gridContainer : styles.listContainer
          }
          ItemSeparatorComponent={() => (
            <View style={{height: viewType === 'grid' ? 20 : 15}} />
          )}
          columnWrapperStyle={viewType === 'grid' ? styles.gridRow : null}
          renderItem={({item, index}) => {
            if (index === 0) {
              if (viewType === 'list') {
                return (
                  <View style={styles.listItem}>
                    <CarouselItemSmallAdd
                      type="rutina"
                      viewType="list"
                      onPressEmptyCard={() =>
                        navigation.navigate('CreateRutine')
                      }
                    />
                  </View>
                );
              }
              return (
                <View style={styles.gridItem}>
                  <GrayCardBig
                    onPress={() => navigation.navigate('CreateRutine')}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      size={30}
                      color={COLORS.dark.primary}
                      style={{marginBottom: 10}}
                    />
                    <TextBase
                      text={'Agregar rutina'}
                      lines={2}
                      size={16}
                      color={'#ffff'}
                      fontFamily="AirbnbCereal_W_Bk"
                      style={{textAlign: 'center'}}
                    />
                  </GrayCardBig>
                </View>
              );
            }
            if (viewType === 'list') {
              return (
                <View style={styles.listItem}>
                  <CardRutineList
                    item={item}
                    navigate={() => handlePress(item.id)}
                  />
                </View>
              );
            }
            return (
              <View style={styles.gridItem}>
                <Card item={item} navigate={() => handlePress(item.id)} />
              </View>
            );
          }}
        />
      </View>
    </InDashboard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 320,
  },
  viewToggle: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  toggleButton: {
    padding: 10,
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: COLORS.dark.backgroundCard,
  },
  activeToggle: {
    backgroundColor: '#323337',
  },
  gridContainer: {
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  gridRow: {
    justifyContent: 'space-between',
    gap: 20,
  },
  gridItem: {
    width: '48%',
  },
  listItem: {
    width: '100%',
  },
  gridHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  listHeaderContainer: {
    width: '100%',
    marginBottom: 20,
  },
});
