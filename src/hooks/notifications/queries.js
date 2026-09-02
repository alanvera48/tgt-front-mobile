import {useMutation} from '@tanstack/react-query';
import {registerFcmToken} from './endpoints';

export const useRegisterPushToken = () => {
  return useMutation({
    mutationKey: ['register-push-token'],
    mutationFn: token => registerFcmToken(token),
  });
};
