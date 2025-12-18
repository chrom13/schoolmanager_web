import { BookOpen, TrendingUp, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { Alumno } from '@/types/alumnos.types'

interface AlumnoAcademicoTabProps {
  alumno: Alumno
}

export function AlumnoAcademicoTab({ alumno }: AlumnoAcademicoTabProps) {
  return (
    <div className="space-y-6">
      {/* Información del Grupo */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Grupo Actual
        </h3>
        {alumno.grupo ? (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">Grupo</p>
              <p className="text-base font-medium text-gray-900">
                {alumno.grupo.grado?.nivel?.nombre} - {alumno.grupo.grado?.nombre} {alumno.grupo.nombre}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Nivel Educativo</p>
              <p className="text-base text-gray-900">{alumno.grupo.grado?.nivel?.nombre}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Grado</p>
              <p className="text-base text-gray-900">{alumno.grupo.grado?.nombre}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-8">
            El alumno no está asignado a ningún grupo
          </p>
        )}
      </Card>

      {/* Calificaciones */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Calificaciones
        </h3>
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-sm text-gray-500 mb-2">Módulo de calificaciones</p>
          <p className="text-xs text-gray-400">
            Las calificaciones se mostrarán aquí una vez que el módulo esté disponible
          </p>
        </div>
      </Card>

      {/* Asistencias */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Asistencias
        </h3>
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-sm text-gray-500 mb-2">Módulo de asistencias</p>
          <p className="text-xs text-gray-400">
            El registro de asistencias se mostrará aquí una vez que el módulo esté disponible
          </p>
        </div>
      </Card>
    </div>
  )
}
