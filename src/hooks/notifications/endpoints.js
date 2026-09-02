import axiosInstance from '../../helpers/api';

export const registerFcmToken = async fcmToken => {
  const response = await axiosInstance.post(
    '/api/notifications/register-token',
    {
      fcmToken,
    },
  );
  return response.data;
};
