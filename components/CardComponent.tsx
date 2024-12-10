'use client'
import Image from 'next/image'
import { Card, CardHeader, CardBody, CardFooter, Chip } from '@nextui-org/react'
import dpto from '@/public/dpto1.jpg'
import { LocationIcon } from '@/icons/Location'
import { Money } from '@/icons/Money'
import { Bed } from '@/icons/Bed'
import { Badthub } from '@/icons/Badthub'
import { Parking } from '@/icons/Parking'
import Link from 'next/link'

interface CardComponentProps {
  id: string
}

export const CardComponent = ({ id }: CardComponentProps) => {
  return (
    <Link href={`/propiedades/${id}`}>
      <Card className="py-4 w-96 h-auto flex flex-col last:justify-self-center">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <small className="text-default-500">Departamento</small>
          <h4 className="font-bold text-large">Cumbres del bosque</h4>
          <div className="flex items-center w-full">
            <LocationIcon />
            <small className="text-default-500">Viña del mar</small>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            src={dpto}
            alt="Card background"
            className="object-cover rounded-xl"
            height={200}
            width={400}
          />
        </CardBody>
        <CardBody className="flex px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Money />
              <p className="uppercase font-bold">uf 12500</p>
            </div>
            <Chip color="default">Venta</Chip>
          </div>
          <div className="py-2">
            <p className="line-clamp-6 text-justify text-default-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              est earum accusantium ad necessitatibus reiciendis eius
              repellendus sint eos expedita fugiat eum id ducimus recusandae,
              sequi sunt similique reprehenderit velit.
            </p>
          </div>
        </CardBody>

        <CardFooter className="flex justify-around items-center -mt-3">
          <div className="flex items-center gap-1">
            <Bed /> x 3
          </div>
          <div className="flex items-center gap-1">
            <Badthub /> x 2
          </div>
          <div className="flex items-center gap-1">
            <Parking /> x 1
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
