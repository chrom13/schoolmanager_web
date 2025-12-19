import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { FileText, Mail, Phone, MapPin, Building2 } from 'lucide-react'

import { onboardingApi } from '@/api/onboarding.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SchoolDataOnboarding } from '@/types/onboarding.types'

const schoolDataSchema = z.object({
  cct: z
    .string()
    .length(10, 'El CCT debe tener exactamente 10 caracteres')
    .regex(
      /^[0-9]{2}[A-Z]{3}[0-9]{4}[A-Z]$/,
      'El CCT debe tener el formato: 2 dígitos, 3 letras, 4 dígitos y 1 letra (ej: 14DPR0001X)'
    ),
  email_escuela: z.string().email('Email inválido'),
  rfc: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length === 13 && /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/.test(val)),
      'El RFC debe tener exactamente 13 caracteres (ej: ABC123456XYZ)'
    ),
  telefono: z.string().optional(),
  codigo_postal: z.string().optional(),
})

type SchoolDataForm = z.infer<typeof schoolDataSchema>

export default function OnboardingSchoolDataPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolDataForm>({
    resolver: zodResolver(schoolDataSchema),
  })

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

  const submitMutation = useMutation({
    mutationFn: onboardingApi.completeSchoolData,
    onSuccess: () => {
      toast.success('Datos guardados correctamente')
      navigate('/onboarding/paso-2')
    },
    onError: (error: any) => {
      console.error('Complete school data error:', error)
      let message = 'Error al guardar los datos'

      if (error.response?.data?.message) {
        message = error.response.data.message
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors
        const firstError = Object.values(errors)[0]
        message = Array.isArray(firstError) ? firstError[0] : (firstError as string)
      }

      toast.error(message, { duration: 8000 })
    },
  })

  const onSubmit = (data: SchoolDataForm) => {
    submitMutation.mutate(data as SchoolDataOnboarding)
  }

  const handleSkip = () => {
    skipMutation.mutate()
  }

  const handleBack = () => {
    navigate('/onboarding/bienvenida')
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Building2 className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Datos de tu Escuela
          </h1>
          <p className="text-gray-600">
            Completa la información oficial de tu institución
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* CCT */}
            <div className="space-y-2">
              <Label htmlFor="cct">
                CCT (Clave de Centro de Trabajo) <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="cct"
                  placeholder="14DPR0001X"
                  className="pl-10 uppercase"
                  {...register('cct')}
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase()
                  }}
                />
              </div>
              {errors.cct && (
                <p className="text-sm text-red-500">{errors.cct.message}</p>
              )}
              <p className="text-xs text-gray-500">
                Formato: 2 números, 3 letras, 4 números, 1 letra
              </p>
            </div>

            {/* Email Escuela */}
            <div className="space-y-2">
              <Label htmlFor="email_escuela">
                Email Institucional <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email_escuela"
                  type="email"
                  placeholder="contacto@escuela.edu.mx"
                  className="pl-10"
                  {...register('email_escuela')}
                />
              </div>
              {errors.email_escuela && (
                <p className="text-sm text-red-500">{errors.email_escuela.message}</p>
              )}
            </div>

            {/* RFC (Opcional) */}
            <div className="space-y-2">
              <Label htmlFor="rfc">RFC de la Escuela (Opcional)</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="rfc"
                  placeholder="ABC123456XYZ"
                  className="pl-10 uppercase"
                  {...register('rfc')}
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase()
                  }}
                />
              </div>
              {errors.rfc && (
                <p className="text-sm text-red-500">{errors.rfc.message}</p>
              )}
              <p className="text-xs text-gray-500">
                Necesario para facturación electrónica
              </p>
            </div>

            {/* Teléfono (Opcional) */}
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono (Opcional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="telefono"
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="pl-10"
                  {...register('telefono')}
                />
              </div>
              {errors.telefono && (
                <p className="text-sm text-red-500">{errors.telefono.message}</p>
              )}
            </div>

            {/* Código Postal (Opcional) */}
            <div className="space-y-2">
              <Label htmlFor="codigo_postal">Código Postal (Opcional)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="codigo_postal"
                  placeholder="12345"
                  className="pl-10"
                  {...register('codigo_postal')}
                />
              </div>
              {errors.codigo_postal && (
                <p className="text-sm text-red-500">{errors.codigo_postal.message}</p>
              )}
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Los campos con * son obligatorios. Los demás
                pueden completarse después desde Configuración.
              </p>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="order-2 sm:order-1"
              >
                Atrás
              </Button>
              <Button
                type="submit"
                className="flex-1 order-1 sm:order-2 bg-indigo-600 hover:bg-indigo-700"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? 'Guardando...' : 'Continuar'}
              </Button>
            </div>

            {/* Link Saltar */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleSkip}
                disabled={skipMutation.isPending}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                {skipMutation.isPending
                  ? 'Saltando...'
                  : 'Saltar y completar después'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
