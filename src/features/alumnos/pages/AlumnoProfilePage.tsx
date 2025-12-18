import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useAlumno } from '../hooks/useAlumnos'
import { AlumnoModal } from '../components/AlumnoModal'
import { AlumnoGeneralTab } from '../components/profile/AlumnoGeneralTab'
import { AlumnoAcademicoTab } from '../components/profile/AlumnoAcademicoTab'
import { AlumnoCobranzaTab } from '../components/profile/AlumnoCobranzaTab'
import { AlumnoDocumentosTab } from '../components/profile/AlumnoDocumentosTab'

export default function AlumnoProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: alumno, isLoading } = useAlumno(Number(id))
  const [activeTab, setActiveTab] = useState('general')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando perfil del alumno...</p>
      </div>
    )
  }

  if (!alumno) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Alumno no encontrado</h2>
        <p className="text-gray-500 mb-6">El alumno que buscas no existe o fue eliminado.</p>
        <Button onClick={() => navigate('/alumnos')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Alumnos
        </Button>
      </div>
    )
  }

  const getNombreCompleto = () => {
    return `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno || ''}`.trim()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/alumnos')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getNombreCompleto()}</h1>
            <p className="text-gray-500 mt-1">
              Matrícula: <span className="font-mono">{alumno.matricula}</span>
            </p>
          </div>
        </div>
        <Button onClick={() => setIsEditModalOpen(true)}>
          <Edit className="h-4 w-4 mr-2" />
          Editar Alumno
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b px-6 pt-6">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="academico">Académico</TabsTrigger>
              <TabsTrigger value="cobranza">Cobranza</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="general">
              <AlumnoGeneralTab alumno={alumno} />
            </TabsContent>

            <TabsContent value="academico">
              <AlumnoAcademicoTab alumno={alumno} />
            </TabsContent>

            <TabsContent value="cobranza">
              <AlumnoCobranzaTab alumno={alumno} />
            </TabsContent>

            <TabsContent value="documentos">
              <AlumnoDocumentosTab alumno={alumno} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Edit Modal */}
      <AlumnoModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        alumno={alumno}
      />
    </div>
  )
}
