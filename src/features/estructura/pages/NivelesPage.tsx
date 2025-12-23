import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useNiveles } from '../hooks/useNiveles';
import { NivelModal } from '../components/NivelModal';
import type { Nivel } from '@/types/models';

export default function NivelesPage() {
  const { niveles, isLoading, deleteMutation } = useNiveles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNivel, setSelectedNivel] = useState<Nivel | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [nivelToDelete, setNivelToDelete] = useState<{ id: number; nombre: string } | null>(null);

  const handleCreate = () => {
    setSelectedNivel(null);
    setIsModalOpen(true);
  };

  const handleEdit = (nivel: Nivel) => {
    setSelectedNivel(nivel);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (nivel: Nivel) => {
    setNivelToDelete({ id: nivel.id, nombre: nivel.nombre });
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (nivelToDelete) {
      try {
        await deleteMutation.mutateAsync(nivelToDelete.id);
        handleCloseConfirmDelete();
      } catch (error) {
        // Error ya manejado por el mutation
      }
    }
  };

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
    setNivelToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNivel(null);
  };

  const getNivelLabel = (nombre: string) => {
    const labels: Record<string, string> = {
      preescolar: 'Preescolar',
      primaria: 'Primaria',
      secundaria: 'Secundaria',
      preparatoria: 'Preparatoria',
    };
    return labels[nombre] || nombre;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando niveles...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Niveles Académicos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona los niveles educativos de tu institución
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Nivel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Lista de Niveles</h2>
            <Badge variant="secondary">{niveles.length} niveles</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {niveles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No hay niveles registrados</p>
              <Button onClick={handleCreate} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Crear primer nivel
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Alumnos</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {niveles.map((nivel) => (
                  <TableRow key={nivel.id}>
                    <TableCell className="font-medium">{getNivelLabel(nivel.nombre)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {nivel.total_alumnos || 0} {nivel.total_alumnos === 1 ? 'alumno' : 'alumnos'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(nivel)}
                          disabled={deleteMutation.isPending}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(nivel)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <NivelModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        nivel={selectedNivel}
        existingNiveles={niveles}
      />

      <ConfirmDialog
        isOpen={isConfirmDeleteOpen}
        onClose={handleCloseConfirmDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar Nivel"
        description={`¿Estás seguro de que deseas eliminar el nivel "${getNivelLabel(nivelToDelete?.nombre || '')}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
