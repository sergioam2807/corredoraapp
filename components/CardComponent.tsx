'use client'
import Image from 'next/image'
import { Card, CardHeader, CardBody, CardFooter, Chip } from '@nextui-org/react'
import dpto from '@/public/dpto1.jpg'

export const CardComponent = () => {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <small className="text-default-500">Departamento</small>
        <h4 className="font-bold text-large">Cumbres del bosque</h4>
        <small className="text-default-500">Viña del mar</small>
        {/* <p className="text-tiny uppercase font-bold">Viña del mar</p> */}
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          src={dpto}
          alt="Card background"
          className="object-cover rounded-xl"
          height={200}
          width={300}
        />
      </CardBody>
      <CardBody className="flex  px-4">
        <div className="flex justify-between items-center">
          <p className="uppercase font-bold">uf 12500</p>
          <Chip color="default">Venta</Chip>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center px-4"></CardFooter>
    </Card>
  )
}
