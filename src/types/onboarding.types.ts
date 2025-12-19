/**
 * Tipos para el sistema de Onboarding
 */

/**
 * Datos del formulario de registro express
 */
export interface RegisterExpressData {
  nombre_escuela: string;
  email: string;
  password: string;
  password_confirmation: string;
  nombre?: string; // Opcional, se infiere del email si no se proporciona
}

/**
 * Estado del onboarding
 */
export interface OnboardingStatus {
  completado: boolean;
  paso_actual: 'bienvenida' | 'datos_escuela' | 'estructura' | 'completado' | 'dashboard';
  fecha_registro: string;
  es_registro_express: boolean;
  skipped?: boolean;
  skipped_at?: string;
}

/**
 * Datos del paso 1: Completar información de la escuela
 */
export interface SchoolDataOnboarding {
  cct: string;
  email_escuela: string;
  rfc?: string;
  telefono?: string;
  codigo_postal?: string;
}

/**
 * Respuesta del endpoint de registro express
 */
export interface AuthResponseExpress {
  message: string;
  data: {
    escuela: {
      id: number;
      nombre: string;
      slug: string;
      cct: string;
      email: string;
      activo: boolean;
      es_registro_express: boolean;
      onboarding_completado: boolean;
      onboarding_data: {
        paso_actual: string;
        fecha_registro: string;
      };
      created_at: string;
      updated_at: string;
    };
    usuario: {
      id: number;
      escuela_id: number;
      nombre: string;
      email: string;
      rol: string;
      activo: boolean;
      created_at: string;
      updated_at: string;
    };
    token: string;
    onboarding_required: boolean;
  };
}

/**
 * Respuesta del endpoint de status de onboarding
 */
export interface OnboardingStatusResponse {
  data: OnboardingStatus;
}

/**
 * Respuesta genérica de endpoints de onboarding
 */
export interface OnboardingResponse {
  message: string;
  data?: {
    id: number;
    nombre: string;
    slug: string;
    cct: string;
    email: string;
    activo: boolean;
    es_registro_express: boolean;
    onboarding_completado: boolean;
    onboarding_data: {
      paso_actual: string;
      fecha_registro: string;
      [key: string]: any;
    };
    onboarding_completado_at?: string;
    created_at: string;
    updated_at: string;
  };
}
