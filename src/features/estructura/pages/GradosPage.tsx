import { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
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
import { useGrados } from '../hooks/useGrados'
import { GradoModal } from '../components/GradoModal'
import type { Grado } from '@/types/estructura.types'

export default function GradosPage() {
  const { grados, isLoading, delete: deleteGrado } = useGrados()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGrado, setSelectedGrado] = useState<Grado | null>(null)
  const [gradoToDelete, setGradoToDelete] = useState<Grado | null>(null)

  const handleEdit = (grado: Grado) => {
    setSelectedGrado(grado)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedGrado(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGrado(null)
  }

  const handleDeleteConfirm = async () => {
    if (gradoToDelete) {
      await deleteGrado.mutateAsync(gradoToDelete.id)
      setGradoToDelete(null)
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
          <h1 className="text-3xl font-bold text-gray-900">Grados</h1>
          <p className="text-gray-500 mt-1">
            Administra los grados académicos de tu institución
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Grado
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nivel</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Orden</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grados?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No hay grados registrados
                </TableCell>
              </TableRow>
            ) : (
              grados?.map((grado) => (
                <TableRow key={grado.id}>
                  <TableCell className="font-medium capitalize">
                    {grado.nivel?.nombre || 'N/A'}
                  </TableCell>
                  <TableCell>{grado.nombre}</TableCell>
                  <TableCell>{grado.orden}</TableCell>
                  <TableCell>
                    <Badge variant={grado.activo ? 'success' : 'secondary'}>
                      {grado.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(grado)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setGradoToDelete(grado)}
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

      <GradoModal
        open={isModalOpen}
        onClose={handleCloseModal}
        grado={selectedGrado}
      />

      <AlertDialog open={!!gradoToDelete} onOpenChange={() => setGradoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el grado "{gradoToDelete?.nombre}". Esta acción no se puede deshacer.
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
