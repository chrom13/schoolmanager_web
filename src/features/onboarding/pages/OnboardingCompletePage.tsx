import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  CheckCircle2,
  Rocket,
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
} from 'lucide-react'

import { onboardingApi } from '@/api/onboarding.api'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'

export default function OnboardingCompletePage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const completeMutation = useMutation({
    mutationFn: onboardingApi.complete,
    onSuccess: () => {
      toast.success('¡Configuración completada! Bienvenido a School Manager')
      navigate('/')
    },
    onError: (error: any) => {
      console.error('Complete onboarding error:', error)
      toast.error('Error al completar onboarding')
      // Navegar de todos modos al dashboard
      navigate('/')
    },
  })

  const handleGoToDashboard = () => {
    completeMutation.mutate()
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Configuración Completada!
          </h1>
          <p className="text-lg text-gray-600">
            Tu escuela <span className="font-semibold">{user?.escuela?.nombre}</span> está
            lista para usar
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Mensaje de bienvenida */}
          <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
            <p className="text-center text-gray-800 leading-relaxed">
              Felicidades por completar la configuración inicial. Ahora puedes acceder
              a todas las funciones de <strong>School Manager</strong> y comenzar a
              gestionar tu escuela de manera profesional.
            </p>
          </div>

          {/* Próximos pasos sugeridos */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Sugerencias para comenzar
            </h2>

            <div className="space-y-3">
              {/* Estructura */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    1. Configura tu estructura académica
                  </h3>
                  <p className="text-sm text-gray-600">
                    Crea niveles, grados, grupos y materias
                  </p>
                </div>
              </div>

              {/* Alumnos */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    2. Registra a tus alumnos
                  </h3>
                  <p className="text-sm text-gray-600">
                    Añade estudiantes y asígnalos a sus grupos
                  </p>
                </div>
              </div>

              {/* Maestros */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    3. Invita a tus maestros
                  </h3>
                  <p className="text-sm text-gray-600">
                    Crea cuentas para tu equipo docente
                  </p>
                </div>
              </div>

              {/* Conceptos de Cobro */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    4. Configura conceptos de cobro
                  </h3>
                  <p className="text-sm text-gray-600">
                    Define colegiaturas, inscripciones y otros pagos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recordatorio del periodo de prueba */}
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 mb-8">
            <p className="text-sm text-indigo-800 text-center">
              🎉 <strong>Tienes 14 días de prueba gratis</strong> para explorar todas
              las funciones sin restricciones
            </p>
          </div>

          {/* Botón principal */}
          <Button
            onClick={handleGoToDashboard}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-lg py-6"
            disabled={completeMutation.isPending}
          >
            <Rocket className="mr-2 h-5 w-5" />
            {completeMutation.isPending ? 'Finalizando...' : 'Ir al Dashboard'}
          </Button>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Si tienes alguna duda, visita nuestra sección de ayuda o contáctanos
          </p>
        </div>
      </div>
    </div>
  )
}
