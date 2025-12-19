import { Outlet, useLocation } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

const ONBOARDING_STEPS = [
  { path: '/onboarding/bienvenida', label: 'Bienvenida', step: 0 },
  { path: '/onboarding/paso-1', label: 'Datos Escuela', step: 1 },
  { path: '/onboarding/paso-2', label: 'Estructura', step: 2 },
  { path: '/onboarding/completado', label: 'Completado', step: 3 },
]

export default function OnboardingLayout() {
  const location = useLocation()
  const { user } = useAuthStore()

  // Determinar el paso actual
  const currentStepObj = ONBOARDING_STEPS.find((s) => s.path === location.pathname)
  const currentStep = currentStepObj?.step ?? 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo y Nombre de Escuela */}
            <div className="flex items-center gap-3">
              <img
                src="/theme/img/logo2.png"
                alt="School Manager"
                className="h-10"
              />
              <div className="border-l border-gray-300 pl-3">
                <p className="text-sm text-gray-500">Configurando</p>
                <p className="font-semibold text-gray-800">
                  {user?.escuela?.nombre || 'Tu Escuela'}
                </p>
              </div>
            </div>

            {/* Indicador de Paso */}
            {currentStep > 0 && currentStep < 3 && (
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">
                  Paso {currentStep} de 2
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Barra de Progreso */}
      {currentStep > 0 && currentStep < 3 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              {/* Paso 1 */}
              <div className="flex items-center gap-2">
                {currentStep > 1 ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : currentStep === 1 ? (
                  <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </div>
                ) : (
                  <Circle className="h-6 w-6 text-gray-400" />
                )}
                <span
                  className={`text-sm font-medium ${
                    currentStep >= 1 ? 'text-gray-800' : 'text-gray-400'
                  }`}
                >
                  Datos Escuela
                </span>
              </div>

              {/* Línea de conexión */}
              <div className="flex-1 h-0.5 bg-gray-300 mx-2">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: currentStep >= 2 ? '100%' : '0%' }}
                />
              </div>

              {/* Paso 2 */}
              <div className="flex items-center gap-2">
                {currentStep > 2 ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : currentStep === 2 ? (
                  <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </div>
                ) : (
                  <Circle className="h-6 w-6 text-gray-400" />
                )}
                <span
                  className={`text-sm font-medium ${
                    currentStep >= 2 ? 'text-gray-800' : 'text-gray-400'
                  }`}
                >
                  Estructura
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-600">
        <p>© 2025 School Manager. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
