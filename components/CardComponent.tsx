'use client'
import Image from 'next/image'
import { Card, CardHeader, CardBody, CardFooter, Chip } from '@nextui-org/react'
import { LocationIcon } from '@/icons/Location'
import { Money } from '@/icons/Money'
import { Bed } from '@/icons/Bed'
import { Badthub } from '@/icons/Badthub'
import { Parking } from '@/icons/Parking'
import Link from 'next/link'

interface CardComponentProps {
  id: string
  nombre: string
  descripcion: string
  communes: { nombre: string }
  valor_uf: number
  habitaciones: number
  banos: number
  estacionamientos: number
  images: { url: string }[]
  states: { nombre: string }
}

export const CardComponent = ({
  id,
  nombre,
  descripcion,
  communes,
  valor_uf,
  habitaciones,
  banos,
  estacionamientos,
  images,
  states,
}: CardComponentProps) => {
  return (
    <Link href={`/propiedades/${id}`}>
      <Card className="py-4 w-96 min-h-[550] flex flex-col last:justify-self-center">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <small className="text-default-500">{states.nombre}</small>
          <h4 className="font-bold text-large">{nombre}</h4>
          <div className="flex items-center w-full">
            <LocationIcon />
            <small className="text-default-500">{communes.nombre}</small>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <div className="relative w-full h-64">
            <Image
              src={images[0]?.url || '/default-image.jpg'}
              alt="Card background"
              className="object-cover rounded-xl"
              layout="fill"
            />
          </div>
        </CardBody>
        <CardBody className="flex px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Money />
              <p className="uppercase font-bold">uf {valor_uf}</p>
            </div>
            <Chip color="default">{states.nombre}</Chip>
          </div>
          <div className="py-2">
            <p className="line-clamp-6 text-justify text-default-500">
              {descripcion}
            </p>
          </div>
        </CardBody>
        <CardFooter className="flex justify-around items-center -mt-3">
          <div className="flex items-center gap-1">
            <Bed /> x {habitaciones}
          </div>
          <div className="flex items-center gap-1">
            <Badthub /> x {banos}
          </div>
          <div className="flex items-center gap-1">
            <Parking /> x {estacionamientos}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
