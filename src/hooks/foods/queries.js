import {useQuery} from '@tanstack/react-query';
import {searchFoodNutrition} from './endpoints';

/**
 * Busca alimentos por nombre (en español) contra USDA FoodData Central.
 * Solo se dispara si `query` tiene al menos 3 caracteres, para no pegarle
 * a la API en cada tecla presionada.
 */
export const useSearchFoodNutrition = query => {
  return useQuery({
    queryKey: ['usda-food-search', query],
    queryFn: () => searchFoodNutrition(query),
    enabled: (query?.trim().length ?? 0) >= 3,
    staleTime: 1000 * 60 * 60, // 1 hora: la info nutricional no cambia
  });
};
