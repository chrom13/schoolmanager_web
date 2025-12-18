import { DollarSign, CreditCard, AlertCircle, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Alumno } from '@/types/alumnos.types'

interface AlumnoCobranzaTabProps {
  alumno: Alumno
}

export function AlumnoCobranzaTab({ alumno }: AlumnoCobranzaTabProps) {
  // Buscar padre responsable de pagos
  const responsablePagos = alumno.padres?.find((ap) => ap.responsable_pagos)

  return (
    <div className="space-y-6">
      {/* Responsable de Pagos */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Responsable de Pagos
        </h3>
        {responsablePagos ? (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">Nombre</p>
              <p className="text-base font-medium text-gray-900">
                {responsablePagos.padre?.nombre_completo}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Parentesco</p>
              <p className="text-base text-gray-900 capitalize">{responsablePagos.parentesco}</p>
            </div>
            {responsablePagos.padre?.email && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-base text-gray-900">{responsablePagos.padre.email}</p>
              </div>
            )}
            {responsablePagos.padre?.telefono && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                <p className="text-base text-gray-900">{responsablePagos.padre.telefono}</p>
              </div>
            )}
            {responsablePagos.padre?.rfc && (
              <div>
                <p className="text-sm text-gray-500 mb-1">RFC (para facturación)</p>
                <p className="text-base font-mono text-gray-900">{responsablePagos.padre.rfc}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-sm font-medium text-amber-900">Sin responsable de pagos</p>
              <p className="text-xs text-amber-700 mt-1">
                Asigna un padre/tutor como responsable de pagos desde la pestaña General
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Cargos */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Cargos y Pagos
        </h3>
        <div className="text-center py-12">
          <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-sm text-gray-500 mb-2">Módulo de cobranza</p>
          <p className="text-xs text-gray-400">
            Los cargos y pagos se mostrarán aquí una vez que el módulo esté disponible
          </p>
        </div>
      </Card>

      {/* Resumen de Estado de Cuenta */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Cuenta</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Cargos Totales</p>
            <p className="text-2xl font-bold text-gray-400">$0.00</p>
            <p className="text-xs text-gray-400 mt-1">Próximamente</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Pagado</p>
            <p className="text-2xl font-bold text-gray-400">$0.00</p>
            <p className="text-xs text-gray-400 mt-1">Próximamente</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Saldo Pendiente</p>
            <p className="text-2xl font-bold text-gray-400">$0.00</p>
            <p className="text-xs text-gray-400 mt-1">Próximamente</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
