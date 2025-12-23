import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Mail, Search, User, LogOut, Settings as SettingsIcon } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { authApi } from '@/api/auth.api'
import toast from 'react-hot-toast'

export function Header() {
  const navigate = useNavigate()
  const { user, logout: logoutStore } = useAuthStore()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = async () => {
    try {
      await authApi.logout()
      logoutStore()
      toast.success('Sesión cerrada')
      navigate('/login')
    } catch (error) {
      // Logout local aunque falle la API
      logoutStore()
      navigate('/login')
    }
  }

  return (
    <header className="fixed top-0 left-64 right-0 z-30 h-16 bg-white border-b border-gray-200">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Messages */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Mail className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.rol}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                </div>

                <button
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowUserMenu(false)
                    navigate('/perfil')
                  }}
                >
                  <User className="h-4 w-4" />
                  <span>Mi Perfil</span>
                </button>

                <button
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowUserMenu(false)
                    navigate('/configuracion')
                  }}
                >
                  <SettingsIcon className="h-4 w-4" />
                  <span>Configuración</span>
                </button>

                <div className="border-t border-gray-200 my-2"></div>

                <button
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
