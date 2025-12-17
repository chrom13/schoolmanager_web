import apiClient from './client'
import type { LoginCredentials, RegisterData, AuthResponse, Usuario } from '@/types/auth.types'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data
  },

  register: async (registerData: RegisterData): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/register', registerData)
    return data
  },

  me: async (): Promise<Usuario> => {
    const { data } = await apiClient.get('/auth/me')
    return data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },
}
