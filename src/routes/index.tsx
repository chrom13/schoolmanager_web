import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { AppLayout } from '@/components/layout/AppLayout'

// Auth pages
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'

// Dashboard
import DashboardPage from '@/features/dashboard/pages/DashboardPage'

// Estructura Académica
import NivelesPage from '@/features/estructura/pages/NivelesPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          // Estructura Académica
          {
            path: 'niveles',
            element: <NivelesPage />,
          },
          {
            path: 'grados',
            element: <div className="text-center p-8">Página de Grados - Próximamente</div>,
          },
          {
            path: 'grupos',
            element: <div className="text-center p-8">Página de Grupos - Próximamente</div>,
          },
          {
            path: 'materias',
            element: <div className="text-center p-8">Página de Materias - Próximamente</div>,
          },
          // Otros módulos
          {
            path: 'alumnos',
            element: <div className="text-center p-8">Página de Alumnos - Próximamente</div>,
          },
          {
            path: 'calificaciones',
            element: <div className="text-center p-8">Página de Calificaciones - Próximamente</div>,
          },
          {
            path: 'asistencias',
            element: <div className="text-center p-8">Página de Asistencias - Próximamente</div>,
          },
          {
            path: 'cobranza',
            element: <div className="text-center p-8">Página de Cobranza - Próximamente</div>,
          },
          {
            path: 'configuracion',
            element: <div className="text-center p-8">Página de Configuración - Próximamente</div>,
          },
          {
            path: 'perfil',
            element: <div className="text-center p-8">Perfil de Usuario - Próximamente</div>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
