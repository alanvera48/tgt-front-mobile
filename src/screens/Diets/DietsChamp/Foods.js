import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import InDashboard from '../../../layouts/InDashboard';
import InputSearch from '../../../components/Input/InputSearch';
import TextBase from '../../../components/Base/TextBase';
import {DEVICE_HEIGHT} from '../../../constants';
import {COLORS} from '../../../style/style';
import {useAuthStore} from '../../../store/authStore';
import {getRecommendedFoods} from '../../../utils/nutritionRecommendations';
import {useSearchFoodNutrition} from '../../../hooks/foods/queries';

const FoodRow = ({name, calories, protein, category}) => (
  <View style={styles.foodRow}>
    <View style={{flex: 1, marginRight: 12}}>
      <TextBase
        text={name}
        color={'#fff'}
        fontFamily={'AirbnbCereal_W_Bd'}
        size={14}
        numberOfLines={2}
      />
      {category && (
        <TextBase
          text={category}
          color={COLORS.dark.textMuted}
          fontFamily={'AirbnbCereal_W_Bk'}
          size={12}
          style={{marginTop: 2, textTransform: 'capitalize'}}
        />
      )}
    </View>
    <View style={{alignItems: 'flex-end'}}>
      <TextBase
        text={`${Math.round(calories)} kcal`}
        color={COLORS.dark.primary}
        fontFamily={'AirbnbCereal_W_Bd'}
        size={13}
      />
      <TextBase
        text={`${Math.round(protein)}g proteína`}
        color={COLORS.dark.textMuted}
        fontFamily={'AirbnbCereal_W_Bk'}
        size={12}
        style={{marginTop: 2}}
      />
    </View>
  </View>
);

export const Foods = () => {
  const userInfo = useAuthStore(state => state.userInfo);
  const {label, foods} = getRecommendedFoods(userInfo?.onboardingUser?.goal);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchInput), 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const {data: searchResults, isFetching: isSearching} =
    useSearchFoodNutrition(debouncedSearch);

  const isSearchActive = debouncedSearch.trim().length >= 3;

  return (
    <InDashboard containerStyle={{paddingHorizontal: 0}}>
      <View style={{minHeight: DEVICE_HEIGHT - 220, paddingHorizontal: 20}}>
        <InputSearch
          placeholder={'Buscar un alimento (ej. espinaca, merluza...)'}
          value={searchInput}
          setValue={setSearchInput}
        />

        {isSearchActive ? (
          <>
            <TextBase
              text={'Resultados'}
              color={'#fff'}
              fontFamily={'AirbnbCereal_W_Bd'}
              style={{marginTop: 20, marginBottom: 12}}
            />
            {isSearching && (
              <ActivityIndicator
                size="small"
                color={COLORS.dark.primary}
                style={{marginTop: 20}}
              />
            )}
            {!isSearching && searchResults?.length === 0 && (
              <TextBase
                text={
                  'No encontramos ese alimento. Probá con otro nombre (en general funciona mejor en singular).'
                }
                color={COLORS.dark.textMuted}
                fontFamily={'AirbnbCereal_W_Bk'}
              />
            )}
            {!isSearching && searchResults?.length > 0 && (
              <View style={styles.card}>
                {searchResults.map((food, index) => (
                  <View
                    key={food.fdcId}
                    style={
                      index < searchResults.length - 1 && styles.rowDivider
                    }>
                    <FoodRow
                      name={food.name}
                      calories={food.calories}
                      protein={food.protein}
                    />
                  </View>
                ))}
              </View>
            )}
          </>
        ) : (
          <>
            <TextBase
              text={label}
              color={'#fff'}
              fontFamily={'AirbnbCereal_W_Bd'}
              style={{marginTop: 20, marginBottom: 4}}
            />
            <TextBase
              text={
                'Según tu objetivo, estos alimentos te pueden servir de guía. Tu plan asignado por tu entrenador sigue siendo lo principal.'
              }
              color={COLORS.dark.textMuted}
              fontFamily={'AirbnbCereal_W_Bk'}
              size={12}
              lines={3}
              style={{marginBottom: 16}}
            />
            <View style={styles.card}>
              {foods.map((food, index) => (
                <View
                  key={food.name}
                  style={index < foods.length - 1 && styles.rowDivider}>
                  <FoodRow
                    name={food.name}
                    calories={food.calories}
                    protein={food.protein}
                    category={food.category}
                  />
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </InDashboard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.dark.backgroundCard,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.backgroundElevated,
  },
});
