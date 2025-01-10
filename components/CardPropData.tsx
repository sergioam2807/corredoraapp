import { Badthub } from '@/icons/Badthub'
import { Money } from '@/icons/Money'
import { Mt2 } from '@/icons/Mt2'
import { Parking } from '@/icons/Parking'
import { Bed } from 'lucide-react'

interface CardPropDataProps {
  property: any
}

export function CardPropData({ property }: CardPropDataProps) {
  return (
    <div className="bg-gray-200 bg-opacity-50 rounded-lg py-6 px-4 mb-4 shadow-lg sm:w-[500] md:w-[600] lg:w-[700]">
      <div className="flex justify-between items-center flex-col gap-3">
        <div className="w-full flex justify-around">
          <div>
            <div className="flex items-center gap-1">
              <Money />
              <p className="uppercase font-bold">uf {property.valor_uf}</p>
            </div>
            <div className="text-sm font-bold text-center">Valor</div>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <Mt2 />
              <p className="uppercase font-bold">{property.mt2} mt</p>
            </div>
            <div className="text-sm font-bold text-center">Metros</div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="flex w-full justify-around items-center">
            {/* <Chip color="default">{property.states.nombre}</Chip> */}
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center gap-1 font-bold">
                <Bed /> : {property.habitaciones}
              </div>
              <div className="text-sm font-bold">Habitaciones</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center gap-1 font-bold">
                <Badthub /> : {property.banos}
              </div>
              <div className="text-sm font-bold">Baños</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center gap-1 font-bold">
                <Parking /> : {property.estacionamientos}
              </div>
              <div className="text-sm font-bold">Estacionmiento</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center gap-1 font-bold">
                <Parking /> : {property.bodegas}
              </div>
              <div className="text-sm font-bold">Bodegas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
