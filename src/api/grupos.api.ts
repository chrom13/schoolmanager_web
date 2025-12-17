import apiClient from './client';
import type { Grupo } from '@/types/models';

export interface CreateGrupoData {
  grado_id: number;
  nombre: string;
  capacidad_maxima: number;
  maestro_id?: number;
}

export interface UpdateGrupoData {
  grado_id?: number;
  nombre?: string;
  capacidad_maxima?: number;
  maestro_id?: number;
  activo?: boolean;
}

export const gruposApi = {
  getAll: async (): Promise<Grupo[]> => {
    const { data } = await apiClient.get('/grupos');
    return data.data;
  },

  getById: async (id: number): Promise<Grupo> => {
    const { data } = await apiClient.get(`/grupos/${id}`);
    return data.data;
  },

  create: async (grupoData: CreateGrupoData): Promise<Grupo> => {
    const { data } = await apiClient.post('/grupos', grupoData);
    return data.data;
  },

  update: async (id: number, grupoData: UpdateGrupoData): Promise<Grupo> => {
    const { data } = await apiClient.put(`/grupos/${id}`, grupoData);
    return data.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/grupos/${id}`);
  },
};
