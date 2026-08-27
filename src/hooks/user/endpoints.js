import axiosInstance from '../../helpers/api';
import {buildImageFormData} from '../../utils/formData';

export const getMyChamps = async () => {
  const response = await axiosInstance.get(
    '/api/userxtrainer/users-by-trainer',
  );
  return response.data;
};

export const getChampById = async id => {
  const response = await axiosInstance.get(`/api/userxtrainer/user-info/${id}`);
  return response.data;
};

export const approvedChamp = async id => {
  const response = await axiosInstance.put(
    '/api/userxtrainer/aproved-trainer-user',
    {id: id},
  );
  return response.data;
};

export const connectUserToTrainer = async id => {
  const response = await axiosInstance.post('/api/userxtrainer/user-trainer', {
    trainerId: id.trainerId,
  });
  return response.data;
};

export const userIsConnected = async () => {
  const response = await axiosInstance.get('/api/userxtrainer/user-trainer');
  return response.data;
};

export const createUserOnboarding = async data => {
  const response = await axiosInstance.post('/api/onboarding-user', data);
  return response.data;
};

export const createUserAddress = async data => {
  const response = await axiosInstance.post('/api/user-address', data);
  return response.data;
};

export const updateProfilePic = async image => {
  const formData = buildImageFormData({
    fieldName: 'images',
    image,
    fileName: image.filename || 'me.jpg',
  });

  const response = await axiosInstance.put(
    '/api/users/update-profile-image/user',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const onboardingTrainer = async data => {
  const response = await axiosInstance.post('/api/onboarding-trainers', data);
  return response.data;
};

export const updateProfile = async data => {
  const response = await axiosInstance.put('/api/users/profile', data);
  return response.data;
};

export const getChampProgressBeingTrainer = async ({champId, year}) => {
  const response = await axiosInstance.get(
    `/api/champ-progress?champId=${champId}&startDate=${year}-01-01&endDate=${year}-12-01`,
  );
  return response.data;
};

export const getChampProgress = async ({champId, year}) => {
  const response = await axiosInstance.get(
    `/api/champ-progress?champId=${champId}&startDate=${year}-01-01&endDate=${year}-12-01`,
  );
  if (response.data.length === 0) {
    const secondResponse = await axiosInstance.post('/api/champ-progress', {
      year: year,
    });
    return secondResponse.data;
  }
  return response.data;
};

export const unlinkTrainerFromChamp = async trainerId => {
  const response = await axiosInstance.delete(
    `/api/userxtrainer/unlink/champ/${trainerId}`,
  );
  return response.data;
};

export const dismissChampRequest = async trainerId => {
  const response = await axiosInstance.delete(
    `/api/userxtrainer/dismiss/champ/${trainerId}`,
  );
  return response.data;
};

export const updateChampProgress = async (id, data) => {
  const formData = buildImageFormData({
    fieldName: 'newPhoto',
    image: data.newPhoto,
    fileName: `${data.keyPhoto}.jpg`,
  });

  formData.append('keyPhoto', data.keyPhoto);

  const response = await axiosInstance.put(
    `/api/champ-progress/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};
