import { FileText, Upload, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Alumno } from '@/types/alumnos.types'

interface AlumnoDocumentosTabProps {
  alumno: Alumno
}

export function AlumnoDocumentosTab({ alumno }: AlumnoDocumentosTabProps) {
  return (
    <div className="space-y-6">
      {/* Subir Documentos */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentos del Alumno
          </h3>
          <Button variant="outline" size="sm" disabled>
            <Upload className="h-4 w-4 mr-2" />
            Subir Documento
          </Button>
        </div>

        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-sm text-gray-500 mb-2">Módulo de documentos</p>
          <p className="text-xs text-gray-400 mb-4">
            La gestión de documentos estará disponible próximamente
          </p>
          <p className="text-xs text-gray-400">
            Podrás subir y gestionar documentos como actas de nacimiento, CURP, fotografías, etc.
          </p>
        </div>
      </Card>

      {/* Lista de Documentos (placeholder) */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentos Requeridos</h3>
        <div className="space-y-3">
          {[
            'Acta de nacimiento',
            'CURP',
            'Fotografía',
            'Certificado médico',
            'Comprobante de domicilio',
          ].map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{doc}</p>
                  <p className="text-xs text-gray-400">No disponible</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" disabled>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled>
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
