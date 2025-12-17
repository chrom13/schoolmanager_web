import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMaterias } from '../hooks/useMaterias'
import type { Materia } from '@/types/estructura.types'

const materiaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  clave: z.string().optional(),
})

type MateriaForm = z.infer<typeof materiaSchema>

interface MateriaModalProps {
  open: boolean
  onClose: () => void
  materia?: Materia | null
}

export function MateriaModal({ open, onClose, materia }: MateriaModalProps) {
  const { create, update } = useMaterias()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<MateriaForm>({
    resolver: zodResolver(materiaSchema),
  })

  useEffect(() => {
    if (materia) {
      setValue('nombre', materia.nombre)
      if (materia.clave) {
        setValue('clave', materia.clave)
      }
    } else {
      reset()
    }
  }, [materia, setValue, reset])

  const onSubmit = async (data: MateriaForm) => {
    const payload = {
      nombre: data.nombre,
      clave: data.clave || undefined,
    }

    if (materia) {
      await update.mutateAsync({ id: materia.id, data: payload })
    } else {
      await create.mutateAsync(payload)
    }
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {materia ? 'Editar Materia' : 'Nueva Materia'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la Materia</Label>
            <Input
              id="nombre"
              placeholder="Ejemplo: Matemáticas, Español"
              {...register('nombre')}
            />
            {errors.nombre && (
              <p className="text-sm text-red-500">{errors.nombre.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="clave">Clave (Opcional)</Label>
            <Input
              id="clave"
              placeholder="Ejemplo: MAT-101"
              {...register('clave')}
            />
            <p className="text-xs text-gray-500">
              Código identificador de la materia
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {materia ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
