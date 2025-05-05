'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectItem } from '@nextui-org/react'

import { ButtonComponent } from './ButtonComponent'

interface FilterbarProps {
  tiposVenta: Array<{ id: string; nombre: string }>
  tipoPropiedad: Array<{ id: string; nombre: string }>
  tipoComuna: Array<{ id: string; nombre: string }>
  tipoRegion: Array<{ id: string; nombre: string }>
}

export const Filterbar = ({
  tiposVenta,
  tipoPropiedad,
  tipoComuna,
  tipoRegion,
}: FilterbarProps) => {
  const router = useRouter()
  const [filters, setFilters] = useState({
    estado_id: '',
    tipo_propiedad_id: '',
    comuna_id: '',
    region_id: '',
  })
  const [isPending, startTransition] = useTransition()
  const [localComunas, setLocalComunas] = useState<
    Array<{ id: string; nombre: string }>
  >([])
  const [loadingComunas, setLoadingComunas] = useState(false)

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))

    if (key === 'region_id') {
      setFilters((prev) => ({ ...prev, comuna_id: '' }))
      fetchComunas(value)
    }
  }

  const fetchComunas = async (regionId: string) => {
    setLoadingComunas(true)
    try {
      const res = await fetch(`/api/communes?regionId=${regionId}`)
      const data = await res.json()

      setLocalComunas(data || [])
    } catch (error) {
      console.error('Error fetching comunas:', error)
      setLocalComunas([])
    } finally {
      setLoadingComunas(false)
    }
  }

  const handleSearch = () => {
    const query = new URLSearchParams(filters).toString()

    startTransition(() => {
      router.push(`?${query}`)
    })
  }

  return (
    <div className="w-full flex justify-center py-10">
      <div className="bg-gray-400/70 flex justify-center w-full items-center flex-col md:flex-row px-4 py-2 rounded-lg gap-2">
        <Select
          className="w-full"
          label="Tipo de venta"
          placeholder="Selecciona un tipo"
          onChange={(e) => handleFilterChange('estado_id', e.target.value)}
        >
          {tiposVenta.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.nombre}
            </SelectItem>
          ))}
        </Select>

        <Select
          className="w-full"
          label="Tipo de propiedad"
          placeholder="Selecciona tipo de propiedad"
          onChange={(e) =>
            handleFilterChange('tipo_propiedad_id', e.target.value)
          }
        >
          {tipoPropiedad.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.nombre}
            </SelectItem>
          ))}
        </Select>

        <Select
          className="w-full"
          label="Región"
          placeholder="Selecciona Región"
          onChange={(e) => handleFilterChange('region_id', e.target.value)}
        >
          {tipoRegion.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.nombre}
            </SelectItem>
          ))}
        </Select>

        <Select
          className="w-full"
          disabled={!filters.region_id || loadingComunas}
          label="Comuna"
          placeholder="Selecciona Comuna"
          onChange={(e) => handleFilterChange('comuna_id', e.target.value)}
        >
          {localComunas.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.nombre}
            </SelectItem>
          ))}
        </Select>

        <ButtonComponent
          showButton
          smallButton
          disabled={isPending}
          isPending={isPending}
          label={'Buscar'}
          onClick={handleSearch}
        />
      </div>
    </div>
  )
}
