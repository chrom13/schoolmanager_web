import apiClient from './client'
import type { Padre } from '@/types/alumnos.types'

export interface CreatePadreData {
  nombre_completo: string
  email?: string
  telefono?: string
  rfc?: string
  regimen_fiscal?: string
  uso_cfdi?: string
  codigo_postal?: string
}

export interface UpdatePadreData {
  nombre_completo?: string
  email?: string
  telefono?: string
  rfc?: string
  regimen_fiscal?: string
  uso_cfdi?: string
  codigo_postal?: string
  activo?: boolean
}

export const padresApi = {
  getAll: async (): Promise<Padre[]> => {
    const { data } = await apiClient.get('/padres')
    return data.data
  },

  getById: async (id: number): Promise<Padre> => {
    const { data } = await apiClient.get(`/padres/${id}`)
    return data.data
  },

  search: async (query: string): Promise<Padre[]> => {
    const { data } = await apiClient.get('/padres/search', {
      params: { q: query },
    })
    return data.data
  },

  create: async (padreData: CreatePadreData): Promise<Padre> => {
    const { data } = await apiClient.post('/padres', padreData)
    return data.data
  },

  update: async (id: number, padreData: UpdatePadreData): Promise<Padre> => {
    const { data } = await apiClient.put(`/padres/${id}`, padreData)
    return data.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/padres/${id}`)
  },

  // Obtener alumnos de un padre
  getAlumnos: async (padreId: number) => {
    const { data } = await apiClient.get(`/padres/${padreId}/alumnos`)
    return data.data
  },

  // Vincular padre con alumno
  attachAlumno: async (
    padreId: number,
    alumnoId: number,
    pivotData: {
      parentesco: 'padre' | 'madre' | 'tutor' | 'abuelo' | 'otro'
      responsable_pagos: boolean
      contacto_emergencia: boolean
    }
  ) => {
    const { data } = await apiClient.post(
      `/padres/${padreId}/alumnos/${alumnoId}`,
      pivotData
    )
    return data.data
  },

  // Desvincular padre de alumno
  detachAlumno: async (padreId: number, alumnoId: number) => {
    await apiClient.delete(`/padres/${padreId}/alumnos/${alumnoId}`)
  },

  // Actualizar datos del pivot
  updatePivot: async (
    padreId: number,
    alumnoId: number,
    pivotData: {
      parentesco?: 'padre' | 'madre' | 'tutor' | 'abuelo' | 'otro'
      responsable_pagos?: boolean
      contacto_emergencia?: boolean
    }
  ) => {
    const { data } = await apiClient.put(
      `/padres/${padreId}/alumnos/${alumnoId}`,
      pivotData
    )
    return data.data
  },
}
