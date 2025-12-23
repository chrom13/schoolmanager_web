import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

import { authApi } from '@/api/auth.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false)
  const [resetUrl, setResetUrl] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: (data) => {
      setEmailSent(true)
      // En desarrollo, mostramos el link
      if (data.reset_url) {
        setResetUrl(data.reset_url)
      }
      toast.success('Solicitud enviada exitosamente')
    },
    onError: (error: any) => {
      console.error('Forgot password error:', error)
      const message =
        error?.response?.data?.message || 'Error al enviar la solicitud'
      toast.error(message)
    },
  })

  const onSubmit = (data: ForgotPasswordForm) => {
    forgotPasswordMutation.mutate(data.email)
  }

  if (emailSent) {
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
                ¡Revisa tu correo!
              </h2>

              <p className="text-gray-600 mb-6">
                Si existe una cuenta con el correo{' '}
                <strong>{getValues('email')}</strong>, recibirás un enlace para
                restablecer tu contraseña.
              </p>

              {/* En desarrollo, mostramos el link directo */}
              {resetUrl && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 mb-2 font-medium">
                    Modo desarrollo - Link directo:
                  </p>
                  <a
                    href={resetUrl}
                    className="text-sm text-indigo-600 hover:text-indigo-700 underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resetUrl}
                  </a>
                </div>
              )}

              <p className="text-sm text-gray-500 mb-6">
                No recibiste el correo? Revisa tu carpeta de spam o solicita uno
                nuevo.
              </p>

              <Link to="/login">
                <Button className="w-full">Volver al inicio de sesión</Button>
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

        {/* Forgot Password Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-6">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al inicio de sesión
            </Link>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Ingresa tu correo electrónico y te enviaremos un enlace para
            restablecer tu contraseña.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={forgotPasswordMutation.isPending}
            >
              {forgotPasswordMutation.isPending
                ? 'Enviando...'
                : 'Enviar enlace de recuperación'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2025 Escolaric. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
