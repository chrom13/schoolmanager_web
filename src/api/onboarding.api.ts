import api from './axios'
import type {
  OnboardingStatusResponse,
  OnboardingResponse,
  SchoolDataOnboarding,
} from '@/types/onboarding.types'

/**
 * API para el flujo de onboarding
 */
export const onboardingApi = {
  /**
   * Obtener estado del onboarding
   */
  getStatus: async (): Promise<OnboardingStatusResponse> => {
    const response = await api.get<OnboardingStatusResponse>('/onboarding/status')
    return response.data
  },

  /**
   * Completar datos de la escuela (Paso 1)
   */
  completeSchoolData: async (data: SchoolDataOnboarding): Promise<OnboardingResponse> => {
    const response = await api.post<OnboardingResponse>('/onboarding/complete-school-data', data)
    return response.data
  },

  /**
   * Completar estructura académica (Paso 2)
   */
  completeStructure: async (): Promise<OnboardingResponse> => {
    const response = await api.post<OnboardingResponse>('/onboarding/complete-structure')
    return response.data
  },

  /**
   * Marcar onboarding como completado
   */
  complete: async (): Promise<OnboardingResponse> => {
    const response = await api.post<OnboardingResponse>('/onboarding/complete')
    return response.data
  },

  /**
   * Saltar onboarding (permite completarlo después)
   */
  skip: async (): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/onboarding/skip')
    return response.data
  },
}
