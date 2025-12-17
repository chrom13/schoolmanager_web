import { Users, GraduationCap, DollarSign, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'

export default function DashboardPage() {
  const { user } = useAuthStore()

  // TODO: Obtener datos reales de la API
  const stats = [
    {
      title: 'Total Alumnos',
      value: '0',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Maestros',
      value: '0',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Ingresos del Mes',
      value: '$0',
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Morosidad',
      value: '0%',
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          ¡Bienvenido, {user?.nombre}!
        </h1>
        <p className="text-gray-600 mt-2">
          Aquí está el resumen de {user?.escuela.nombre}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Agregar Alumno</h3>
              <p className="text-sm text-gray-600 mt-1">
                Registra un nuevo estudiante
              </p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <GraduationCap className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Registrar Calificaciones</h3>
              <p className="text-sm text-gray-600 mt-1">
                Captura las calificaciones
              </p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <DollarSign className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Generar Cargos</h3>
              <p className="text-sm text-gray-600 mt-1">
                Crea nuevos cargos de pago
              </p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium">Sistema iniciado</p>
                <p className="text-xs text-gray-500">Bienvenido a tu sistema de gestión escolar</p>
              </div>
              <span className="text-xs text-gray-500">Ahora</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
