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
import { useGrupos } from '../hooks/useGrupos'
import { GrupoModal } from '../components/GrupoModal'
import type { Grupo } from '@/types/estructura.types'

export default function GruposPage() {
  const { grupos, isLoading, delete: deleteGrupo } = useGrupos()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGrupo, setSelectedGrupo] = useState<Grupo | null>(null)
  const [grupoToDelete, setGrupoToDelete] = useState<Grupo | null>(null)

  const handleEdit = (grupo: Grupo) => {
    setSelectedGrupo(grupo)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedGrupo(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGrupo(null)
  }

  const handleDeleteConfirm = async () => {
    if (grupoToDelete) {
      await deleteGrupo.mutateAsync(grupoToDelete.id)
      setGrupoToDelete(null)
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
          <h1 className="text-3xl font-bold text-gray-900">Grupos</h1>
          <p className="text-gray-500 mt-1">
            Administra los grupos de tu institución
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Grupo
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nivel</TableHead>
              <TableHead>Grado</TableHead>
              <TableHead>Grupo</TableHead>
              <TableHead>Maestro Titular</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grupos?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No hay grupos registrados
                </TableCell>
              </TableRow>
            ) : (
              grupos?.map((grupo) => (
                <TableRow key={grupo.id}>
                  <TableCell className="font-medium capitalize">
                    {grupo.grado?.nivel?.nombre || 'N/A'}
                  </TableCell>
                  <TableCell>{grupo.grado?.nombre || 'N/A'}</TableCell>
                  <TableCell className="font-semibold">{grupo.nombre}</TableCell>
                  <TableCell>
                    {grupo.maestro_id ? `Maestro #${grupo.maestro_id}` : 'Sin asignar'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={grupo.activo ? 'success' : 'secondary'}>
                      {grupo.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(grupo)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setGrupoToDelete(grupo)}
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

      <GrupoModal
        open={isModalOpen}
        onClose={handleCloseModal}
        grupo={selectedGrupo}
      />

      <AlertDialog open={!!grupoToDelete} onOpenChange={() => setGrupoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el grupo "{grupoToDelete?.nombre}". Esta acción no se puede deshacer.
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
