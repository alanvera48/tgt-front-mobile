import axiosInstance from '../../helpers/api';

export const getMyRutines = async () => {
  const response = await axiosInstance.get('/api/rutines');
  return response.data;
};

export const getChampRutines = async () => {
  const response = await axiosInstance.get(
    '/api/rutinesxchamps/champs-rutines',
  );
  return response.data;
};

export const getRutineById = async id => {
  const response = await axiosInstance.get(`/api/rutines/${id}`);
  return response.data;
};

export const createOrUpdateRutine = async (data, rutine_id = null) => {
  if (rutine_id) {
    const response = await axiosInstance.put(
      `/api/rutines/${rutine_id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  }
  const response = await axiosInstance.post('/api/rutines', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const createRutineHeader = async data => {
  const response = await axiosInstance.post('/api/rutines', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const createRutineExercise = async data => {
  const response = await axiosInstance.post('/api/rutines/exercise', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const assignRutine = async data => {
  const response = await axiosInstance.post(
    '/api/rutinesxchamps/assign-rutine',
    {
      ...data,
    },
  );
  return response.data;
};

export const unassignRutine = async body => {
  const response = await axiosInstance.post(
    '/api/rutinesxchamps/unassign-rutine',
    body,
  );
  return response.data;
};

export const getChampRutinesAsTrainer = async id => {
  const response = await axiosInstance.get(
    `/api/rutinesxchamps/trainer-champ-rutines/${id}`,
  );
  return response.data;
};

export const saveRoutineHistory = async data => {
  const response = await axiosInstance.post('/api/routine-history', data);
  return response.data;
};

export const getRoutineHistory = async (month, year) => {
  const response = await axiosInstance.get(
    `/api/routine-history?month=${month}&year=${year}`,
  );
  return response.data;
};
