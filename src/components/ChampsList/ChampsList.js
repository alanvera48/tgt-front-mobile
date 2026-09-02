/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CardChamps from '../Card/CardChamps/CardChamps';
import CardChampsList from '../Card/CardChamps/CardChampsList';
import {useNavigation} from '@react-navigation/native';
import {CarouselItemSmallAdd} from '../CarouselItems';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faList, faGrip, faUserGroup} from '@fortawesome/free-solid-svg-icons';
import {HStack} from '@gluestack-ui/themed';
import {COLORS} from '../../style/style';
import TextBase from '../Base/TextBase';
import moment from 'moment';

const EMPTY_STATE_COPY = {
  'sin aceptar': {
    title: 'No tenés solicitudes pendientes',
    subtitle: 'Cuando un champ te elija como entrenador, aparecerá acá',
  },
  latest: {
    title: 'No tenés champs nuevos',
    subtitle:
      'Los champs que se sumaron en los últimos 7 días van a aparecer acá',
  },
  default: {
    title: 'Todavía no tenés champs',
    subtitle: 'Agregá uno para empezar a entrenarlo',
  },
};

function filterChamps(champs, filter) {
  if (!champs) {
    return [];
  }
  if (filter === 'sin aceptar') {
    return champs.filter(item => item.enabled === false);
  }
  if (filter === 'latest') {
    return champs.filter(item =>
      moment(item.createdAt).isAfter(moment().subtract(7, 'days')),
    );
  }
  return champs;
}

export default function ChampsList({champs, filter}) {
  const navigation = useNavigation();
  const [viewType, setViewType] = useState('grid');

  const CardComponent = viewType === 'list' ? CardChampsList : CardChamps;
  const filteredChamps = filterChamps(champs, filter);
  const emptyStateCopy = EMPTY_STATE_COPY[filter] || EMPTY_STATE_COPY.default;

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
        {!filter && (
          <CarouselItemSmallAdd
            type="champ"
            viewType={viewType}
            onPressEmptyCard={() => navigation.navigate('CreateChamp')}
            style={viewType === 'grid' ? {marginRight: 5} : undefined}
          />
        )}
        {filteredChamps.map((champ, index) => (
          <CardComponent
            key={champ.id ?? index}
            item={champ}
            index={index}
            viewType={viewType}
            navigateToScreen={() =>
              navigation.navigate('ChampProfile', {
                champ_id: champ.user.id,
                relation_id: champ.id,
              })
            }
          />
        ))}
        {champs && filteredChamps.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <FontAwesomeIcon
                icon={faUserGroup}
                size={26}
                color={COLORS.dark.primary}
              />
            </View>
            <TextBase
              text={emptyStateCopy.title}
              size={15}
              color={'#fff'}
              fontFamily="AirbnbCereal_W_Bd"
              style={{textAlign: 'center', marginBottom: 4}}
            />
            <TextBase
              text={emptyStateCopy.subtitle}
              size={13}
              lines={2}
              color={COLORS.dark.textMuted}
              fontFamily="AirbnbCereal_W_Bk"
              style={{textAlign: 'center'}}
            />
          </View>
        )}
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
  emptyState: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  emptyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(223, 72, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
});
