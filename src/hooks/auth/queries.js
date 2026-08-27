import {useMutation} from '@tanstack/react-query';
import {
  createUser,
  createUserChamp,
  logIn,
  logInWithGoogle,
  logInWithApple,
  requestConfirmationCode,
  verifyCode,
  changePassword,
  verifyRegistration,
  completeRegistration,
} from './endpoints';

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: user => createUser(user),
  });
};

export const useCreateUserChamp = () => {
  return useMutation({
    mutationKey: ['create-user-champ'],
    mutationFn: user => createUserChamp(user),
  });
};

export const useLogIn = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: logIn,
  });
};

export const useLogInWithGoogle = () => {
  return useMutation({
    mutationKey: ['login-google'],
    mutationFn: logInWithGoogle,
  });
};

export const useLogInWithApple = () => {
  return useMutation({
    mutationKey: ['login-apple'],
    mutationFn: logInWithApple,
  });
};

export const useRequestConfirmationCode = () => {
  return useMutation({
    mutationFn: email => requestConfirmationCode(email),
  });
};

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: ({email, code}) => verifyCode({email, code}),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({email, code, newPassword}) =>
      changePassword({email, code, newPassword}),
  });
};

export const useVerifyRegistration = () => {
  return useMutation({
    mutationFn: token => verifyRegistration(token),
  });
};

export const useCompleteRegistration = () => {
  return useMutation({
    mutationFn: ({token, password}) => completeRegistration({token, password}),
  });
};
