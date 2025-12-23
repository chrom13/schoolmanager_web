export enum UserRole {
  DIRECTOR = 'director',
  ADMIN = 'admin',
  MAESTRO = 'maestro',
  PADRE = 'padre',
}

export interface Escuela {
  id: number
  nombre: string
  slug: string
  cct?: string
  rfc: string
  razon_social?: string
  email: string
  telefono?: string
  codigo_postal?: string
  regimen_fiscal?: string
  stripe_account_id?: string
  onboarding_completado?: boolean
  es_registro_express?: boolean
  onboarding_data?: {
    paso_actual?: string
    fecha_registro?: string
    skipped?: boolean
    skipped_at?: string
    [key: string]: any
  }
  onboarding_completado_at?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

export interface Usuario {
  id: number
  escuela_id: number
  name: string
  email: string
  email_verified_at?: string | null
  rol: UserRole
  escuela: Escuela
  deleted_at?: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  nombre_escuela: string
  slug: string
  cct: string
  rfc?: string
  email_escuela: string
  nombre: string
  email: string
  password: string
  password_confirmation: string
}

export interface AuthResponse {
  user: Usuario
  escuela: Escuela
  token: string
}
