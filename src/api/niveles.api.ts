import apiClient from './client';
import type { Nivel } from '@/types/models';

export interface CreateNivelData {
  nombre: 'preescolar' | 'primaria' | 'secundaria' | 'preparatoria';
}

export interface UpdateNivelData {
  nombre?: 'preescolar' | 'primaria' | 'secundaria' | 'preparatoria';
  activo?: boolean;
}

export const nivelesApi = {
  getAll: async (): Promise<Nivel[]> => {
    const { data } = await apiClient.get('/niveles');
    return data.data;
  },

  getById: async (id: number): Promise<Nivel> => {
    const { data } = await apiClient.get(`/niveles/${id}`);
    return data.data;
  },

  create: async (nivelData: CreateNivelData): Promise<Nivel> => {
    const { data } = await apiClient.post('/niveles', nivelData);
    return data.data;
  },

  update: async (id: number, nivelData: UpdateNivelData): Promise<Nivel> => {
    const { data } = await apiClient.put(`/niveles/${id}`, nivelData);
    return data.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/niveles/${id}`);
  },
};
