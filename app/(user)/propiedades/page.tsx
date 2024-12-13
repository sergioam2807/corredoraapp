import { CardComponent } from '@/components/CardComponent'
import { Filterbar } from '@/components/Filterbar'
import { ButtonComponent } from '@/components/ButtonComponent'

const tiposVenta = [
  { key: 'venta', label: 'Venta' },
  { key: 'arriendo', label: 'Arriendo' },
]

const tipoPropiedad = [
  { key: 'casa', label: 'Casa' },
  { key: 'depto', label: 'Departamento' },
]

const tipoComuna = [
  { key: 'viña', label: 'Viña del mar' },
  { key: 'concon  ', label: 'Con Con' },
  { key: 'quillota  ', label: 'Quillota' },
  { key: 'limache  ', label: 'Limache' },
]

export default function DocsPage() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold">¡Encuentra tu propiedad!</h1>
      </div>
      <div className="w-full flex justify-center py-10">
        <div className="bg-gray-400/70 flex justify-center w-3/4 items-center flex-col md:flex-row px-4 py-2 rounded-lg gap-2">
          <Filterbar filters={tiposVenta} />
          <Filterbar
            label="Tipo de propiedad"
            placeholder="Selecciona tipo de propiedad"
            filters={tipoPropiedad}
          />
          <Filterbar
            label="Comuna"
            placeholder="Selecciona Comuna"
            filters={tipoComuna}
          />
          <ButtonComponent label="Buscar" showButton smallButton />
        </div>
      </div>
      {/* listado de propiedades */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* <CardComponent id={'1'} />
        <CardComponent id={'2'} />
        <CardComponent id={'3'} />
        <CardComponent id={'4'} />
        <CardComponent id={'5'} />
        <CardComponent id={'6'} /> */}
      </div>
    </div>
  )
}
