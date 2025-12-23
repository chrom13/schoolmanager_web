import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Mail, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

import { authApi } from '@/api/auth.api'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'

export default function VerifyEmailPendingPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const resendVerificationMutation = useMutation({
    mutationFn: authApi.resendVerificationEmail,
    onSuccess: () => {
      toast.success('Email de verificación enviado. Por favor revisa tu correo.')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al enviar el email'
      toast.error(message)
    },
  })

  const handleLogout = async () => {
    try {
      await authApi.logout()
      logout()
      navigate('/login')
    } catch (error) {
      logout()
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">Escolaric</h1>
          <p className="text-gray-600">Verifica tu Email</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
              <Mail className="h-8 w-8 text-yellow-600" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Verifica tu correo electrónico
            </h2>

            <p className="text-gray-600 mb-2">
              Hola, <span className="font-semibold">{user?.name}</span>
            </p>

            <p className="text-gray-600 mb-6">
              Hemos enviado un correo de verificación a{' '}
              <span className="font-semibold">{user?.email}</span>. Por favor, revisa
              tu bandeja de entrada y haz clic en el enlace para verificar tu cuenta.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> El enlace de verificación expirará en 60 minutos.
                Si no ves el correo, revisa tu carpeta de spam.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => resendVerificationMutation.mutate()}
                disabled={resendVerificationMutation.isPending}
                className="w-full"
                variant="default"
              >
                {resendVerificationMutation.isPending
                  ? 'Enviando...'
                  : 'Reenviar Email de Verificación'}
              </Button>

              <Button
                onClick={handleLogout}
                className="w-full"
                variant="outline"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2025 Escolaric. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
