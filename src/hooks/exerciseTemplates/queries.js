import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  createExerciseTemplate,
  getExerciseTemplatesByTrainer,
  searchExerciseTemplates,
} from './endpoints';

export const useSearchExerciseTemplates = params => {
  return useQuery({
    queryKey: ['exercise-templates', params],
    queryFn: () => searchExerciseTemplates(params),
  });
};

export const useGetExerciseTemplatesByTrainer = trainerId => {
  return useQuery({
    queryKey: ['exercise-templates-by-trainer', trainerId],
    queryFn: () => getExerciseTemplatesByTrainer(trainerId),
    enabled: !!trainerId,
  });
};

export const useCreateExerciseTemplateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-exercise-template'],
    mutationFn: data => createExerciseTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['exercise-templates']});
    },
  });
};
