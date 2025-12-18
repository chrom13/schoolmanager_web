import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useAlumnos } from '../hooks/useAlumnos'
import { useGrupos } from '@/features/estructura/hooks/useGrupos'
import { AlumnoModal } from '../components/AlumnoModal'
import type { Alumno } from '@/types/alumnos.types'

export default function AlumnosPage() {
  const navigate = useNavigate()
  const { alumnos, isLoading, delete: deleteAlumno } = useAlumnos()
  const { grupos } = useGrupos()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null)
  const [alumnoToDelete, setAlumnoToDelete] = useState<Alumno | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrupoFilter, setSelectedGrupoFilter] = useState<string>('all')

  const handleEdit = (alumno: Alumno) => {
    setSelectedAlumno(alumno)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedAlumno(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedAlumno(null)
  }

  const handleDeleteConfirm = async () => {
    if (alumnoToDelete) {
      await deleteAlumno.mutateAsync(alumnoToDelete.id)
      setAlumnoToDelete(null)
    }
  }

  // Filtrar alumnos
  const filteredAlumnos = alumnos?.filter((alumno) => {
    const matchesSearch = searchQuery === '' ||
      alumno.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumno.apellido_paterno.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumno.apellido_materno?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumno.matricula.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesGrupo = selectedGrupoFilter === 'all' ||
      String(alumno.grupo_id) === selectedGrupoFilter

    return matchesSearch && matchesGrupo
  })

  const getNombreCompleto = (alumno: Alumno) => {
    return `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno || ''}`.trim()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alumnos</h1>
          <p className="text-gray-500 mt-1">
            Administra los alumnos de tu institución
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Alumno
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar por nombre o matrícula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <Select
              value={selectedGrupoFilter}
              onValueChange={setSelectedGrupoFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos los grupos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los grupos</SelectItem>
                {grupos?.map((grupo) => (
                  <SelectItem key={grupo.id} value={String(grupo.id)}>
                    {grupo.grado?.nivel?.nombre} - {grupo.grado?.nombre} {grupo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-end">
            <p className="text-sm text-gray-500">
              {filteredAlumnos?.length || 0} alumnos encontrados
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de alumnos */}
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matrícula</TableHead>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>Grupo</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlumnos?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No hay alumnos registrados
                </TableCell>
              </TableRow>
            ) : (
              filteredAlumnos?.map((alumno) => (
                <TableRow
                  key={alumno.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/alumnos/${alumno.id}`)}
                >
                  <TableCell className="font-mono text-sm">
                    {alumno.matricula}
                  </TableCell>
                  <TableCell className="font-medium">
                    {getNombreCompleto(alumno)}
                  </TableCell>
                  <TableCell>
                    {alumno.grupo ? (
                      <span className="text-sm">
                        {alumno.grupo.grado?.nivel?.nombre} - {alumno.grupo.grado?.nombre} {alumno.grupo.nombre}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">Sin asignar</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {alumno.tutor ? (
                      <span className="text-sm">{alumno.tutor.nombre}</span>
                    ) : (
                      <span className="text-gray-400 text-sm">Sin tutor</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {alumno.telefono && (
                        <div className="text-gray-600">{alumno.telefono}</div>
                      )}
                      {alumno.email && (
                        <div className="text-gray-500 text-xs">{alumno.email}</div>
                      )}
                      {!alumno.telefono && !alumno.email && (
                        <span className="text-gray-400">Sin contacto</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={alumno.activo ? 'success' : 'secondary'}>
                      {alumno.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEdit(alumno)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setAlumnoToDelete(alumno)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlumnoModal
        open={isModalOpen}
        onClose={handleCloseModal}
        alumno={selectedAlumno}
      />

      <AlertDialog open={!!alumnoToDelete} onOpenChange={() => setAlumnoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará al alumno "{alumnoToDelete && getNombreCompleto(alumnoToDelete)}".
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
