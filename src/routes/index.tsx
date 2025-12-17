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
import GradosPage from '@/features/estructura/pages/GradosPage'
import GruposPage from '@/features/estructura/pages/GruposPage'
import MateriasPage from '@/features/estructura/pages/MateriasPage'

// Alumnos
import AlumnosPage from '@/features/alumnos/pages/AlumnosPage'

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
            element: <GradosPage />,
          },
          {
            path: 'grupos',
            element: <GruposPage />,
          },
          {
            path: 'materias',
            element: <MateriasPage />,
          },
          // Otros módulos
          {
            path: 'alumnos',
            element: <AlumnosPage />,
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
