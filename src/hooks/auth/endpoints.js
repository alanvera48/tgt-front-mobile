import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../helpers/api';

export const createUser = async user => {
  const response = await axiosInstance.post('/api/users', {
    ...user,
  });
  await AsyncStorage.setItem('USER_TOKEN', response.data.token);
  await AsyncStorage.setItem(
    'USER_DATA',
    JSON.stringify(response.data.createdUser),
  );
  return response.data;
};

export const createUserChamp = async user => {
  const response = await axiosInstance.post('/api/users/create-champ', {
    ...user,
  });
  return response?.data;
};

export const authenticateUser = async () => {
  const response = await axiosInstance.get('/api/auth/me');
  return response.data;
};

export const logIn = async user => {
  const response = await axiosInstance.post('/api/auth/login', {
    ...user,
  });

  if (response.data.token) {
    await AsyncStorage.setItem('USER_TOKEN', response.data.token);
    await AsyncStorage.setItem('USER_DATA', JSON.stringify(response.data.user));
  }

  return response.data;
};

export const logInWithGoogle = async ({credential, role}) => {
  const response = await axiosInstance.post('/api/auth/google', {
    credential,
    role,
  });

  if (response.data.token) {
    await AsyncStorage.setItem('USER_TOKEN', response.data.token);
    await AsyncStorage.setItem('USER_DATA', JSON.stringify(response.data.user));
  }

  return response.data;
};

export const logInWithApple = async ({credential, role}) => {
  const response = await axiosInstance.post('/api/auth/apple', {
    credential,
    role,
  });

  if (response.data.token) {
    await AsyncStorage.setItem('USER_TOKEN', response.data.token);
    await AsyncStorage.setItem('USER_DATA', JSON.stringify(response.data.user));
  }

  return response.data;
};

export const requestConfirmationCode = async email => {
  const response = await axiosInstance.post(
    '/api/users/request-confirmation-code',
    {email},
  );
  return response.data;
};

export const verifyCode = async ({email, code}) => {
  const response = await axiosInstance.post('/api/users/verify-code', {
    email,
    code,
  });
  return response.data;
};

export const changePassword = async ({email, code, newPassword}) => {
  const response = await axiosInstance.post('/api/users/change-password', {
    email,
    code,
    newPassword,
  });
  return response.data;
};

export const verifyRegistration = async token => {
  const response = await axiosInstance.post('/api/users/verify-registration', {
    token,
  });
  return response.data;
};

export const completeRegistration = async ({token, password}) => {
  const response = await axiosInstance.post(
    '/api/users/complete-registration',
    {token, password},
  );
  return response.data;
};
