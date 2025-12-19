import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNiveles } from '../hooks/useNiveles';
import type { Nivel } from '@/types/models';

const nivelSchema = z.object({
  nombre: z.enum(['preescolar', 'primaria', 'secundaria', 'preparatoria'], {
    required_error: 'Debes seleccionar un nivel',
  }),
});

type NivelFormData = z.infer<typeof nivelSchema>;

interface NivelModalProps {
  isOpen: boolean;
  onClose: () => void;
  nivel: Nivel | null;
  existingNiveles?: Nivel[];
}

export function NivelModal({ isOpen, onClose, nivel, existingNiveles = [] }: NivelModalProps) {
  const { create, update, isCreating, isUpdating } = useNiveles();
  const isEdit = Boolean(nivel);

  // Nombres de niveles ya registrados (excepto el actual si estamos editando)
  const existingNombres = existingNiveles
    .filter(n => !isEdit || n.id !== nivel?.id)
    .map(n => n.nombre);

  const {
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NivelFormData>({
    resolver: zodResolver(nivelSchema),
    defaultValues: {
      nombre: undefined,
    },
  });

  const selectedNombre = watch('nombre');

  useEffect(() => {
    if (nivel) {
      setValue('nombre', nivel.nombre as any);
    } else {
      reset();
    }
  }, [nivel, setValue, reset]);

  const onSubmit = async (data: NivelFormData) => {
    if (isEdit && nivel) {
      update(
        { id: nivel.id, data },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        }
      );
    } else {
      create(data, {
        onSuccess: () => {
          onClose();
          reset();
        },
      });
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const nivelesOptions = [
    { value: 'preescolar', label: 'Preescolar' },
    { value: 'primaria', label: 'Primaria' },
    { value: 'secundaria', label: 'Secundaria' },
    { value: 'preparatoria', label: 'Preparatoria' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Editar Nivel' : 'Crear Nuevo Nivel'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">
              Nivel Académico <span className="text-red-500">*</span>
            </Label>
            <Select
              value={selectedNombre}
              onValueChange={(value) => setValue('nombre', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un nivel" />
              </SelectTrigger>
              <SelectContent>
                {nivelesOptions.map((option) => {
                  const isDisabled = existingNombres.includes(option.value as any);
                  return (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={isDisabled}
                    >
                      {option.label} {isDisabled && '(Ya registrado)'}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.nombre && (
              <p className="text-sm text-red-500">{errors.nombre.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating
                ? 'Guardando...'
                : isEdit
                ? 'Actualizar'
                : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
