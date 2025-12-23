import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Building2, Mail, User, Lock, Tag, FileText } from 'lucide-react'

import { authApi } from '@/api/auth.api'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerSchema = z
  .object({
    nombre_escuela: z.string().min(3, 'El nombre de la escuela es requerido'),
    slug: z
      .string()
      .min(3, 'El slug debe tener al menos 3 caracteres')
      .regex(/^[a-z0-9-_]+$/, 'Solo minúsculas, números, guiones y guiones bajos'),
    cct: z
      .string()
      .length(10, 'El CCT debe tener exactamente 10 caracteres')
      .regex(
        /^[0-9]{2}[A-Z]{3}[0-9]{4}[A-Z]$/,
        'El CCT debe tener el formato: 2 dígitos, 3 letras, 4 dígitos y 1 letra (ej: 14DPR0001X)'
      ),
    rfc: z
      .string()
      .length(13, 'El RFC debe tener exactamente 13 caracteres')
      .regex(
        /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/,
        'RFC inválido (ej: ABC123456XYZ)'
      )
      .optional()
      .or(z.literal('')),
    email_escuela: z.string().email('Email inválido'),
    nombre: z.string().min(2, 'Tu nombre es requerido'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation'],
  })

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      login(data.token, data.user)
      toast.success('¡Registro exitoso! Bienvenido')
      navigate('/')
    },
    onError: (error: any) => {
      console.error('Register error:', error)
      let message = 'Error al registrarse'

      if (error.response?.data?.message) {
        message = error.response.data.message
      } else if (error.response?.data?.error) {
        message = error.response.data.error
      } else if (error.response?.data?.errors) {
        // Manejar errores de validación de Laravel
        const errors = error.response.data.errors
        const firstError = Object.values(errors)[0]
        message = Array.isArray(firstError) ? firstError[0] : firstError
      } else if (error.message) {
        message = error.message
      }

      toast.error(message, {
        duration: 8000,
      })
    },
  })

  const onSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">
            Escolaric
          </h1>
          <h2 className="text-2xl font-bold text-gray-800">
            Registra tu Escuela
          </h2>
          <p className="text-gray-600 mt-2">
            Comienza a gestionar tu escuela de manera profesional
          </p>
        </div>

        {/* Register Box */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información de la Escuela */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Información de la Escuela
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre Escuela */}
                <div className="space-y-2">
                  <Label htmlFor="nombre_escuela">Nombre de la Escuela</Label>
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

                {/* Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL única)</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="slug"
                      placeholder="colegio-sf"
                      className="pl-10"
                      {...register('slug')}
                    />
                  </div>
                  {errors.slug && (
                    <p className="text-sm text-red-500">{errors.slug.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Tu escuela será accesible en: tuescuela.com/{'{slug}'}
                  </p>
                </div>

                {/* CCT */}
                <div className="space-y-2">
                  <Label htmlFor="cct">CCT *</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="cct"
                      placeholder="14DPR0001X"
                      className="pl-10"
                      {...register('cct')}
                    />
                  </div>
                  {errors.cct && (
                    <p className="text-sm text-red-500">{errors.cct.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Clave de Centro de Trabajo de la SEP
                  </p>
                </div>

                {/* RFC */}
                <div className="space-y-2">
                  <Label htmlFor="rfc">RFC de la Escuela (Opcional)</Label>
                  <Input
                    id="rfc"
                    placeholder="ABC123456XYZ"
                    {...register('rfc')}
                  />
                  {errors.rfc && (
                    <p className="text-sm text-red-500">{errors.rfc.message}</p>
                  )}
                </div>

                {/* Email Escuela */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email_escuela">Email de la Escuela</Label>
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
              </div>
            </div>

            {/* Información del Administrador */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Información del Administrador
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre */}
                <div className="space-y-2">
                  <Label htmlFor="nombre">Tu Nombre Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="nombre"
                      placeholder="Juan Pérez"
                      className="pl-10"
                      {...register('nombre')}
                    />
                  </div>
                  {errors.nombre && (
                    <p className="text-sm text-red-500">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                {/* Email Usuario */}
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
                      placeholder="••••••••"
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
                      placeholder="••••••••"
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
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'Registrando...' : 'Registrar Escuela'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">¿Ya tienes una cuenta? </span>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Inicia sesión aquí
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
