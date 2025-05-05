'use client'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import wtsp from '@/public/whatsapp.png'
import email from '@/public/email.png'
import location from '@/public/location.png'
import facebook from '@/public/facebook.png'
import insta from '@/public/instagram.png'

export const FooterComponent = () => {
  const pathname = usePathname()
  const isContactPage = pathname === '/contacto'

  return (
    <footer className="w-full flex items-center justify-around py-4 gap-2">
      {!isContactPage && (
        <div className="flex flex-col lg:flex-row  gap-1 lg:gap-8 justify-center">
          <p className="text-default-500 font-bold">Contacto:</p>
          <div className="flex gap-1">
            <Image
              alt="whatsapp"
              className="fi"
              height={24}
              src={wtsp}
              width={24}
            />
            <p className="text-default-500">+569 64562423</p>
          </div>
          <div className="flex gap-1">
            <Image alt="email" height={24} src={email} width={24} />
            <p className="text-default-500">contacto@lorenasoto.cl</p>
          </div>
          <div className="flex gap-1">
            <Image alt="location" height={24} src={location} width={24} />
            <p className="text-default-500">Region de Valparaiso</p>
          </div>
        </div>
      )}

      <div className="flex flex-col w-1/2gap-4 gap-2 justify-center sm:flex-row">
        <p className="text-default-500 font-bold">Visita mis redes sociales:</p>
        <div className="gap-4 flex justify-center">
          <Link
            aria-label="Ir al Instagram de LSH Propiedades"
            href="https://www.instagram.com/lshpropiedades"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image alt="Instagram" height={24} src={insta} width={24} />
          </Link>
          <Link
            aria-label="Ir al Facebook de LSH Propiedades"
            href="https://www.facebook.com/sercop.cl/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image alt="Facebook" height={24} src={facebook} width={24} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
