'use client'
import Image from 'next/image'
import React from 'react'
import wtsp from '@/public/whatsapp.png'
import email from '@/public/email.png'
import location from '@/public/location.png'
import { usePathname } from 'next/navigation'

export const FooterComponent = () => {
  const pathname = usePathname()
  const isContactPage = pathname === '/contacto'

  return (
    <footer className="w-full flex flex-col items-center justify-center py-4 gap-2">
      {!isContactPage && (
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-8 justify-center">
          <div className="flex gap-1 justify-center">
            <Image
              src={wtsp}
              alt="whatsapp"
              width={24}
              height={12}
              className="fi"
            />
            <p className="text-default-500">+569 64562423</p>
          </div>
          <div className="flex gap-1 justify-center">
            <Image src={email} alt="email" width={24} height={16} />
            <p className="text-default-500">contacto@lorenasoto.cl</p>
          </div>
          <div className="flex gap-1 justify-center">
            <Image src={location} alt="location" width={24} height={14} />
            <p className="text-default-500">Region de Valparaiso</p>
          </div>
        </div>
      )}

      <div className="flex gap-1 mt-2">
        <p className="text-default-500">Visita mis redes sociales</p>
      </div>
      <div className="flex gap-14">
        <Image src={location} alt="location" width={24} height={24} />
        <Image src={location} alt="location" width={24} height={24} />
        <Image src={location} alt="location" width={24} height={24} />
      </div>
    </footer>
  )
}
