import { unstable_noStore } from 'next/cache' // Importa forceDynamic

import { CardComponent } from '@/components/CardComponent'
import { Filterbar } from '@/components/Filterbar'
import { getFilters, getProperties } from '@/services/filters'

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams?: {
    estado_id?: string
    tipo_propiedad_id?: string
    comuna_id?: string
  }
}) {
  unstable_noStore() // Evita el caché y siempre obtiene nuevos datos

  const { estado_id, tipo_propiedad_id, comuna_id } = searchParams || {}
  const properties = await getProperties({
    tipoVenta: estado_id,
    tipoPropiedad: tipo_propiedad_id,
    comuna: comuna_id,
  })

  const filters = await getFilters()

  return (
    <div>
      <h1 className="text-3xl font-semibold">¡Encuentra tu propiedad!</h1>
      <div className="w-full flex justify-center py-10">
        <Filterbar
          tipoComuna={filters.tipoComuna || []}
          tipoPropiedad={filters.tipoPropiedad || []}
          tiposVenta={filters.tiposVenta || []}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property: any) => (
          <CardComponent key={property.id} {...property} />
        ))}
      </div>
    </div>
  )
}
