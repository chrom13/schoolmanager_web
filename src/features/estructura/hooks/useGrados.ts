import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gradosApi, type CreateGradoData, type UpdateGradoData } from '@/api/grados.api';
import toast from 'react-hot-toast';

export const useGrados = () => {
  const queryClient = useQueryClient();

  const { data: grados, isLoading, error } = useQuery({
    queryKey: ['grados'],
    queryFn: gradosApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateGradoData) => gradosApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grados'] });
      toast.success('Grado creado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al crear grado');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateGradoData }) =>
      gradosApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grados'] });
      toast.success('Grado actualizado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al actualizar grado');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => gradosApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grados'] });
      toast.success('Grado eliminado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al eliminar grado');
    },
  });

  return {
    grados: grados || [],
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
