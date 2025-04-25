'use client'
import Image from 'next/image'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { LocationIcon } from '@/icons/Location'
import { Money } from '@/icons/Money'
import { Bed } from '@/icons/Bed'
import { Badthub } from '@/icons/Badthub'
import { Parking } from '@/icons/Parking'
import { getStatusColor } from '@/lib/utils'
import { Share } from '@/icons/Share'

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
  disponibilidad_id: number
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
  disponibilidad_id,
}: CardComponentProps) => {
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(
    `¡Mira esta propiedad! ${nombre} en ${communes?.nombre}. Más detalles aquí: ${window.location.origin}/propiedades/${id}`
  )}`

  const params = useParams()

  const handleShareClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <>
      <Card className="py-4 w-96 h-[650] flex flex-col last:justify-self-center">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <div className="absolute top-2 right-2">
            <Dropdown>
              <DropdownTrigger>
                <button
                  className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200"
                  onClick={handleShareClick}
                >
                  <Share />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Share options">
                <DropdownItem key="whatsapp">
                  <a href={shareUrl} rel="noopener noreferrer" target="_blank">
                    Compartir en WhatsApp
                  </a>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <small className="text-default-500">{states?.nombre}</small>
          <h4 className="font-bold text-large">{nombre}</h4>
          <div className="flex items-center w-full">
            <LocationIcon />
            <small className="text-default-500">{communes?.nombre}</small>
          </div>
        </CardHeader>
        {!params.id ? (
          <Link href={`/propiedades/${id}`}>
            <CardBody className="overflow-visible py-2">
              <div className="relative w-full h-64">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  layout="fill"
                  src={
                    Array.isArray(images) && images.length > 0
                      ? images[0].url
                      : '/default-image.jpg'
                  }
                />
                {/* Mensaje de estado */}
                {disponibilidad_id === 1 && (
                  <div className="absolute rounded-xl top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold">Vendida</p>
                  </div>
                )}
                {disponibilidad_id === 2 && (
                  <div className="absolute rounded-xl b top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold">Arrendada</p>
                  </div>
                )}
              </div>
            </CardBody>
            <CardBody className="flex px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Money />
                  <p className="uppercase font-bold">uf {valor_uf}</p>
                </div>
                <Chip color={getStatusColor(states?.nombre)}>
                  {states?.nombre}
                </Chip>
              </div>
              <div className="py-2 h-[150px] overflow-hidden">
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
          </Link>
        ) : (
          <>
            <CardBody className="overflow-visible py-2">
              <div className="relative w-full h-64">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  layout="fill"
                  src={
                    Array.isArray(images) && images.length > 0
                      ? images[0].url
                      : '/default-image.jpg'
                  }
                />
                {/* Mensaje de estado */}
                {disponibilidad_id === 1 && (
                  <div className="absolute rounded-xl top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold">Vendida</p>
                  </div>
                )}
                {disponibilidad_id === 2 && (
                  <div className="absolute rounded-xl b top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold">Arrendada</p>
                  </div>
                )}
              </div>
            </CardBody>
            <CardBody className="flex px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Money />
                  <p className="uppercase font-bold">uf {valor_uf}</p>
                </div>
                <Chip color={getStatusColor(states?.nombre)}>
                  {states?.nombre}
                </Chip>
              </div>
              <div className="py-2 h-[150px] overflow-hidden">
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
          </>
        )}
      </Card>
    </>
  )
}
