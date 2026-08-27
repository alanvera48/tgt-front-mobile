import {useQuery} from '@tanstack/react-query';
import {getFeed, getPostById} from './endpoints';

export const useGetFeed = (trainerId, {enabled = true} = {}) => {
  return useQuery({
    queryKey: ['feed', trainerId],
    queryFn: () => getFeed(trainerId),
    enabled: !!trainerId && enabled,
  });
};

export const useGetPostById = postId => {
  return useQuery({
    queryKey: ['feed', 'post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};
