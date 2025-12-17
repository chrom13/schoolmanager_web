import apiClient from './client';
import type { Materia } from '@/types/models';

export interface CreateMateriaData {
  nombre: string;
  clave?: string;
  descripcion?: string;
  color?: string;
}

export interface UpdateMateriaData {
  nombre?: string;
  clave?: string;
  descripcion?: string;
  color?: string;
  activo?: boolean;
}

export interface AsignarGrupoData {
  grupo_id: number;
  maestro_id?: number;
}

export const materiasApi = {
  getAll: async (): Promise<Materia[]> => {
    const { data } = await apiClient.get('/materias');
    return data.data;
  },

  getById: async (id: number): Promise<Materia> => {
    const { data } = await apiClient.get(`/materias/${id}`);
    return data.data;
  },

  create: async (materiaData: CreateMateriaData): Promise<Materia> => {
    const { data } = await apiClient.post('/materias', materiaData);
    return data.data;
  },

  update: async (id: number, materiaData: UpdateMateriaData): Promise<Materia> => {
    const { data } = await apiClient.put(`/materias/${id}`, materiaData);
    return data.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/materias/${id}`);
  },

  asignarGrupo: async (materiaId: number, asignacionData: AsignarGrupoData): Promise<void> => {
    await apiClient.post(`/materias/${materiaId}/asignar-grupo`, asignacionData);
  },

  actualizarAsignacion: async (
    materiaId: number,
    grupoId: number,
    maestroId?: number
  ): Promise<void> => {
    await apiClient.put(`/materias/${materiaId}/grupos/${grupoId}`, { maestro_id: maestroId });
  },

  desasignarGrupo: async (materiaId: number, grupoId: number): Promise<void> => {
    await apiClient.delete(`/materias/${materiaId}/grupos/${grupoId}`);
  },
};
