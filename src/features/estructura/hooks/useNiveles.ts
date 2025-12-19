import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { nivelesApi, type CreateNivelData, type UpdateNivelData } from '@/api/niveles.api';
import toast from 'react-hot-toast';

export const useNiveles = () => {
  const queryClient = useQueryClient();

  const { data: niveles, isLoading, error } = useQuery({
    queryKey: ['niveles'],
    queryFn: nivelesApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateNivelData) => nivelesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['niveles'] });
      toast.success('Nivel creado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al crear nivel');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNivelData }) =>
      nivelesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['niveles'] });
      toast.success('Nivel actualizado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al actualizar nivel');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => nivelesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['niveles'] });
      toast.success('Nivel eliminado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al eliminar nivel');
    },
  });

  return {
    niveles: niveles || [],
    isLoading,
    error,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    deleteMutation, // Export the whole mutation so we can access isPending
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
