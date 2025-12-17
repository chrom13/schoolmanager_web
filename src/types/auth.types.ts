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
  activo: boolean
}

export interface Usuario {
  id: number
  escuela_id: number
  nombre: string
  email: string
  rol: UserRole
  activo: boolean
  escuela: Escuela
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
