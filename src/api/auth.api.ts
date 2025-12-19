import apiClient from './client'
import type { LoginCredentials, RegisterData, AuthResponse, Usuario } from '@/types/auth.types'
import type { RegisterExpressData, AuthResponseExpress } from '@/types/onboarding.types'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/login', credentials)
    // Backend devuelve 'usuario', frontend espera 'user'
    return {
      user: data.data.usuario,
      escuela: data.data.usuario.escuela,
      token: data.data.token,
    }
  },

  register: async (registerData: RegisterData): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/register', registerData)
    // Backend devuelve 'usuario', frontend espera 'user'
    return {
      user: data.data.usuario,
      escuela: data.data.escuela,
      token: data.data.token,
    }
  },

  registerExpress: async (registerData: RegisterExpressData): Promise<AuthResponseExpress> => {
    const { data } = await apiClient.post('/auth/register-express', registerData)
    return data
  },

  me: async (): Promise<Usuario> => {
    const { data } = await apiClient.get('/auth/me')
    return data.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },
}
