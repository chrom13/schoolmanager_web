import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  materiasApi,
  type CreateMateriaData,
  type UpdateMateriaData,
  type AsignarGrupoData,
} from '@/api/materias.api';
import toast from 'react-hot-toast';

export const useMaterias = () => {
  const queryClient = useQueryClient();

  const { data: materias, isLoading, error } = useQuery({
    queryKey: ['materias'],
    queryFn: materiasApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateMateriaData) => materiasApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materias'] });
      toast.success('Materia creada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al crear materia');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMateriaData }) =>
      materiasApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materias'] });
      toast.success('Materia actualizada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al actualizar materia');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => materiasApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materias'] });
      toast.success('Materia eliminada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al eliminar materia');
    },
  });

  const asignarGrupoMutation = useMutation({
    mutationFn: ({ materiaId, data }: { materiaId: number; data: AsignarGrupoData }) =>
      materiasApi.asignarGrupo(materiaId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materias'] });
      toast.success('Grupo asignado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al asignar grupo');
    },
  });

  const desasignarGrupoMutation = useMutation({
    mutationFn: ({ materiaId, grupoId }: { materiaId: number; grupoId: number }) =>
      materiasApi.desasignarGrupo(materiaId, grupoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materias'] });
      toast.success('Grupo desasignado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al desasignar grupo');
    },
  });

  return {
    materias: materias || [],
    isLoading,
    error,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    asignarGrupo: asignarGrupoMutation.mutate,
    desasignarGrupo: desasignarGrupoMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isAssigning: asignarGrupoMutation.isPending,
  };
};
