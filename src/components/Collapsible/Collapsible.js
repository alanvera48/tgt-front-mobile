import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {Accordion, AccordionItem, AccordionTrigger} from '@gluestack-ui/themed';
import {AccordionHeader} from '@gluestack-ui/themed';
import {AccordionContent} from '@gluestack-ui/themed';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';

import TextBase from '../Base/TextBase';
import DropDownIcon from './components/DropDownIcon';
import {colorByDiets} from '../../utils/colorDiets';
import {FOOD_DATABASE} from '../../constants/diets';
import {DEVICE_WIDTH} from '../../constants';
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
      type="multiple"
      isCollapsible={true}
      isDisabled={false}>
      {meals?.length > 0 &&
        meals?.map((meal, index) => {
          let totalCalories = 0;
          let totalProteins = 0;
          let currentCalorie = 0;
          let currentProtein = 0;
          meal.items.map((item, index) => {
            let currentMeal = FOOD_DATABASE.filter(
              food => food.name === item.food,
            )[0];
            currentCalorie = currentMeal.calories;
            currentProtein = currentMeal.protein;

            totalCalories = totalCalories + currentCalorie;
            totalProteins = totalProteins + currentProtein;
          });
          return (
            <AccordionItem
              key={index}
              value={meal.time}
              borderLeftWidth={4}
              marginVertical={5}
              borderRadius={10}
              borderLeftColor={colorByDiets(meal.name)}
              backgroundColor={COLORS.dark.backgroundCard}>
              <AccordionHeader>
                <AccordionTrigger>
                  {({isExpanded}) => {
                    return (
                      <>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <TextBase
                              text={meal.name}
                              color={colorByDiets(meal.name)}
                              size={16}
                              fontFamily={'AirbnbCereal_W_Bd'}
                            />
                            <TextBase
                              style={{marginLeft: 5}}
                              text={`${totalProteins}gr. de proteina`}
                              color={'#ffff'}
                              fontFamily={'AirbnbCereal_W_Bd'}
                            />
                          </View>
                          <TextBase
                            text={`${totalCalories} de calorias totales`}
                            color={'#9DA8C3'}
                            size={12}
                            style={{marginTop: 5}}
                          />
                        </View>
                        {isExpanded ? (
                          <DropDownIcon
                            icon={faMinus}
                            backgroundColor={colorByDiets(meal.name)}
                          />
                        ) : (
                          <DropDownIcon
                            icon={faPlus}
                            backgroundColor={colorByDiets(meal.name)}
                          />
                        )}
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                {meal.items.map((item, index) => {
                  const detailedFood = FOOD_DATABASE.filter(
                    food => food.name === item.food,
                  )[0];
                  return (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <View
                        style={{
                          backgroundColor: COLORS.dark.backgroundCard,
                          paddingHorizontal: 4,
                          position: 'relative',
                          zIndex: 2,
                          height: 40,
                          maxWidth: '70%',
                        }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            maxWidth: '100%',
                            flexWrap: 'wrap',
                            fontFamily: 'AirbnbCereal_W_Bd',
                            color: '#ffff',
                          }}>
                          {`${item.quantity} ${item.unit} ${item.food}`}
                        </Text>
                      </View>
                      <TextBase
                        text={
                          '...............................................................................'
                        }
                        color={'#ffff'}
                        numberOfLines={1}
                        fontFamily={'AirbnbCereal_W_Bd'}
                        style={{
                          position: 'absolute',
                          textAlign: 'center',
                          maxWidth: DEVICE_WIDTH - 110,
                        }}
                      />
                      <View
                        style={{
                          backgroundColor: COLORS.dark.backgroundCard,
                          paddingHorizontal: 4,
                          position: 'relative',
                          zIndex: 2,
                        }}>
                        <TextBase
                          text={`${detailedFood.calories} Kcal`}
                          color={'#ffff'}
                          numberOfLines={1}
                          fontFamily={'AirbnbCereal_W_Bd'}
                        />
                      </View>
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
