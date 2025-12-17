import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  BookOpen,
  ClipboardCheck,
  Settings,
  Layers,
  Grid,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'
import { UserRole } from '@/types/auth.types'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  roles?: UserRole[]
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navigationSections: NavSection[] = [
  {
    title: 'Principal',
    items: [
      {
        label: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
        roles: [UserRole.DIRECTOR, UserRole.ADMIN],
      },
    ],
  },
  {
    title: 'Estructura Académica',
    items: [
      {
        label: 'Niveles',
        href: '/niveles',
        icon: Layers,
        roles: [UserRole.DIRECTOR, UserRole.ADMIN],
      },
      {
        label: 'Grados',
        href: '/grados',
        icon: Grid,
        roles: [UserRole.DIRECTOR, UserRole.ADMIN],
      },
      {
        label: 'Grupos',
        href: '/grupos',
        icon: ClipboardCheck,
        roles: [UserRole.DIRECTOR, UserRole.ADMIN],
      },
      {
        label: 'Materias',
        href: '/materias',
        icon: BookOpen,
        roles: [UserRole.DIRECTOR, UserRole.ADMIN],
      },
    ],
  },
  {
    title: 'Gestión',
    items: [
      {
        label: 'Alumnos',
        href: '/alumnos',
        icon: Users,
        roles: [UserRole.DIRECTOR, UserRole.ADMIN],
      },
      {
        label: 'Calificaciones',
        href: '/calificaciones',
        icon: GraduationCap,
        roles: [UserRole.DIRECTOR, UserRole.ADMIN, UserRole.MAESTRO],
      },
      {
        label: 'Asistencias',
        href: '/asistencias',
        icon: Calendar,
        roles: [UserRole.DIRECTOR, UserRole.ADMIN, UserRole.MAESTRO],
      },
      {
        label: 'Cobranza',
        href: '/cobranza',
        icon: DollarSign,
        roles: [UserRole.DIRECTOR, UserRole.ADMIN],
      },
    ],
  },
  {
    title: 'Configuración',
    items: [
      {
        label: 'Configuración',
        href: '/configuracion',
        icon: Settings,
        roles: [UserRole.DIRECTOR],
      },
    ],
  },
]

export function Sidebar() {
  const location = useLocation()
  const { user } = useAuthStore()

  const filteredSections = navigationSections.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) => !item.roles || item.roles.includes(user?.rol as UserRole)
    ),
  })).filter((section) => section.items.length > 0)

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/theme/img/logo.png"
            alt="Logo"
            className="h-10"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {filteredSections.map((section, sectionIndex) => (
          <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : ''}>
            <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
            {user?.nombre.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.nombre}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user?.rol}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
