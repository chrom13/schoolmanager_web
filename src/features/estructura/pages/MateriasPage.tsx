import { useState } from 'react'
import { Plus, Edit, Trash2, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { Badge } from '@/components/ui/badge'
import { useMaterias } from '../hooks/useMaterias'
import { MateriaModal } from '../components/MateriaModal'
import type { Materia } from '@/types/estructura.types'

export default function MateriasPage() {
  const { materias, isLoading, delete: deleteMateria } = useMaterias()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null)
  const [materiaToDelete, setMateriaToDelete] = useState<Materia | null>(null)

  const handleEdit = (materia: Materia) => {
    setSelectedMateria(materia)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedMateria(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMateria(null)
  }

  const handleDeleteConfirm = async () => {
    if (materiaToDelete) {
      await deleteMateria.mutateAsync(materiaToDelete.id)
      setMateriaToDelete(null)
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Materias</h1>
          <p className="text-gray-500 mt-1">
            Administra las materias de tu institución
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Materia
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Clave</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materias?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No hay materias registradas
                </TableCell>
              </TableRow>
            ) : (
              materias?.map((materia) => (
                <TableRow key={materia.id}>
                  <TableCell className="font-medium">{materia.nombre}</TableCell>
                  <TableCell>
                    {materia.clave ? (
                      <Badge variant="outline">{materia.clave}</Badge>
                    ) : (
                      <span className="text-gray-400">Sin clave</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={materia.activo ? 'success' : 'secondary'}>
                      {materia.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(materia)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Asignar a grupos (próximamente)"
                      >
                        <LinkIcon className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMateriaToDelete(materia)}
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

      <MateriaModal
        open={isModalOpen}
        onClose={handleCloseModal}
        materia={selectedMateria}
      />

      <AlertDialog open={!!materiaToDelete} onOpenChange={() => setMateriaToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la materia "{materiaToDelete?.nombre}". Esta acción no se puede deshacer.
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
