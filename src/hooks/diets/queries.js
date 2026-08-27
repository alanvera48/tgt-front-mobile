import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  assignDiet,
  createOrUpdateDiet,
  getDietById,
  getChampDiets,
  getDietsCreatedByTrainer,
  getFoods,
  getShoppingListDietById,
  getChampDietsByChampId,
  unassignDiet,
  getDietChampsByDietId,
} from './endpoints';

export const useCreateOrUpdateDiet = diet_id => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-or-edit-diet'],
    mutationFn: diet => createOrUpdateDiet(diet, diet_id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['diets']});
    },
  });
};

export const useGetChampDiets = ({enabled = true} = {}) => {
  return useQuery({
    queryKey: ['champ-diets-assigned'],
    queryFn: () => getChampDiets(),
    enabled,
  });
};

export const useGetChampDietsByChampId = id => {
  return useQuery({
    queryKey: ['champ-diets', id],
    queryFn: () => getChampDietsByChampId(id),
  });
};

export const useGetDietsCreatedByTrainer = () => {
  return useQuery({
    queryKey: ['diets'],
    queryFn: () => getDietsCreatedByTrainer(),
  });
};

export const useGetDietById = id => {
  return useQuery({
    queryKey: ['diet', id],
    queryFn: () => getDietById(id),
  });
};

export const useGetShoppingListDietById = id => {
  return useQuery({
    queryKey: ['shopping-list', id],
    queryFn: () => getShoppingListDietById(id),
  });
};

export const useAssignDiet = () => {
  return useMutation({
    mutationFn: data => assignDiet(data),
  });
};

export const useGetFoods = () => {
  return useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const response = await getFoods();

      return response
        .map(food => ({
          label: food.name,
          value: food.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    },
  });
};

export const useUnassignDietMutation = () => {
  return useMutation({
    mutationFn: data => unassignDiet(data),
  });
};

export const useGetDietChampsByDietId = dietId => {
  return useQuery({
    queryKey: ['diet-champs', dietId],
    queryFn: () => getDietChampsByDietId(dietId),
    enabled: !!dietId,
  });
};
