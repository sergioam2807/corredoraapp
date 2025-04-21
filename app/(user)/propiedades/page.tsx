import { CardComponent } from '@/components/CardComponent'
import { Filterbar } from '@/components/Filterbar'
import { PaginationComponent } from '@/components/PaginationComponent'
import { getFilters, getProperties } from '@/services/filters'

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams?: {
    estado_id?: string
    tipo_propiedad_id?: string
    comuna_id?: string
    page?: string
  }
}) {
  const { estado_id, tipo_propiedad_id, comuna_id, page } = searchParams || {}
  const currentPage = parseInt(page || '1', 10)
  const itemsPerPage = 9

  const { properties, total } = await getProperties({
    tipoVenta: estado_id,
    tipoPropiedad: tipo_propiedad_id,
    comuna: comuna_id,
    page: currentPage,
    limit: itemsPerPage,
  })

  const filters = await getFilters()

  return (
    <div>
      <h1 className="text-3xl font-semibold">¡Encuentra tu propiedad!</h1>
      <div className="w-full flex justify-center py-10 lg:w-[800px] md:w-[700px] mx-auto">
        <Filterbar
          tipoComuna={filters.tipoComuna || []}
          tipoPropiedad={filters.tipoPropiedad || []}
          tiposVenta={filters.tiposVenta || []}
        />
      </div>
      {properties.length === 0 && (
        <p className="text-xl font-semibold text-center my-6 ">
          No hay propiedades disponibles
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property: any) => (
          <CardComponent key={property.id} {...property} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <PaginationComponent
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          total={total}
        />
      </div>
    </div>
  )
}
