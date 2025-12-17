import { Escuela, Usuario } from './auth.types'

export interface Nivel {
  id: number
  escuela_id: number
  nombre: 'preescolar' | 'primaria' | 'secundaria' | 'preparatoria'
  activo: boolean
  created_at?: string
  updated_at?: string
}

export interface Grado {
  id: number
  escuela_id: number
  nivel_id: number
  nombre: string
  orden: number
  activo: boolean
  nivel?: Nivel
  created_at?: string
  updated_at?: string
}

export interface Grupo {
  id: number
  escuela_id: number
  grado_id: number
  nombre: string
  capacidad_maxima: number
  maestro_id?: number
  activo: boolean
  grado?: Grado
  maestro?: Usuario
  created_at?: string
  updated_at?: string
}

export interface Alumno {
  id: number
  escuela_id: number
  grupo_id?: number
  nombre: string
  apellido_paterno: string
  apellido_materno?: string
  nombre_completo: string
  curp?: string
  fecha_nacimiento?: string
  foto_url?: string
  activo: boolean
  grupo?: Grupo
  padres?: Padre[]
  created_at?: string
  updated_at?: string
}

export interface Padre {
  id: number
  escuela_id: number
  nombre_completo: string
  email: string
  telefono?: string
  rfc?: string
  regimen_fiscal?: string
  uso_cfdi?: string
  codigo_postal?: string
  activo: boolean
  alumnos?: Alumno[]
  created_at?: string
  updated_at?: string
}

export interface Materia {
  id: number
  escuela_id: number
  nombre: string
  clave?: string
  descripcion?: string
  color?: string
  activo: boolean
  created_at?: string
  updated_at?: string
}

export interface CicloEscolar {
  id: number
  escuela_id: number
  nombre: string
  fecha_inicio: string
  fecha_fin: string
  activo: boolean
  periodos?: Periodo[]
  created_at?: string
  updated_at?: string
}

export interface Periodo {
  id: number
  ciclo_escolar_id: number
  nombre: string
  numero: number
  tipo: 'bimestre' | 'trimestre' | 'cuatrimestral' | 'semestre' | 'anual'
  fecha_inicio: string
  fecha_fin: string
  activo: boolean
  cicloEscolar?: CicloEscolar
  created_at?: string
  updated_at?: string
}

export interface Calificacion {
  id: number
  alumno_id: number
  materia_id: number
  periodo_id: number
  calificacion: number
  observaciones?: string
  maestro_id?: number
  alumno?: Alumno
  materia?: Materia
  periodo?: Periodo
  maestro?: Usuario
  created_at?: string
  updated_at?: string
}

export interface Asistencia {
  id: number
  alumno_id: number
  grupo_id: number
  fecha: string
  estado: 'presente' | 'falta' | 'retardo' | 'justificada'
  observaciones?: string
  alumno?: Alumno
  grupo?: Grupo
  created_at?: string
  updated_at?: string
}
