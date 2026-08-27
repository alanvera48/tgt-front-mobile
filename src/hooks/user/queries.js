import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {authenticateUser} from '../auth/endpoints';
import {
  approvedChamp,
  connectUserToTrainer,
  createUserAddress,
  createUserOnboarding,
  getChampById,
  getMyChamps,
  onboardingTrainer,
  updateChampProgress,
  updateProfile,
  updateProfilePic,
  getChampProgress,
  getChampProgressBeingTrainer,
  userIsConnected,
  unlinkTrainerFromChamp,
  dismissChampRequest,
} from './endpoints';

export const useAuthenticateUser = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => authenticateUser(),
  });
};

export const useOnboardingTrainer = () => {
  return useMutation({
    mutationKey: ['onboarding-trainer'],
    mutationFn: data => onboardingTrainer(data),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-profile'],
    mutationFn: data => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['profile']});
    },
  });
};

export const useUpdateProfilePic = () => {
  return useMutation({
    mutationKey: ['update-profile-pic'],
    mutationFn: image => updateProfilePic(image),
  });
};

export const useGetMyChamps = () => {
  return useQuery({
    queryKey: ['myChamps'],
    queryFn: getMyChamps,
  });
};

export const useGetMyChampById = id => {
  return useQuery({
    queryKey: ['myChamp', id],
    queryFn: () => getChampById(id),
  });
};

export const useApprovedChamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['approved-champ'],
    mutationFn: id => approvedChamp(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['myChamp']});
      queryClient.invalidateQueries({queryKey: ['myChamps']});
    },
  });
};

export const useCreateUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user-address'],
    mutationFn: data => createUserAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['profile']});
    },
  });
};

export const useConnectUserToTrainer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['connect-champ-to-trainer'],
    mutationFn: id => connectUserToTrainer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['isConnected']});
    },
  });
};

export const useCreateOnboardingUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['onboarding-user'],
    mutationFn: data => createUserOnboarding(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['profile']});
    },
  });
};

export const useGetChampProgressBeingTrainer = ({champId, year}) => {
  return useQuery({
    queryKey: ['champ-progress-being-trainer', champId, year],
    queryFn: () => getChampProgressBeingTrainer({champId, year}),
  });
};

export const useGetChampProgress = ({champId, year, enabled}) => {
  return useQuery({
    queryKey: ['champ-progress', champId, year],
    queryFn: () => getChampProgress({champId, year}),
    enabled: !!enabled,
  });
};

export const useUpdateChampProgress = () => {
  return useMutation({
    mutationKey: ['update-champ-progress'],
    mutationFn: ({id, data}) => updateChampProgress(id, data),
  });
};

export const useIsConnected = (userId, {enabled = true} = {}) => {
  return useQuery({
    queryKey: ['isConnected', userId],
    queryFn: () => userIsConnected(),
    enabled: !!userId && enabled,
  });
};

export const useUnlinkTrainerFromChamp = trainerId => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['unlink-trainer-from-champ'],
    mutationFn: () => unlinkTrainerFromChamp(trainerId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['isConnected']});
    },
  });
};

export const useDismissChampRequest = trainerId => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['dismiss-champ-request'],
    mutationFn: () => dismissChampRequest(trainerId),
    onSuccess: () => {
      queryClient.resetQueries({queryKey: ['isConnected']});
    },
  });
};
