import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createTrainersGymRelation,
  getCurrentLocation,
  getGyms,
  getReviewsPagination,
  getTrainerByGym,
  getTrainerInfoOfGym,
  postReview,
} from './endpoints';
import {
  getNearbyPlaces,
  NEARBY_PLACES_RADIUS_METERS,
} from '../../utils/getPlaces';

export const useGetGyms = () => {
  return useQuery({
    queryKey: ['gym'],
    queryFn: () => getGyms(),
  });
};

export const usePostTrainersGym = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['trainer-gym'],
    mutationFn: data => createTrainersGymRelation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['gym']});
    },
  });
};

export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['post-review'],
    mutationFn: data => postReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['reviews']});
    },
  });
};

export const useGetReviewsOfTrainer = id => {
  return useInfiniteQuery({
    queryKey: ['reviews', id],
    queryFn: ({pageParam}) => getReviewsPagination(id, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.reviews?.length === 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

export const useGetAlreadyRated = trainerId => {
  return useQuery({
    queryKey: ['already-rated', trainerId],
    queryFn: () => getReviewsPagination(trainerId, 1),
    enabled: !!trainerId,
    select: data => data.alreadyRated,
  });
};

export const useGetCurrentLocation = () => {
  return useQuery({
    queryKey: ['current-location'],
    queryFn: () => getCurrentLocation(),
  });
};

export const useGetNearbyPlaces = (latitude, longitude) => {
  return useQuery({
    queryKey: ['nearby-places'],
    queryFn: () =>
      getNearbyPlaces(latitude, longitude, NEARBY_PLACES_RADIUS_METERS),
    gcTime: 0,
    staleTime: 0,
  });
};

export const useGetTrainersByGym = placeId => {
  return useQuery({
    queryKey: ['trainers', placeId],
    queryFn: () => getTrainerByGym(placeId),
    enabled: !!placeId,
  });
};

export const useGetTrainerInfoOfGym = trainerId => {
  return useQuery({
    queryKey: ['trainers', 'info', trainerId],
    queryFn: () => getTrainerInfoOfGym(trainerId),
    enabled: !!trainerId,
  });
};
