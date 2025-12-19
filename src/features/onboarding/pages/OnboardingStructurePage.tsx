import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  GraduationCap,
  Layers,
  Users,
  BookOpen,
  Calendar,
  CheckCircle2,
} from 'lucide-react'

import { onboardingApi } from '@/api/onboarding.api'
import { Button } from '@/components/ui/button'

export default function OnboardingStructurePage() {
  const navigate = useNavigate()

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

  const continueMutation = useMutation({
    mutationFn: onboardingApi.completeStructure,
    onSuccess: () => {
      navigate('/onboarding/completado')
    },
    onError: (error: any) => {
      console.error('Complete structure error:', error)
      toast.error('Error al continuar')
    },
  })

  const handleContinue = () => {
    continueMutation.mutate()
  }

  const handleSkip = () => {
    skipMutation.mutate()
  }

  const handleBack = () => {
    navigate('/onboarding/paso-1')
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Estructura Académica
          </h1>
          <p className="text-gray-600">
            Configura tu estructura desde el dashboard cuando estés listo
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Descripción */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              Desde tu <strong>Dashboard</strong> podrás configurar toda la estructura
              académica de tu escuela de manera flexible y a tu ritmo.
            </p>
          </div>

          {/* Qué puedes configurar */}
          <div className="space-y-3 mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">
              Qué podrás configurar:
            </h3>

            {/* Niveles */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Layers className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Niveles Educativos</h4>
                <p className="text-sm text-gray-600">
                  Preescolar, Primaria, Secundaria, Preparatoria, etc.
                </p>
              </div>
            </div>

            {/* Grados */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Grados</h4>
                <p className="text-sm text-gray-600">
                  1°, 2°, 3°, etc. Organiza los grados por nivel
                </p>
              </div>
            </div>

            {/* Grupos */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Grupos</h4>
                <p className="text-sm text-gray-600">
                  Grupo A, Grupo B, etc. Asigna alumnos a cada grupo
                </p>
              </div>
            </div>

            {/* Materias */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Materias</h4>
                <p className="text-sm text-gray-600">
                  Matemáticas, Español, Historia, etc. Asigna a grupos y maestros
                </p>
              </div>
            </div>

            {/* Ciclos Escolares */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Ciclos Escolares</h4>
                <p className="text-sm text-gray-600">
                  Define periodos académicos y fechas importantes
                </p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                <strong>Tranquilo:</strong> Puedes configurar todo esto cuando lo
                necesites. El sistema es flexible y se adapta a tu ritmo de trabajo.
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="order-2 sm:order-1"
            >
              Atrás
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-1 order-1 sm:order-2 bg-indigo-600 hover:bg-indigo-700"
              disabled={continueMutation.isPending}
            >
              {continueMutation.isPending ? 'Continuando...' : 'Continuar'}
            </Button>
          </div>

          {/* Link Saltar */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={handleSkip}
              disabled={skipMutation.isPending}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              {skipMutation.isPending ? 'Saltando...' : 'Saltar y completar después'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
