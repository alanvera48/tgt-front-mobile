import axios from 'axios';
import Config from 'react-native-config';
import {translateFoodToEnglish} from '../../constants/foodTranslations';

const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

// DEMO_KEY funciona sin registrarse pero con un límite de requests bajo.
// Para producción, sacar una key gratis en https://fdc.nal.usda.gov/api-key-signup
const getApiKey = () => Config.USDA_API_KEY || 'DEMO_KEY';

/**
 * Busca un alimento en USDA FoodData Central. USDA solo indexa en inglés,
 * así que primero se traduce el término con el diccionario ES→EN.
 * @param {string} query Nombre del alimento en español
 * @returns {Promise<Array<{fdcId: number, name: string, calories: number|null, protein: number|null}>>}
 */
export const searchFoodNutrition = async query => {
  const englishQuery = translateFoodToEnglish(query);

  const response = await axios.get(`${USDA_BASE_URL}/foods/search`, {
    params: {
      query: englishQuery,
      pageSize: 15,
      // SR Legacy siempre trae los macros básicos (Energy/Protein). Los
      // registros "Foundation" a veces solo miden un subset de nutrientes
      // de investigación y no traen ni calorías ni proteína.
      dataType: 'SR Legacy',
      api_key: getApiKey(),
    },
  });

  return (response.data?.foods || [])
    .map(food => {
      const findNutrient = (name, unit) =>
        food.foodNutrients?.find(
          n => n.nutrientName === name && n.unitName === unit,
        )?.value ?? null;

      return {
        fdcId: food.fdcId,
        name: food.description,
        // Los valores de USDA son por 100g, igual que FOOD_DATABASE local.
        calories: findNutrient('Energy', 'KCAL'),
        protein: findNutrient('Protein', 'G'),
      };
    })
    .filter(food => food.calories != null && food.protein != null);
};
