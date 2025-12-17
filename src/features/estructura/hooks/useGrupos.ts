import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gruposApi, type CreateGrupoData, type UpdateGrupoData } from '@/api/grupos.api';
import toast from 'react-hot-toast';

export const useGrupos = () => {
  const queryClient = useQueryClient();

  const { data: grupos, isLoading, error } = useQuery({
    queryKey: ['grupos'],
    queryFn: gruposApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateGrupoData) => gruposApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grupos'] });
      toast.success('Grupo creado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al crear grupo');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateGrupoData }) =>
      gruposApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grupos'] });
      toast.success('Grupo actualizado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al actualizar grupo');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => gruposApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grupos'] });
      toast.success('Grupo eliminado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al eliminar grupo');
    },
  });

  return {
    grupos: grupos || [],
    isLoading,
    error,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
