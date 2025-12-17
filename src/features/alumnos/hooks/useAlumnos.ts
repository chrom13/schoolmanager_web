import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { alumnosApi } from '@/api/alumnos.api'
import type { CreateAlumnoData, UpdateAlumnoData } from '@/types/alumnos.types'
import toast from 'react-hot-toast'

export const useAlumnos = () => {
  const queryClient = useQueryClient()

  const { data: alumnos, isLoading } = useQuery({
    queryKey: ['alumnos'],
    queryFn: alumnosApi.getAll,
  })

  const create = useMutation({
    mutationFn: alumnosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumnos'] })
      toast.success('Alumno creado exitosamente')
    },
    onError: () => {
      toast.error('Error al crear alumno')
    },
  })

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAlumnoData }) =>
      alumnosApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumnos'] })
      toast.success('Alumno actualizado exitosamente')
    },
    onError: () => {
      toast.error('Error al actualizar alumno')
    },
  })

  const deleteAlumno = useMutation({
    mutationFn: alumnosApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumnos'] })
      toast.success('Alumno eliminado exitosamente')
    },
    onError: () => {
      toast.error('Error al eliminar alumno')
    },
  })

  return {
    alumnos,
    isLoading,
    create,
    update,
    delete: deleteAlumno,
  }
}

export const useAlumnoSearch = (query: string) => {
  return useQuery({
    queryKey: ['alumnos', 'search', query],
    queryFn: () => alumnosApi.search(query),
    enabled: query.length > 0,
  })
}

export const useAlumnosByGrupo = (grupoId: number | undefined) => {
  return useQuery({
    queryKey: ['alumnos', 'grupo', grupoId],
    queryFn: () => alumnosApi.filterByGrupo(grupoId!),
    enabled: !!grupoId,
  })
}
