import apiClient from './client';
import type { Grado } from '@/types/models';

export interface CreateGradoData {
  nivel_id: number;
  nombre: string;
  orden: number;
}

export interface UpdateGradoData {
  nivel_id?: number;
  nombre?: string;
  orden?: number;
  activo?: boolean;
}

export const gradosApi = {
  getAll: async (): Promise<Grado[]> => {
    const { data } = await apiClient.get('/grados');
    return data.data;
  },

  getById: async (id: number): Promise<Grado> => {
    const { data } = await apiClient.get(`/grados/${id}`);
    return data.data;
  },

  create: async (gradoData: CreateGradoData): Promise<Grado> => {
    const { data } = await apiClient.post('/grados', gradoData);
    return data.data;
  },

  update: async (id: number, gradoData: UpdateGradoData): Promise<Grado> => {
    const { data } = await apiClient.put(`/grados/${id}`, gradoData);
    return data.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/grados/${id}`);
  },
};
