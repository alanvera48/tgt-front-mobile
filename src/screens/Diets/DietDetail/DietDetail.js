import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Tabs} from '@gluestack-ui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFire,
  faDrumstickBite,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import Hero from '../../../components/Hero/Hero';
import InDashboard from '../../../layouts/InDashboard';
import TextBase from '../../../components/Base/TextBase';
import Collapsible from '../../../components/Collapsible/Collapsible';
import {useGetDietChampsByDietId} from '../../../hooks/diets/queries';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import {COLORS} from '../../../style/style';
import {useGetShoppingListDietById} from '../../../hooks/diets/queries';
import {useAuthStore} from '../../../store/authStore';
import {EditButton} from '../../../components/EditButton';
import {getBadgeConfig} from '../../Rutines/RutineDetail/RutineDetail';
import InfoBadge from '../../../components/Badge/InfoBadge';
import {getExpirationStatus} from '../../../utils/rutines';
import {getMealTotals} from '../../../utils/diets';
import {TabList, TabItem} from '../../../components/TabComponents';

export default function DietDetail({route, navigation}) {
  const userInfo = useAuthStore(state => state.userInfo);
  const {data, isPending} = useGetDietChampsByDietId(route.params.id);
  const {data: shoppingListData} = useGetShoppingListDietById(route.params.id);

  const expirationStatus = getExpirationStatus(data?.alert);

  const badgeConfig = getBadgeConfig('dieta', expirationStatus);

  const meals = data?.diet?.meals ?? [];
  const dailyTotals = meals.reduce(
    (totals, meal) => {
      const mealTotals = getMealTotals(meal);
      return {
        calories: totals.calories + mealTotals.calories,
        protein: totals.protein + mealTotals.protein,
      };
    },
    {calories: 0, protein: 0},
  );
  const hasDailyNutritionData =
    dailyTotals.calories > 0 || dailyTotals.protein > 0;

  const handleDietEditScreen = () => {
    navigation.navigate('CreateDiet', {
      diet_id: route.params.id,
    });
  };

  if (isPending) {
    return <LoadingScreen backgroundColor={COLORS.dark.background} />;
  }

  return (
    <View style={{flex: 1}}>
      <InDashboard>
        <View style={{paddingTop: 0, paddingHorizontal: 20, paddingBottom: 30}}>
          <View style={{position: 'absolute', top: 20, right: 30, zIndex: 2}}>
            {userInfo.role === 'TRAINER' && (
              <EditButton onPress={handleDietEditScreen} />
            )}
          </View>
          <Hero item={data.diet} />
          {badgeConfig && (
            <View style={{marginTop: 10, marginBottom: 20}}>
              <InfoBadge
                message={badgeConfig.message}
                color={badgeConfig.color}
              />
            </View>
          )}

          <View style={styles.statsRow}>
            {hasDailyNutritionData && (
              <>
                <View style={styles.statTile}>
                  <View
                    style={[
                      styles.statIconBadge,
                      {backgroundColor: `${COLORS.dark.primary}26`},
                    ]}>
                    <FontAwesomeIcon
                      icon={faFire}
                      size={16}
                      color={COLORS.dark.primary}
                    />
                  </View>
                  <TextBase
                    text={`${dailyTotals.calories}`}
                    color={'#fff'}
                    size={18}
                    fontFamily={'AirbnbCereal_W_Bd'}
                    style={{marginTop: 8}}
                  />
                  <TextBase
                    text={'Kcal totales'}
                    color={COLORS.dark.textMuted}
                    size={12}
                    fontFamily={'AirbnbCereal_W_Bk'}
                  />
                </View>
                <View style={styles.statTile}>
                  <View
                    style={[
                      styles.statIconBadge,
                      {backgroundColor: `${COLORS.dark.info}26`},
                    ]}>
                    <FontAwesomeIcon
                      icon={faDrumstickBite}
                      size={16}
                      color={COLORS.dark.info}
                    />
                  </View>
                  <TextBase
                    text={`${dailyTotals.protein}g`}
                    color={'#fff'}
                    size={18}
                    fontFamily={'AirbnbCereal_W_Bd'}
                    style={{marginTop: 8}}
                  />
                  <TextBase
                    text={'Proteína'}
                    color={COLORS.dark.textMuted}
                    size={12}
                    fontFamily={'AirbnbCereal_W_Bk'}
                  />
                </View>
              </>
            )}
            <View style={styles.statTile}>
              <View
                style={[
                  styles.statIconBadge,
                  {backgroundColor: `${COLORS.dark.success}26`},
                ]}>
                <FontAwesomeIcon
                  icon={faUtensils}
                  size={16}
                  color={COLORS.dark.success}
                />
              </View>
              <TextBase
                text={`${meals.length}`}
                color={'#fff'}
                size={18}
                fontFamily={'AirbnbCereal_W_Bd'}
                style={{marginTop: 8}}
              />
              <TextBase
                text={'Comidas'}
                color={COLORS.dark.textMuted}
                size={12}
                fontFamily={'AirbnbCereal_W_Bk'}
              />
            </View>
          </View>

          <TextBase
            text={'Descripción'}
            color={'#fff'}
            fontFamily={'AirbnbCereal_W_Bd'}
            style={{marginBottom: 2}}
          />
          <TextBase
            text={data?.diet?.description}
            fontFamily={'AirbnbCereal_W_Bk'}
            lines={3}
            color={'#747688'}
            style={{marginBottom: 10}}
          />
          <TextBase
            text={'Duración'}
            color={'#fff'}
            fontFamily={'AirbnbCereal_W_Bd'}
            style={{marginBottom: 2}}
          />
          <TextBase
            text={data?.diet?.duration}
            fontFamily={'AirbnbCereal_W_Bk'}
            lines={3}
            color={'#747688'}
          />
          <Tabs value="tab1" style={{marginTop: 10}}>
            <TabList>
              <TabItem value="tab1" label="Comidas del día" />
              <TabItem value="tab2" label="Lista de compras" />
            </TabList>
            <Tabs.TabPanels>
              <Tabs.TabPanel value="tab1">
                <Collapsible meals={meals} />
              </Tabs.TabPanel>
              <Tabs.TabPanel value="tab2">
                {shoppingListData?.length > 0 ? (
                  <View style={styles.shoppingListCard}>
                    {shoppingListData.map((item, index) => (
                      <View
                        key={`${item.food}-${index}`}
                        style={[
                          styles.shoppingListRow,
                          index < shoppingListData.length - 1 &&
                            styles.shoppingListRowDivider,
                        ]}>
                        <TextBase
                          text={item.food}
                          color={'#fff'}
                          fontFamily={'AirbnbCereal_W_Bk'}
                          size={14}
                          lines={2}
                          style={{flex: 1, marginRight: 12}}
                        />
                        <TextBase
                          text={`${item.weeklyQuantity} ${item.unit}`}
                          color={COLORS.dark.textPrimary}
                          fontFamily={'AirbnbCereal_W_Bd'}
                          size={14}
                        />
                      </View>
                    ))}
                  </View>
                ) : (
                  <TextBase
                    text={'Todavía no hay una lista de compras generada.'}
                    fontFamily={'AirbnbCereal_W_Bk'}
                    color={COLORS.dark.textMuted}
                  />
                )}
              </Tabs.TabPanel>
            </Tabs.TabPanels>
          </Tabs>
        </View>
      </InDashboard>
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 20,
  },
  statTile: {
    flex: 1,
    alignItems: 'center',
  },
  statIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shoppingListCard: {
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  shoppingListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  shoppingListRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.backgroundElevated,
  },
});
