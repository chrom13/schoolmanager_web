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
import { useGrados } from '../hooks/useGrados'
import { useNiveles } from '../hooks/useNiveles'
import type { Grado } from '@/types/estructura.types'

const gradoSchema = z.object({
  nivel_id: z.string().min(1, 'El nivel es requerido'),
  nombre: z.string().min(1, 'El nombre es requerido'),
  orden: z.string().min(1, 'El orden es requerido'),
})

type GradoForm = z.infer<typeof gradoSchema>

interface GradoModalProps {
  open: boolean
  onClose: () => void
  grado?: Grado | null
}

export function GradoModal({ open, onClose, grado }: GradoModalProps) {
  const { create, update } = useGrados()
  const { niveles } = useNiveles()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<GradoForm>({
    resolver: zodResolver(gradoSchema),
  })

  const selectedNivelId = watch('nivel_id')

  useEffect(() => {
    if (grado) {
      setValue('nivel_id', String(grado.nivel_id))
      setValue('nombre', grado.nombre)
      setValue('orden', String(grado.orden))
    } else {
      reset()
    }
  }, [grado, setValue, reset])

  const onSubmit = async (data: GradoForm) => {
    const payload = {
      nivel_id: Number(data.nivel_id),
      nombre: data.nombre,
      orden: Number(data.orden),
    }

    if (grado) {
      await update.mutateAsync({ id: grado.id, data: payload })
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
            {grado ? 'Editar Grado' : 'Nuevo Grado'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nivel_id">Nivel</Label>
            <Select
              value={selectedNivelId}
              onValueChange={(value) => setValue('nivel_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un nivel" />
              </SelectTrigger>
              <SelectContent>
                {niveles?.map((nivel) => (
                  <SelectItem key={nivel.id} value={String(nivel.id)}>
                    {nivel.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.nivel_id && (
              <p className="text-sm text-red-500">{errors.nivel_id.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              placeholder="Ejemplo: Primer Grado, 1°"
              {...register('nombre')}
            />
            {errors.nombre && (
              <p className="text-sm text-red-500">{errors.nombre.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="orden">Orden</Label>
            <Input
              id="orden"
              type="number"
              placeholder="1"
              {...register('orden')}
            />
            {errors.orden && (
              <p className="text-sm text-red-500">{errors.orden.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {grado ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
