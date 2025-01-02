import { CardComponent } from '@/components/CardComponent'
import { Filterbar } from '@/components/Filterbar'
import { ButtonComponent } from '@/components/ButtonComponent'
import { getFilters, getProperties } from '@/services/filters'

export default async function PropiedadesPage() {
  const properties = await getProperties()
  const { tiposVenta, tipoPropiedad, tipoComuna } = await getFilters()

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold">¡Encuentra tu propiedad!</h1>
      </div>
      <div className="w-full flex justify-center py-10">
        <div className="bg-gray-400/70 flex justify-center w-3/4 items-center flex-col md:flex-row px-4 py-2 rounded-lg gap-2">
          <Filterbar
            filters={tiposVenta.map((item: any) => ({
              key: item.id,
              label: item.nombre,
            }))}
          />
          <Filterbar
            label="Tipo de propiedad"
            placeholder="Selecciona tipo de propiedad"
            filters={tipoPropiedad.map((item: any) => ({
              key: item.id,
              label: item.nombre,
            }))}
          />
          <Filterbar
            label="Comuna"
            placeholder="Selecciona Comuna"
            filters={tipoComuna.map((item: any) => ({
              key: item.id,
              label: item.nombre,
            }))}
          />
          <ButtonComponent label="Buscar" showButton smallButton />
        </div>
      </div>
      {/* listado de propiedades */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property: any) => (
          <CardComponent key={property.id} {...property} />
        ))}
      </div>
    </div>
  )
}
