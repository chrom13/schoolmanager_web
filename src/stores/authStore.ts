import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Usuario } from '@/types/auth.types'

interface AuthState {
  user: Usuario | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: Usuario) => void
  logout: () => void
  setUser: (user: Usuario) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (token: string, user: Usuario) => {
        localStorage.setItem('auth_token', token)
        set({ token, user, isAuthenticated: true })
      },

      logout: () => {
        localStorage.removeItem('auth_token')
        set({ token: null, user: null, isAuthenticated: false })
      },

      setUser: (user: Usuario) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
