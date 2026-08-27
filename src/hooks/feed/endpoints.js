import axiosInstance from '../../helpers/api';

export const getFeed = async trainerId => {
  const response = await axiosInstance.get('/api/feed', {
    params: {trainerId},
  });
  return response.data;
};

export const getPostById = async postId => {
  const response = await axiosInstance.get(`/api/feed/${postId}`);
  return response.data;
};
