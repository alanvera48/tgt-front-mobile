import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Accordion, AccordionItem, AccordionTrigger} from '@gluestack-ui/themed';
import {AccordionHeader} from '@gluestack-ui/themed';
import {AccordionContent} from '@gluestack-ui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';

import TextBase from '../Base/TextBase';
import DropDownIcon from './components/DropDownIcon';
import {colorByDiets} from '../../utils/colorDiets';
import {findFoodMatch, getMealIcon, getMealTotals} from '../../utils/diets';
import {COLORS} from '../../style/style';

export const MealTime = {
  BREAKFAST: 'Desayuno',
  MORNING_SNACK: 'Snack de la mañana',
  LUNCH: 'Almuerzo',
  AFTERNOON_SNACK: 'Snack de la tarde',
  MEDIA_TARDE: 'Mediatarde',
  DINNER: 'Cena',
  COLACION: 'Colación',
  PRE_WORKOUT: 'Pre entreno',
  POST_WORKOUT: 'Post entreno',
};

export default function Collapsible({meals}) {
  return (
    <Accordion
      width="100%"
      size="md"
      backgroundColor={COLORS.dark.background}
      variant="filled"
      type="single"
      isCollapsible={true}
      isDisabled={false}>
      {meals?.length > 0 &&
        meals?.map((meal, index) => {
          const accentColor = colorByDiets(meal.name);
          const {calories: totalCalories, protein: totalProteins} =
            getMealTotals(meal);
          const hasNutritionData = totalCalories > 0 || totalProteins > 0;
          const foodCount = meal.items?.length ?? 0;

          return (
            <AccordionItem
              key={index}
              value={`meal-${index}`}
              marginVertical={5}
              borderRadius={14}
              backgroundColor={COLORS.dark.backgroundCard}>
              <AccordionHeader>
                <AccordionTrigger>
                  {({isExpanded}) => {
                    return (
                      <View style={styles.headerRow}>
                        <View
                          style={[
                            styles.mealIconBadge,
                            {backgroundColor: `${accentColor}26`},
                          ]}>
                          <FontAwesomeIcon
                            icon={getMealIcon(meal.name)}
                            size={16}
                            color={accentColor}
                          />
                        </View>
                        <View style={styles.headerTextContainer}>
                          <TextBase
                            text={meal.name}
                            color={'#fff'}
                            size={16}
                            fontFamily={'AirbnbCereal_W_Bd'}
                          />
                          <TextBase
                            text={`${foodCount} alimento${
                              foodCount === 1 ? '' : 's'
                            }${
                              hasNutritionData ? ` · ${totalCalories} kcal` : ''
                            }`}
                            color={COLORS.dark.textMuted}
                            size={12}
                            style={{marginTop: 3}}
                          />
                        </View>
                        {isExpanded ? (
                          <DropDownIcon
                            icon={faMinus}
                            backgroundColor={accentColor}
                          />
                        ) : (
                          <DropDownIcon
                            icon={faPlus}
                            backgroundColor={accentColor}
                          />
                        )}
                      </View>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent style={{paddingTop: 0}}>
                {meal.items.map((item, itemIndex) => {
                  const detailedFood = findFoodMatch(item.food);
                  return (
                    <View
                      key={itemIndex}
                      style={[
                        styles.itemRow,
                        itemIndex < meal.items.length - 1 &&
                          styles.itemRowDivider,
                      ]}>
                      <View style={{flex: 1, marginRight: 12}}>
                        <TextBase
                          text={item.food}
                          numberOfLines={1}
                          color={'#fff'}
                          fontFamily={'AirbnbCereal_W_Bd'}
                          size={14}
                        />
                        <TextBase
                          text={`${item.quantity} ${item.unit}`}
                          color={COLORS.dark.textMuted}
                          fontFamily={'AirbnbCereal_W_Bk'}
                          size={12}
                          style={{marginTop: 2}}
                        />
                      </View>
                      {detailedFood && (
                        <View
                          style={[
                            styles.kcalChip,
                            {backgroundColor: `${accentColor}26`},
                          ]}>
                          <TextBase
                            text={`${detailedFood.calories} kcal`}
                            color={accentColor}
                            numberOfLines={1}
                            fontFamily={'AirbnbCereal_W_Bd'}
                            size={12}
                          />
                        </View>
                      )}
                    </View>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  mealIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
    alignItems: 'flex-start',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  itemRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.backgroundElevated,
  },
  kcalChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
});
