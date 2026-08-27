import axiosInstance from '../../helpers/api';
import GetLocation from 'react-native-get-location';

export const getGyms = async () => {
  const response = await axiosInstance.get('/api/gym');
  return response.data;
};

export const getTrainerByGym = async placeId => {
  const response = await axiosInstance.get(`/api/gyms/${placeId}`);
  return response.data;
};

export const getTrainerInfoOfGym = async trainerId => {
  const response = await axiosInstance.get(`/api/gyms/trainers/${trainerId}`);
  return response.data;
};

export const postReview = async data => {
  const response = await axiosInstance.post('/api/reviews', data);
  return response.data;
};

export const getReviewsPagination = async (trainerId, pageParam) => {
  const response = await axiosInstance.get(`/api/reviews/${trainerId}`, {
    params: {
      page: pageParam,
      limit: 10,
    },
  });
  return response.data;
};

export const createTrainersGymRelation = async data => {
  const response = await axiosInstance.post('/api/gyms/bulk-register', data);
  return response.data;
};

export const getCurrentLocation = async () => {
  const response = await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  });
  return response;
};
