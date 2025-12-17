import type { Grupo } from './estructura.types'

export interface Tutor {
  id: number
  escuela_id: number
  nombre: string
  email?: string
  telefono?: string
  relacion?: string
  activo: boolean
  created_at: string
  updated_at: string
}

export interface Alumno {
  id: number
  escuela_id: number
  grupo_id?: number
  tutor_id?: number
  matricula: string
  nombre: string
  apellido_paterno: string
  apellido_materno?: string
  fecha_nacimiento?: string
  curp?: string
  genero?: 'masculino' | 'femenino' | 'otro'
  direccion?: string
  telefono?: string
  email?: string
  foto_url?: string
  activo: boolean
  created_at: string
  updated_at: string
  grupo?: Grupo
  tutor?: Tutor
}

export interface CreateAlumnoData {
  grupo_id?: number
  tutor_id?: number
  nombre: string
  apellido_paterno: string
  apellido_materno?: string
  fecha_nacimiento?: string
  curp?: string
  genero?: 'masculino' | 'femenino' | 'otro'
  direccion?: string
  telefono?: string
  email?: string
}

export interface UpdateAlumnoData {
  grupo_id?: number
  tutor_id?: number
  nombre?: string
  apellido_paterno?: string
  apellido_materno?: string
  fecha_nacimiento?: string
  curp?: string
  genero?: 'masculino' | 'femenino' | 'otro'
  direccion?: string
  telefono?: string
  email?: string
  activo?: boolean
}

export interface CreateTutorData {
  nombre: string
  email?: string
  telefono?: string
  relacion?: string
}

export interface UpdateTutorData {
  nombre?: string
  email?: string
  telefono?: string
  relacion?: string
  activo?: boolean
}
