import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { CheckCircle2, Building2, GraduationCap, Rocket } from 'lucide-react'
import toast from 'react-hot-toast'

import { onboardingApi } from '@/api/onboarding.api'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'

export default function OnboardingWelcomePage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const skipMutation = useMutation({
    mutationFn: onboardingApi.skip,
    onSuccess: () => {
      toast.success('Puedes completar la configuración desde Ajustes')
      navigate('/')
    },
    onError: (error: any) => {
      console.error('Skip onboarding error:', error)
      toast.error('Error al saltar onboarding')
    },
  })

  const handleStart = () => {
    navigate('/onboarding/paso-1')
  }

  const handleSkip = () => {
    skipMutation.mutate()
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Cuenta creada exitosamente!
          </h1>
          <p className="text-lg text-gray-600">
            Bienvenido, <span className="font-semibold">{user?.nombre}</span>
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Descripción */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Configuremos tu escuela en 2 simples pasos
            </h2>
            <p className="text-gray-600">
              Te guiaremos para configurar los datos esenciales. Puedes completar
              esta información ahora o hacerlo más tarde desde la sección de
              Configuración.
            </p>
          </div>

          {/* Pasos */}
          <div className="space-y-4 mb-8">
            {/* Paso 1 */}
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-800">
                    Datos de la Escuela
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  CCT, RFC, email institucional y datos de contacto
                </p>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-800">
                    Estructura Académica
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Información sobre niveles, grados, grupos y materias
                </p>
              </div>
            </div>

            {/* Listo */}
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                <Rocket className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  ¡Listo para usar!
                </h3>
                <p className="text-sm text-gray-600">
                  Accede a tu dashboard y comienza a gestionar tu escuela
                </p>
              </div>
            </div>
          </div>

          {/* Tiempo estimado */}
          <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              ⏱️ <strong>Tiempo estimado:</strong> 2-3 minutos
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleStart}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
            >
              Comenzar Configuración
            </Button>
            <Button
              onClick={handleSkip}
              variant="outline"
              className="flex-1"
              disabled={skipMutation.isPending}
            >
              {skipMutation.isPending ? 'Saltando...' : 'Saltar por ahora'}
            </Button>
          </div>

          {/* Nota */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Puedes pausar en cualquier momento y continuar después
          </p>
        </div>
      </div>
    </div>
  )
}
