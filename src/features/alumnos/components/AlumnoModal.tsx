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
import { useAlumnos } from '../hooks/useAlumnos'
import { useTutores } from '../hooks/useTutores'
import { useGrupos } from '@/features/estructura/hooks/useGrupos'
import type { Alumno } from '@/types/alumnos.types'

const alumnoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido_paterno: z.string().min(1, 'El apellido paterno es requerido'),
  apellido_materno: z.string().optional(),
  fecha_nacimiento: z.string().optional(),
  curp: z.string().optional(),
  genero: z.enum(['masculino', 'femenino', 'otro']).optional(),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  grupo_id: z.string().optional(),
  tutor_id: z.string().optional(),
})

type AlumnoForm = z.infer<typeof alumnoSchema>

interface AlumnoModalProps {
  open: boolean
  onClose: () => void
  alumno?: Alumno | null
}

export function AlumnoModal({ open, onClose, alumno }: AlumnoModalProps) {
  const { create, update } = useAlumnos()
  const { tutores } = useTutores()
  const { grupos } = useGrupos()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<AlumnoForm>({
    resolver: zodResolver(alumnoSchema),
  })

  const selectedGrupoId = watch('grupo_id')
  const selectedTutorId = watch('tutor_id')
  const selectedGenero = watch('genero')

  useEffect(() => {
    if (alumno) {
      setValue('nombre', alumno.nombre)
      setValue('apellido_paterno', alumno.apellido_paterno)
      setValue('apellido_materno', alumno.apellido_materno || '')
      setValue('fecha_nacimiento', alumno.fecha_nacimiento || '')
      setValue('curp', alumno.curp || '')
      setValue('genero', alumno.genero)
      setValue('direccion', alumno.direccion || '')
      setValue('telefono', alumno.telefono || '')
      setValue('email', alumno.email || '')
      if (alumno.grupo_id) setValue('grupo_id', String(alumno.grupo_id))
      if (alumno.tutor_id) setValue('tutor_id', String(alumno.tutor_id))
    } else {
      reset()
    }
  }, [alumno, setValue, reset])

  const onSubmit = async (data: AlumnoForm) => {
    const payload = {
      nombre: data.nombre,
      apellido_paterno: data.apellido_paterno,
      apellido_materno: data.apellido_materno || undefined,
      fecha_nacimiento: data.fecha_nacimiento || undefined,
      curp: data.curp || undefined,
      genero: data.genero,
      direccion: data.direccion || undefined,
      telefono: data.telefono || undefined,
      email: data.email || undefined,
      grupo_id: data.grupo_id ? Number(data.grupo_id) : undefined,
      tutor_id: data.tutor_id ? Number(data.tutor_id) : undefined,
    }

    if (alumno) {
      await update.mutateAsync({ id: alumno.id, data: payload })
    } else {
      await create.mutateAsync(payload)
    }
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {alumno ? 'Editar Alumno' : 'Nuevo Alumno'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Datos personales */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Datos Personales</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre(s) *</Label>
                <Input
                  id="nombre"
                  placeholder="Juan"
                  {...register('nombre')}
                />
                {errors.nombre && (
                  <p className="text-sm text-red-500">{errors.nombre.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellido_paterno">Apellido Paterno *</Label>
                <Input
                  id="apellido_paterno"
                  placeholder="Pérez"
                  {...register('apellido_paterno')}
                />
                {errors.apellido_paterno && (
                  <p className="text-sm text-red-500">{errors.apellido_paterno.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apellido_materno">Apellido Materno</Label>
                <Input
                  id="apellido_materno"
                  placeholder="García"
                  {...register('apellido_materno')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fecha_nacimiento"
                  type="date"
                  {...register('fecha_nacimiento')}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genero">Género</Label>
                <Select
                  value={selectedGenero}
                  onValueChange={(value) => setValue('genero', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="curp">CURP</Label>
                <Input
                  id="curp"
                  placeholder="ABCD123456HDFRRL09"
                  {...register('curp')}
                />
              </div>
            </div>
          </div>

          {/* Datos de contacto */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Datos de Contacto</h3>

            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                placeholder="Calle, número, colonia"
                {...register('direccion')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  placeholder="5512345678"
                  {...register('telefono')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="alumno@ejemplo.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Asignación */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Asignación</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grupo_id">Grupo</Label>
                <Select
                  value={selectedGrupoId}
                  onValueChange={(value) => setValue('grupo_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sin asignar</SelectItem>
                    {grupos?.map((grupo) => (
                      <SelectItem key={grupo.id} value={String(grupo.id)}>
                        {grupo.grado?.nivel?.nombre} - {grupo.grado?.nombre} {grupo.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tutor_id">Tutor</Label>
                <Select
                  value={selectedTutorId}
                  onValueChange={(value) => setValue('tutor_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tutor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sin asignar</SelectItem>
                    {tutores?.map((tutor) => (
                      <SelectItem key={tutor.id} value={String(tutor.id)}>
                        {tutor.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {alumno ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
