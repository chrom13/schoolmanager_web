import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'

export interface PadreFormData {
  id?: number
  nombre_completo: string
  email: string
  telefono: string
  rfc?: string
  parentesco: 'padre' | 'madre' | 'tutor' | 'abuelo' | 'otro'
  responsable_pagos: boolean
  contacto_emergencia: boolean
}

interface PadresFieldArrayProps {
  padres: PadreFormData[]
  onChange: (padres: PadreFormData[]) => void
  errors?: Record<string, any>
}

export function PadresFieldArray({ padres, onChange, errors }: PadresFieldArrayProps) {
  const addPadre = () => {
    onChange([
      ...padres,
      {
        nombre_completo: '',
        email: '',
        telefono: '',
        parentesco: 'padre',
        responsable_pagos: false,
        contacto_emergencia: false,
      },
    ])
  }

  const removePadre = (index: number) => {
    onChange(padres.filter((_, i) => i !== index))
  }

  const updatePadre = (index: number, field: keyof PadreFormData, value: any) => {
    const updated = [...padres]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Padres/Tutores</Label>
        <Button type="button" variant="outline" size="sm" onClick={addPadre}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Padre/Tutor
        </Button>
      </div>

      {padres.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4 border-2 border-dashed rounded-lg">
          No hay padres/tutores agregados. Haz clic en el botón de arriba para agregar uno.
        </p>
      )}

      {padres.map((padre, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Padre/Tutor #{index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removePadre(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre Completo */}
              <div>
                <Label>
                  Nombre Completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={padre.nombre_completo}
                  onChange={(e) =>
                    updatePadre(index, 'nombre_completo', e.target.value)
                  }
                  placeholder="Juan Pérez García"
                />
                {errors?.padres?.[index]?.nombre_completo && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.padres[index].nombre_completo.message}
                  </p>
                )}
              </div>

              {/* Parentesco */}
              <div>
                <Label>
                  Parentesco <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={padre.parentesco}
                  onValueChange={(value: any) =>
                    updatePadre(index, 'parentesco', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="padre">Padre</SelectItem>
                    <SelectItem value="madre">Madre</SelectItem>
                    <SelectItem value="tutor">Tutor</SelectItem>
                    <SelectItem value="abuelo">Abuelo/a</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div>
                <Label>
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  value={padre.email}
                  onChange={(e) => updatePadre(index, 'email', e.target.value)}
                  placeholder="correo@ejemplo.com"
                />
                {errors?.padres?.[index]?.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.padres[index].email.message}
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <Label>Teléfono</Label>
                <Input
                  value={padre.telefono}
                  onChange={(e) => updatePadre(index, 'telefono', e.target.value)}
                  placeholder="5512345678"
                />
              </div>

              {/* RFC */}
              <div>
                <Label>RFC (para facturación)</Label>
                <Input
                  value={padre.rfc || ''}
                  onChange={(e) => updatePadre(index, 'rfc', e.target.value)}
                  placeholder="XAXX010101000"
                  maxLength={13}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`responsable-${index}`}
                  checked={padre.responsable_pagos}
                  onCheckedChange={(checked) =>
                    updatePadre(index, 'responsable_pagos', checked)
                  }
                />
                <Label
                  htmlFor={`responsable-${index}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  Responsable de pagos
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`emergencia-${index}`}
                  checked={padre.contacto_emergencia}
                  onCheckedChange={(checked) =>
                    updatePadre(index, 'contacto_emergencia', checked)
                  }
                />
                <Label
                  htmlFor={`emergencia-${index}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  Contacto de emergencia
                </Label>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
