import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import CardDiets from '../../../components/Card/CardDiets/CardDiets';
import CardDietsList from '../../../components/Card/CardDiets/CardDietsList';
import {FlatList} from 'react-native';
import {useGetDietsCreatedByTrainer} from '../../../hooks/diets/queries';
import {GrayCardBig} from '../../../components/Card/GrayRectangle/GrayRectangleBig';
import {CarouselItemSmallAdd} from '../../../components/CarouselItems';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faList, faGrip} from '@fortawesome/free-solid-svg-icons';
import TextBase from '../../../components/Base/TextBase';
import InDashboard from '../../../layouts/InDashboard';
import {HStack} from '@gluestack-ui/themed';
import {DEVICE_HEIGHT} from '../../../constants';
import {COLORS} from '../../../style/style';

export default function DietsCustom() {
  const {data: diets, isPending} = useGetDietsCreatedByTrainer();
  const navigation = useNavigation();
  const [viewType, setViewType] = useState('grid');

  const handlePress = id => {
    navigation.navigate('DietDetail', {id});
  };

  if (isPending) {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 3,
          flex: 1,
          height: DEVICE_HEIGHT - 200,
          width: '100%',
          backgroundColor: COLORS.dark.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={COLORS.dark.textPrimary} />
      </View>
    );
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
          data={diets?.length > 0 ? [null, ...(diets || [])] : [null]}
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
                      type="dieta"
                      viewType="list"
                      onPressEmptyCard={() => navigation.navigate('CreateDiet')}
                    />
                  </View>
                );
              }
              return (
                <View style={styles.gridItem}>
                  <GrayCardBig
                    onPress={() => navigation.navigate('CreateDiet')}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      size={30}
                      color={COLORS.dark.primary}
                      style={{marginBottom: 10}}
                    />
                    <TextBase
                      text={'Agregar dieta'}
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
                  <CardDietsList item={item} onPress={handlePress} />
                </View>
              );
            }
            return (
              <View style={styles.gridItem}>
                <CardDiets item={item} onPress={() => handlePress(item.id)} />
              </View>
            );
          }}
        />
      </View>
    </InDashboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 320,
    width: '100%',
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
});
