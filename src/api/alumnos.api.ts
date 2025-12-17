import apiClient from './client'
import type {
  Alumno,
  CreateAlumnoData,
  UpdateAlumnoData,
  Tutor,
  CreateTutorData,
  UpdateTutorData,
} from '@/types/alumnos.types'

export const alumnosApi = {
  // Alumnos
  getAll: async (): Promise<Alumno[]> => {
    const { data } = await apiClient.get('/alumnos')
    return data.data
  },

  getById: async (id: number): Promise<Alumno> => {
    const { data } = await apiClient.get(`/alumnos/${id}`)
    return data.data
  },

  create: async (alumnoData: CreateAlumnoData): Promise<Alumno> => {
    const { data } = await apiClient.post('/alumnos', alumnoData)
    return data.data
  },

  update: async (id: number, alumnoData: UpdateAlumnoData): Promise<Alumno> => {
    const { data } = await apiClient.put(`/alumnos/${id}`, alumnoData)
    return data.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/alumnos/${id}`)
  },

  search: async (query: string): Promise<Alumno[]> => {
    const { data } = await apiClient.get('/alumnos/search', {
      params: { q: query },
    })
    return data.data
  },

  filterByGrupo: async (grupoId: number): Promise<Alumno[]> => {
    const { data } = await apiClient.get('/alumnos', {
      params: { grupo_id: grupoId },
    })
    return data.data
  },
}

export const tutoresApi = {
  getAll: async (): Promise<Tutor[]> => {
    const { data } = await apiClient.get('/tutores')
    return data.data
  },

  getById: async (id: number): Promise<Tutor> => {
    const { data } = await apiClient.get(`/tutores/${id}`)
    return data.data
  },

  create: async (tutorData: CreateTutorData): Promise<Tutor> => {
    const { data } = await apiClient.post('/tutores', tutorData)
    return data.data
  },

  update: async (id: number, tutorData: UpdateTutorData): Promise<Tutor> => {
    const { data } = await apiClient.put(`/tutores/${id}`, tutorData)
    return data.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/tutores/${id}`)
  },
}
