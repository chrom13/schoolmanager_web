import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { CheckCircle, XCircle, Mail, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { authApi } from '@/api/auth.api'
import { Button } from '@/components/ui/button'

export default function VerifyEmailPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')

  const verifyMutation = useMutation({
    mutationFn: ({ id, hash }: { id: string; hash: string }) =>
      authApi.verifyEmail(id, hash),
    onSuccess: () => {
      setStatus('success')
      toast.success('¡Email verificado exitosamente!')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    },
    onError: (error: any) => {
      setStatus('error')
      const message = error.response?.data?.message || 'Error al verificar el email'
      toast.error(message)
    },
  })

  useEffect(() => {
    const url = searchParams.get('url')

    if (!url) {
      setStatus('error')
      return
    }

    try {
      const urlObj = new URL(url)
      const id = urlObj.searchParams.get('id')
      const hash = urlObj.searchParams.get('hash')

      if (!id || !hash) {
        setStatus('error')
        return
      }

      verifyMutation.mutate({ id, hash })
    } catch (err) {
      setStatus('error')
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">Escolaric</h1>
          <p className="text-gray-600">Verificación de Email</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {status === 'verifying' && (
            <div className="text-center">
              <Loader2 className="h-16 w-16 text-indigo-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Verificando tu email...
              </h2>
              <p className="text-gray-600">Por favor espera un momento</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                ¡Email Verificado!
              </h2>
              <p className="text-gray-600 mb-6">
                Tu correo electrónico ha sido verificado exitosamente.
                Serás redirigido al inicio de sesión...
              </p>
              <Button onClick={() => navigate('/login')} className="w-full">
                Ir al Inicio de Sesión
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Error de Verificación
              </h2>
              <p className="text-gray-600 mb-6">
                El enlace de verificación es inválido o ha expirado. Por favor,
                solicita un nuevo enlace.
              </p>
              <div className="space-y-3">
                <Link to="/login">
                  <Button className="w-full">Ir al Inicio de Sesión</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2025 Escolaric. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
