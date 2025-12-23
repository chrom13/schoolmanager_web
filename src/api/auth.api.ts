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

  forgotPassword: async (email: string): Promise<{ message: string; token?: string; reset_url?: string }> => {
    const { data } = await apiClient.post('/auth/forgot-password', { email })
    return data
  },

  resetPassword: async (resetData: {
    email: string
    password: string
    password_confirmation: string
    token: string
  }): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/reset-password', resetData)
    return data
  },

  verifyEmail: async (id: string, hash: string): Promise<{ message: string }> => {
    const { data } = await apiClient.get(`/auth/verify-email?id=${id}&hash=${hash}`)
    return data
  },

  resendVerificationEmail: async (): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/resend-verification-email')
    return data
  },
}
