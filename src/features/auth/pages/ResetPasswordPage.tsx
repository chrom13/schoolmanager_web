import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Lock, CheckCircle } from 'lucide-react'

import { authApi } from '@/api/auth.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation'],
  })

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [passwordReset, setPasswordReset] = useState(false)

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  })

  // Validar que tenemos token y email
  useEffect(() => {
    if (!token || !email) {
      toast.error('Enlace inválido o expirado')
      navigate('/login')
    }
  }, [token, email, navigate])

  const resetPasswordMutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      setPasswordReset(true)
      toast.success('Contraseña restablecida exitosamente')
      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    },
    onError: (error: any) => {
      console.error('Reset password error:', error)
      let message = 'Error al restablecer la contraseña'

      if (error.response?.data?.message) {
        message = error.response.data.message
      }

      toast.error(message)
    },
  })

  const onSubmit = (data: ResetPasswordForm) => {
    if (!token || !email) return

    resetPasswordMutation.mutate({
      email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      token,
    })
  }

  if (passwordReset) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-600 mb-2">
              Escolaric
            </h1>
            <p className="text-gray-600">Sistema de Gestión Escolar</p>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                ¡Contraseña restablecida!
              </h2>

              <p className="text-gray-600 mb-6">
                Tu contraseña ha sido restablecida exitosamente. Serás
                redirigido al inicio de sesión en unos segundos.
              </p>

              <Link to="/login">
                <Button className="w-full">Ir al inicio de sesión</Button>
              </Link>
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">
            Escolaric
          </h1>
          <p className="text-gray-600">Sistema de Gestión Escolar</p>
        </div>

        {/* Reset Password Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
            Restablecer Contraseña
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Ingresa tu nueva contraseña
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Nueva Contraseña</Label>
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
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="password_confirmation">
                Confirmar Nueva Contraseña
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
              className="w-full"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending
                ? 'Restableciendo...'
                : 'Restablecer Contraseña'}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center text-sm">
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Volver al inicio de sesión
            </Link>
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
