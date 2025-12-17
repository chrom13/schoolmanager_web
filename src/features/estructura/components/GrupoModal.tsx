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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGrupos } from '../hooks/useGrupos'
import { useGrados } from '../hooks/useGrados'
import type { Grupo } from '@/types/estructura.types'

const grupoSchema = z.object({
  grado_id: z.string().min(1, 'El grado es requerido'),
  nombre: z.string().min(1, 'El nombre es requerido'),
  maestro_id: z.string().optional(),
})

type GrupoForm = z.infer<typeof grupoSchema>

interface GrupoModalProps {
  open: boolean
  onClose: () => void
  grupo?: Grupo | null
}

export function GrupoModal({ open, onClose, grupo }: GrupoModalProps) {
  const { create, update } = useGrupos()
  const { grados } = useGrados()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<GrupoForm>({
    resolver: zodResolver(grupoSchema),
  })

  const selectedGradoId = watch('grado_id')

  useEffect(() => {
    if (grupo) {
      setValue('grado_id', String(grupo.grado_id))
      setValue('nombre', grupo.nombre)
      if (grupo.maestro_id) {
        setValue('maestro_id', String(grupo.maestro_id))
      }
    } else {
      reset()
    }
  }, [grupo, setValue, reset])

  const onSubmit = async (data: GrupoForm) => {
    const payload = {
      grado_id: Number(data.grado_id),
      nombre: data.nombre,
      maestro_id: data.maestro_id ? Number(data.maestro_id) : undefined,
    }

    if (grupo) {
      await update.mutateAsync({ id: grupo.id, data: payload })
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
            {grupo ? 'Editar Grupo' : 'Nuevo Grupo'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="grado_id">Grado</Label>
            <Select
              value={selectedGradoId}
              onValueChange={(value) => setValue('grado_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un grado" />
              </SelectTrigger>
              <SelectContent>
                {grados?.map((grado) => (
                  <SelectItem key={grado.id} value={String(grado.id)}>
                    {grado.nivel?.nombre} - {grado.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.grado_id && (
              <p className="text-sm text-red-500">{errors.grado_id.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Grupo</Label>
            <Input
              id="nombre"
              placeholder="Ejemplo: A, B, Matutino"
              {...register('nombre')}
            />
            {errors.nombre && (
              <p className="text-sm text-red-500">{errors.nombre.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maestro_id">Maestro Titular (Opcional)</Label>
            <Input
              id="maestro_id"
              type="number"
              placeholder="ID del maestro"
              {...register('maestro_id')}
            />
            <p className="text-xs text-gray-500">
              Dejar vacío si aún no se asigna un maestro
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {grupo ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
