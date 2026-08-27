import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  assignRutine,
  createOrUpdateRutine,
  getChampRutines,
  getChampRutinesAsTrainer,
  getMyRutines,
  getRutineById,
  saveRoutineHistory,
  unassignRutine,
  getRoutineHistory,
} from './endpoints';

export const useGetMyRutines = () => {
  return useQuery({
    queryKey: ['my-rutines'],
    queryFn: getMyRutines,
  });
};

export const useGetChampsRutines = ({enabled = true} = {}) => {
  return useQuery({
    queryKey: ['champRutines'],
    queryFn: () => getChampRutines(),
    enabled,
  });
};

export const useGetRutineById = id => {
  return useQuery({
    queryKey: ['rutine-id', id],
    queryFn: () => getRutineById(id),
  });
};

export const useCreateOrUpdateRutineMutation = rutine_id => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-or-update-rutine'],
    mutationFn: data => createOrUpdateRutine(data, rutine_id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['my-rutines']});
    },
  });
};

export const useAssignRutineMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['assign-rutine'],
    mutationFn: data => assignRutine(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['my-rutines']});
    },
  });
};

export const useUnassignRutineMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['unassign-rutine'],
    mutationFn: data => unassignRutine(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['my-rutines']});
      queryClient.invalidateQueries({queryKey: ['champRutines']});
    },
  });
};

export const useGetChampsRutinesAsTrainer = id => {
  return useQuery({
    queryKey: ['champRutinesTrainer', id],
    queryFn: () => getChampRutinesAsTrainer(id),
  });
};

export const useSaveRoutineHistoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['save-routine-history'],
    mutationFn: data => saveRoutineHistory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['champRutines']});
      queryClient.invalidateQueries({queryKey: ['champRutinesTrainer']});
    },
  });
};

export const useGetRoutineHistory = (month, year) => {
  return useQuery({
    queryKey: ['routineHistory', month, year],
    queryFn: () => getRoutineHistory(month, year),
  });
};
