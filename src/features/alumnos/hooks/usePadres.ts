import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { padresApi, type CreatePadreData, type UpdatePadreData } from '@/api/padres.api'
import { toast } from 'react-hot-toast'

export const usePadres = () => {
  const queryClient = useQueryClient()

  const { data: padres, isLoading } = useQuery({
    queryKey: ['padres'],
    queryFn: padresApi.getAll,
  })

  const createMutation = useMutation({
    mutationFn: padresApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['padres'] })
      toast.success('Padre/Tutor creado exitosamente')
    },
    onError: () => {
      toast.error('Error al crear padre/tutor')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePadreData }) =>
      padresApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['padres'] })
      toast.success('Padre/Tutor actualizado exitosamente')
    },
    onError: () => {
      toast.error('Error al actualizar padre/tutor')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: padresApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['padres'] })
      toast.success('Padre/Tutor eliminado exitosamente')
    },
    onError: () => {
      toast.error('Error al eliminar padre/tutor')
    },
  })

  const attachAlumnoMutation = useMutation({
    mutationFn: ({
      padreId,
      alumnoId,
      pivotData,
    }: {
      padreId: number
      alumnoId: number
      pivotData: {
        parentesco: 'padre' | 'madre' | 'tutor' | 'abuelo' | 'otro'
        responsable_pagos: boolean
        contacto_emergencia: boolean
      }
    }) => padresApi.attachAlumno(padreId, alumnoId, pivotData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumnos'] })
      queryClient.invalidateQueries({ queryKey: ['padres'] })
      toast.success('Padre/Tutor vinculado al alumno')
    },
    onError: () => {
      toast.error('Error al vincular padre/tutor')
    },
  })

  const detachAlumnoMutation = useMutation({
    mutationFn: ({ padreId, alumnoId }: { padreId: number; alumnoId: number }) =>
      padresApi.detachAlumno(padreId, alumnoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumnos'] })
      queryClient.invalidateQueries({ queryKey: ['padres'] })
      toast.success('Padre/Tutor desvinculado del alumno')
    },
    onError: () => {
      toast.error('Error al desvincular padre/tutor')
    },
  })

  return {
    padres,
    isLoading,
    create: (data: CreatePadreData) => createMutation.mutateAsync(data),
    update: (id: number, data: UpdatePadreData) =>
      updateMutation.mutateAsync({ id, data }),
    delete: (id: number) => deleteMutation.mutateAsync(id),
    attachAlumno: (
      padreId: number,
      alumnoId: number,
      pivotData: {
        parentesco: 'padre' | 'madre' | 'tutor' | 'abuelo' | 'otro'
        responsable_pagos: boolean
        contacto_emergencia: boolean
      }
    ) => attachAlumnoMutation.mutateAsync({ padreId, alumnoId, pivotData }),
    detachAlumno: (padreId: number, alumnoId: number) =>
      detachAlumnoMutation.mutateAsync({ padreId, alumnoId }),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

export const usePadre = (id: number) => {
  return useQuery({
    queryKey: ['padres', id],
    queryFn: () => padresApi.getById(id),
    enabled: !!id,
  })
}

export const usePadreAlumnos = (padreId: number) => {
  return useQuery({
    queryKey: ['padres', padreId, 'alumnos'],
    queryFn: () => padresApi.getAlumnos(padreId),
    enabled: !!padreId,
  })
}

export const useSearchPadres = (query: string) => {
  return useQuery({
    queryKey: ['padres', 'search', query],
    queryFn: () => padresApi.search(query),
    enabled: query.length > 2,
  })
}
