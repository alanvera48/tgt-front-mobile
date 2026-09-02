import {FOOD_DATABASE} from '../constants/diets';
import {DIET_TIME_KEYS} from '../commons/diet-key';
import {
  faMugHot,
  faAppleWhole,
  faUtensils,
  faCookie,
  faMoon,
  faDumbbell,
  faBowlFood,
} from '@fortawesome/free-solid-svg-icons';

const DEFAULT_DIET_IMAGE =
  'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800';

/**
 * Devuelve la imagen a usar para una dieta: la propia si tiene, sino una
 * imagen por defecto de Pexels.
 * @param {{imageUrl?: string}} diet
 * @returns {string}
 */
export const getDietImage = diet => diet?.imageUrl || DEFAULT_DIET_IMAGE;

const normalize = str => str?.toLowerCase().trim();

/**
 * Busca un alimento en FOOD_DATABASE por nombre exacto, alias, o coincidencia
 * parcial (en cualquier dirección). Un entrenador puede escribir "Pechuga de
 * pollo" cuando la base tiene "Pechuga de pollo sin piel", o directamente un
 * alias como "pollo" — comparar solo por igualdad exacta pierde la mayoría.
 * @param {string} foodName
 */
export const findFoodMatch = foodName => {
  const target = normalize(foodName);
  if (!target) {
    return undefined;
  }

  return FOOD_DATABASE.find(food => {
    const name = normalize(food.name);
    if (name === target || name.includes(target) || target.includes(name)) {
      return true;
    }
    return food.aliases?.some(alias => {
      const a = normalize(alias);
      return a === target || target.includes(a) || a.includes(target);
    });
  });
};

/**
 * Suma calorías y proteína de una comida a partir de los alimentos que sí
 * matchean contra FOOD_DATABASE. Los que no matchean simplemente no suman.
 * @param {{items: {food: string}[]}} meal
 */
export const getMealTotals = meal => {
  return (meal?.items || []).reduce(
    (totals, item) => {
      const match = findFoodMatch(item.food);
      return {
        calories: totals.calories + (match?.calories ?? 0),
        protein: totals.protein + (match?.protein ?? 0),
      };
    },
    {calories: 0, protein: 0},
  );
};

const MEAL_ICONS = {
  [DIET_TIME_KEYS.DESAYUNO]: faMugHot,
  [DIET_TIME_KEYS.MEDIAMANIANA]: faAppleWhole,
  [DIET_TIME_KEYS.ALMUERZO]: faUtensils,
  [DIET_TIME_KEYS.MERIENDA]: faCookie,
  [DIET_TIME_KEYS.MEDIATARDE]: faAppleWhole,
  [DIET_TIME_KEYS.CENA]: faMoon,
  [DIET_TIME_KEYS.COLACION]: faCookie,
  [DIET_TIME_KEYS.PREENTRENO]: faDumbbell,
  [DIET_TIME_KEYS.POSTENTRENO]: faDumbbell,
};

/** Ícono representativo para el tipo de comida (Desayuno, Almuerzo, etc). */
export const getMealIcon = mealName => MEAL_ICONS[mealName] || faBowlFood;
