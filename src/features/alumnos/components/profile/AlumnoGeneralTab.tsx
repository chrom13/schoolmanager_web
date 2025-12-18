import { Mail, Phone, MapPin, Calendar, User, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Alumno } from '@/types/alumnos.types'

interface AlumnoGeneralTabProps {
  alumno: Alumno
}

export function AlumnoGeneralTab({ alumno }: AlumnoGeneralTabProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificada'
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getEdad = (fechaNacimiento?: string) => {
    if (!fechaNacimiento) return null
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  return (
    <div className="space-y-6">
      {/* Información Básica */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Nombre Completo</p>
              <p className="text-base font-medium text-gray-900">
                {alumno.nombre} {alumno.apellido_paterno} {alumno.apellido_materno}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Matrícula</p>
              <p className="text-base font-mono font-medium text-gray-900">{alumno.matricula}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Género</p>
              <p className="text-base text-gray-900 capitalize">
                {alumno.genero || 'No especificado'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Estado</p>
              <Badge variant={alumno.activo ? 'success' : 'secondary'}>
                {alumno.activo ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Fecha de Nacimiento</p>
                <p className="text-base text-gray-900">{formatDate(alumno.fecha_nacimiento)}</p>
                {alumno.fecha_nacimiento && (
                  <p className="text-sm text-gray-500 mt-1">{getEdad(alumno.fecha_nacimiento)} años</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">CURP</p>
              <p className="text-base font-mono text-gray-900">{alumno.curp || 'No especificada'}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Información de Contacto */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
        <div className="space-y-4">
          {alumno.direccion && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Dirección</p>
                <p className="text-base text-gray-900">{alumno.direccion}</p>
              </div>
            </div>
          )}

          {alumno.telefono && (
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                <p className="text-base text-gray-900">{alumno.telefono}</p>
              </div>
            </div>
          )}

          {alumno.email && (
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-base text-gray-900">{alumno.email}</p>
              </div>
            </div>
          )}

          {!alumno.direccion && !alumno.telefono && !alumno.email && (
            <p className="text-sm text-gray-400 text-center py-4">
              No hay información de contacto registrada
            </p>
          )}
        </div>
      </Card>

      {/* Grupo Asignado */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Asignación Académica</h3>
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500 mb-1">Grupo</p>
            {alumno.grupo ? (
              <p className="text-base font-medium text-gray-900">
                {alumno.grupo.grado?.nivel?.nombre} - {alumno.grupo.grado?.nombre} {alumno.grupo.nombre}
              </p>
            ) : (
              <p className="text-base text-gray-400">Sin grupo asignado</p>
            )}
          </div>
        </div>
      </Card>

      {/* Padres/Tutores */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Padres/Tutores
        </h3>
        {alumno.padres && alumno.padres.length > 0 ? (
          <div className="space-y-4">
            {alumno.padres.map((ap, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-medium text-gray-900">
                        {ap.padre?.nombre_completo || 'Nombre no disponible'}
                      </p>
                      <Badge variant="outline" className="text-xs capitalize">
                        {ap.parentesco}
                      </Badge>
                    </div>

                    <div className="space-y-1 text-sm">
                      {ap.padre?.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="h-4 w-4" />
                          {ap.padre.email}
                        </div>
                      )}
                      {ap.padre?.telefono && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          {ap.padre.telefono}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 mt-3">
                      {ap.responsable_pagos && (
                        <Badge variant="success" className="text-xs">
                          Responsable de pagos
                        </Badge>
                      )}
                      {ap.contacto_emergencia && (
                        <Badge variant="destructive" className="text-xs">
                          Contacto de emergencia
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            No hay padres/tutores registrados
          </p>
        )}
      </Card>
    </div>
  )
}
