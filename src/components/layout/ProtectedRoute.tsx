import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

export function ProtectedRoute() {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Verificar si el email está verificado
  const isEmailVerified = user?.email_verified_at !== null && user?.email_verified_at !== undefined

  // Si el email no está verificado y no estamos ya en la página de verificación pendiente
  if (!isEmailVerified && location.pathname !== '/verify-email-pending') {
    return <Navigate to="/verify-email-pending" replace />
  }

  return <Outlet />
}
