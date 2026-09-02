import axiosInstance from '../../helpers/api';

export const searchExerciseTemplates = async ({
  name,
  category,
  muscleGroup,
  isFavorite,
} = {}) => {
  const params = {};
  if (name) {
    params.name = name;
  }
  if (category) {
    params.category = category;
  }
  if (muscleGroup) {
    params.muscleGroup = muscleGroup;
  }
  if (isFavorite != null) {
    params.isFavorite = isFavorite;
  }

  const response = await axiosInstance.get('/api/exercise-templates/search', {
    params,
  });
  return response.data;
};

export const createExerciseTemplate = async data => {
  const response = await axiosInstance.post('/api/exercise-templates', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
