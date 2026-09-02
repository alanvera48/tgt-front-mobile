import {FOOD_DATABASE} from '../constants/diets';

const RECOMMENDATION_COUNT = 8;

// Estrategia de selección por objetivo del champ (constants/goal.js), usando
// solo datos que ya tenemos en FOOD_DATABASE (categoría, calorías, proteína
// por 100g) — sin inventar macros que no medimos.
const GOAL_STRATEGIES = {
  MASA_MUSCULAR: {
    label: 'Para ganar masa muscular',
    categories: ['proteinas', 'carbohidratos'],
    sortBy: food => -food.protein,
  },
  QUEMAR_GRASAS: {
    label: 'Para quemar grasa',
    categories: ['proteinas'],
    sortBy: food => food.calories,
  },
  QUEMAR_GRASA_Y_TONIFICAR: {
    label: 'Para quemar grasa y tonificar',
    categories: ['proteinas', 'grasas'],
    sortBy: food => -(food.protein / food.calories),
  },
};

const DEFAULT_STRATEGY = {
  label: 'Alimentos recomendados',
  categories: ['proteinas', 'carbohidratos', 'grasas'],
  sortBy: food => -food.protein,
};

/**
 * Devuelve una lista corta de alimentos de FOOD_DATABASE elegidos según el
 * objetivo del champ. No pide nada por red: es instantáneo y gratis.
 * @param {string} goal Valor de constants/goal.js (ej. 'MASA_MUSCULAR')
 */
export const getRecommendedFoods = goal => {
  const strategy = GOAL_STRATEGIES[goal] || DEFAULT_STRATEGY;

  const candidates = FOOD_DATABASE.filter(food =>
    strategy.categories.includes(food.category),
  );

  return {
    label: strategy.label,
    foods: [...candidates]
      .sort((a, b) => strategy.sortBy(a) - strategy.sortBy(b))
      .slice(0, RECOMMENDATION_COUNT),
  };
};
