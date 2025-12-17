import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tutoresApi } from '@/api/alumnos.api'
import type { CreateTutorData, UpdateTutorData } from '@/types/alumnos.types'
import toast from 'react-hot-toast'

export const useTutores = () => {
  const queryClient = useQueryClient()

  const { data: tutores, isLoading } = useQuery({
    queryKey: ['tutores'],
    queryFn: tutoresApi.getAll,
  })

  const create = useMutation({
    mutationFn: tutoresApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutores'] })
      toast.success('Tutor creado exitosamente')
    },
    onError: () => {
      toast.error('Error al crear tutor')
    },
  })

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTutorData }) =>
      tutoresApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutores'] })
      toast.success('Tutor actualizado exitosamente')
    },
    onError: () => {
      toast.error('Error al actualizar tutor')
    },
  })

  const deleteTutor = useMutation({
    mutationFn: tutoresApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutores'] })
      toast.success('Tutor eliminado exitosamente')
    },
    onError: () => {
      toast.error('Error al eliminar tutor')
    },
  })

  return {
    tutores,
    isLoading,
    create,
    update,
    delete: deleteTutor,
  }
}
