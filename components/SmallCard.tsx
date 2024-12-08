'use client'
import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import wtsp from '@/public/whatsapp.png'
import email from '@/public/email.png'
import location from '@/public/location.png'
import Link from 'next/link'

export const SmallCard = () => {
  return (
    <Card isFooterBlurred className="w-full px-2 py-4">
      <CardHeader className="z-10 top-1 flex-col items-start">
        <p className="text-justify text-gray-600 ">
          ¿Tienes alguna pregunta o necesitas más información? No dudes en
          ponerte en contacto conmigo. Estoy aquí para ayudarte.
        </p>
      </CardHeader>
      <CardBody className="flex flex-col ">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 ">
          <Link href="https://wa.me/56964562423">
            <div className="flex gap-4">
              <Image src={wtsp} alt="whatsapp" width={24} height={24} />
              <p className="text-default-500 ">+569 64562423</p>
            </div>
          </Link>
          <div className="flex gap-4">
            <Image src={email} alt="email" width={24} height={24} />
            <p className="text-default-500">contacto@lorenasoto.cl</p>
          </div>
          <div className="flex gap-4">
            <Image src={location} alt="location" width={24} height={12} />
            <p className="text-default-500">Region de Valparaiso</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
