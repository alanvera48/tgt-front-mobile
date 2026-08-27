/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CardChamps from '../Card/CardChamps/CardChamps';
import CardChampsList from '../Card/CardChamps/CardChampsList';
import {useNavigation} from '@react-navigation/native';
import {CarouselItemSmallAdd} from '../CarouselItems';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faList, faGrip} from '@fortawesome/free-solid-svg-icons';
import {HStack} from '@gluestack-ui/themed';
import {COLORS} from '../../style/style';

export default function ChampsList({champs, filter}) {
  const navigation = useNavigation();
  const [viewType, setViewType] = useState('grid');

  const CardComponent = viewType === 'list' ? CardChampsList : CardChamps;

  return (
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

      <View style={[styles.list, viewType === 'list' && styles.listView]}>
        <CarouselItemSmallAdd
          type="champ"
          onPressEmptyCard={() => navigation.navigate('CreateChamp')}
          style={viewType === 'grid' ? {marginRight: 5} : styles.listAddButton}
        />
        {champs &&
          champs
            .filter(item =>
              filter === 'sin aceptar'
                ? item.enabled === false
                : filter === 'latest'
                ? item.latest === true
                : item,
            )
            .map((champ, index) => {
              return (
                <CardComponent
                  key={index}
                  item={champ}
                  index={index}
                  navigateToScreen={() =>
                    navigation.navigate('ChampProfile', {
                      champ_id: champ.user.id,
                      relation_id: champ.id,
                    })
                  }
                />
              );
            })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  viewToggle: {
    paddingHorizontal: 20,
    marginBottom: 10,
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
  list: {
    alignSelf: 'center',
    width: 314,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 80,
  },
  listView: {
    width: '90%',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  listAddButton: {
    width: '100%',
    marginTop: 10,
    marginHorizontal: 0,
  },
});
