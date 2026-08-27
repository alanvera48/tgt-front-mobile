import axiosInstance from '../../helpers/api';

export const createOrUpdateDiet = async (diet, diet_id = null) => {
  if (diet_id) {
    const response = await axiosInstance.put(`/api/diets/${diet_id}`, {
      ...diet,
    });
    return response.data;
  }
  const response = await axiosInstance.post('/api/diets', {
    ...diet,
  });
  return response.data;
};

export const getChampDiets = async () => {
  const response = await axiosInstance.get('/api/diet-champs');
  return response.data;
};

export const getChampDietsByChampId = async id => {
  const response = await axiosInstance.get(`/api/diets/diets-champs/${id}`);
  return response.data;
};

export const getDietsCreatedByTrainer = async () => {
  const response = await axiosInstance.get('/api/diets/trainer');
  return response.data;
};

export const getDietById = async id => {
  const response = await axiosInstance.get(`/api/diets/${id}`);
  return response.data;
};

export const getShoppingListDietById = async id => {
  const response = await axiosInstance.get(`/api/diets/${id}/shopping-list`);
  return response.data;
};

export const assignDiet = async data => {
  const response = await axiosInstance.post('/api/diet-champs', data);
  return response.data;
};

export const getFoods = async () => {
  const response = await axiosInstance.get('/api/diets/foods-list');
  return response.data;
};

export const unassignDiet = async ({diet_id, user_id}) => {
  const response = await axiosInstance.delete(
    `/api/diets/${diet_id}/unassign/${user_id}`,
  );
  return response.data;
};

export const getDietChampsByDietId = async dietId => {
  const response = await axiosInstance.get(`/api/diet-champs/diet/${dietId}`);
  return response.data;
};
