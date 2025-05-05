'use client'
import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

import wtsp from '@/public/whatsapp.png'
import email from '@/public/email.png'
import location from '@/public/location.png'

export const SmallCard = () => {
  return (
    <Card isFooterBlurred className="w-full px-2 py-4 lg:flex-col lg:h-[448px]">
      <CardHeader className="z-10 top-1 flex-col items-start">
        <p className="text-center  text-gray-600 ">
          Puedes contactarme a través de cualquiera de los siguientes medios.
          ¡Estoy disponible para ayudarte!
        </p>
      </CardHeader>
      <CardBody className="flex flex-col lg:mt-6 lg:pl-12">
        <div className="flex flex-col gap-6">
          <Link href="https://wa.me/56985984753">
            <div className="flex gap-4">
              <Image alt="whatsapp" height={24} src={wtsp} width={24} />
              <p className="text-default-500 ">+569 985984753</p>
            </div>
          </Link>
          <Link href="mailto:Lshpropiedades@gmail.com">
            <div className="flex gap-4">
              <Image alt="email" height={24} src={email} width={24} />
              <p className="text-default-500">Lshpropiedades@gmail.com</p>
            </div>
          </Link>
          <div className="flex gap-4">
            <Image alt="location" height={24} src={location} width={24} />
            <p className="text-default-500">Region de Valparaiso</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-center align-center w-full lg:hidden">
        <iframe
          allowFullScreen={true}
          className="rounded-lg"
          height="300"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d504379.1788305229!2d-71.85271372873844!3d-32.90993636431451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de0024d67dbf%3A0x21e8b06ea5d15502!2sValpara%C3%ADso%2C%20Chile!5e0!3m2!1ses!2scl!4v1699999999999"
          style={{ border: 0 }}
          title="Mapa de la Región de Valparaíso"
          width="100%"
        />
      </CardFooter>
    </Card>
  )
}
