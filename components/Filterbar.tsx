'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectItem } from '@nextui-org/react'

import { ButtonComponent } from './ButtonComponent'

interface FilterbarProps {
  tiposVenta: Array<{ id: string; nombre: string }>
  tipoPropiedad: Array<{ id: string; nombre: string }>
  tipoComuna: Array<{ id: string; nombre: string }>
}

export const Filterbar = ({
  tiposVenta,
  tipoPropiedad,
  tipoComuna,
}: FilterbarProps) => {
  const router = useRouter()
  const [filters, setFilters] = useState({
    tipoVenta: '',
    tipoPropiedad: '',
    comuna: '',
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    const query = new URLSearchParams(filters).toString()

    router.push(`?${query}`) // Actualiza la URL con los filtros
  }

  return (
    <div className="w-full flex justify-center py-10">
      <div className="bg-gray-400/70 flex justify-center w-3/4 items-center flex-col md:flex-row px-4 py-2 rounded-lg gap-2">
        <Select
          label="Tipo de venta"
          placeholder="Selecciona un tipo"
          onChange={(e) => handleFilterChange('tipoVenta', e.target.value)}
        >
          {tiposVenta.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.nombre}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Tipo de propiedad"
          placeholder="Selecciona tipo de propiedad"
          onChange={(e) => handleFilterChange('tipoPropiedad', e.target.value)}
        >
          {tipoPropiedad.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.nombre}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Comuna"
          placeholder="Selecciona Comuna"
          onChange={(e) => handleFilterChange('comuna', e.target.value)}
        >
          {tipoComuna.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.nombre}
            </SelectItem>
          ))}
        </Select>

        <ButtonComponent
          showButton
          smallButton
          label="Buscar"
          onClick={handleSearch}
        />
      </div>
    </div>
  )
}
