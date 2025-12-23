import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Building2, Mail, Lock, CheckCircle2 } from 'lucide-react'

import { authApi } from '@/api/auth.api'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { RegisterExpressData } from '@/types/onboarding.types'

const registerExpressSchema = z
  .object({
    nombre_escuela: z
      .string()
      .min(3, 'El nombre de la escuela debe tener al menos 3 caracteres')
      .max(255, 'El nombre no puede exceder 255 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation'],
  })

type RegisterExpressForm = z.infer<typeof registerExpressSchema>

export default function RegisterExpressPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterExpressForm>({
    resolver: zodResolver(registerExpressSchema),
  })

  const registerMutation = useMutation({
    mutationFn: authApi.registerExpress,
    onSuccess: (response) => {
      // Auto-login con el token recibido
      login(response.data.token, response.data.usuario)
      toast.success('¡Cuenta creada exitosamente!')
      // Redirigir al onboarding
      navigate('/onboarding/bienvenida')
    },
    onError: (error: any) => {
      console.error('Register express error:', error)
      let message = 'Error al crear la cuenta'

      if (error.response?.data?.message) {
        message = error.response.data.message
      } else if (error.response?.data?.error) {
        message = error.response.data.error
      } else if (error.response?.data?.errors) {
        // Manejar errores de validación de Laravel
        const errors = error.response.data.errors
        const firstError = Object.values(errors)[0]
        message = Array.isArray(firstError) ? firstError[0] : (firstError as string)
      } else if (error.message) {
        message = error.message
      }

      toast.error(message, {
        duration: 8000,
      })
    },
  })

  const onSubmit = (data: RegisterExpressForm) => {
    registerMutation.mutate(data as RegisterExpressData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-lg">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">
            Escolaric
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Registro Express
          </h2>
          <p className="text-gray-600">
            Comienza en menos de 1 minuto
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mb-6 flex justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>Acceso inmediato</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>14 días gratis</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>Sin tarjeta</span>
          </div>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Nombre Escuela */}
            <div className="space-y-2">
              <Label htmlFor="nombre_escuela">Nombre de tu Escuela</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="nombre_escuela"
                  placeholder="Colegio San Francisco"
                  className="pl-10"
                  {...register('nombre_escuela')}
                />
              </div>
              {errors.nombre_escuela && (
                <p className="text-sm text-red-500">
                  {errors.nombre_escuela.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Tu Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  className="pl-10"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="password_confirmation">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password_confirmation"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  className="pl-10"
                  {...register('password_confirmation')}
                />
              </div>
              {errors.password_confirmation && (
                <p className="text-sm text-red-500">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'Creando cuenta...' : 'Crear Cuenta Gratis'}
            </Button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              <strong>¿Qué sigue?</strong> Después del registro, te guiaremos paso a paso
              para configurar tu escuela. Puedes completar la información en cualquier momento.
            </p>
          </div>

          {/* Links */}
          <div className="mt-6 space-y-3">
            <div className="text-center text-sm">
              <span className="text-gray-600">¿Ya tienes una cuenta? </span>
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Inicia sesión
              </Link>
            </div>
            <div className="text-center text-sm">
              <span className="text-gray-600">¿Prefieres el registro completo? </span>
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Registro tradicional
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2025 Escolaric. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
