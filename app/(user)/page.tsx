'use client'

import { useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ButtonComponent } from '@/components/ButtonComponent'
import { CardComponent } from '@/components/CardComponent'
import { ContactMe } from '@/components/ContactMe'
import { ModalComponent } from '@/components/ModalComponent'
import { Wave } from '@/components/Wave'
import house from '@/public/hero-house.jpg'

export default function Home() {
  const { onOpen, isOpen, onOpenChange } = useDisclosure()
  const [properties, setProperties] = useState([])

  const fetchProperties = async () => {
    try {
      const response = await fetch(`/api/properties`)
      const data = await response.json()

      setProperties(data)
    } catch (error) {
      console.log('Error fetching properties', error)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return (
    <div>
      <div className="relative container mx-auto max-w-7xl px-6">
        {/* Texto e imagen para pantallas grandes */}
        <div className="hidden md:flex justify-between items-center w-full text-left">
          <div className="flex flex-col gap-6 w-full">
            <div>
              <p className="text-6xl font-semibold ">Encuentra el hogar</p>
              <p className="text-6xl font-semibold mt-2">que siempre soñaste</p>
            </div>
            <div>
              <p className="text-xl">Vende o arrienda con la mejor asesoría</p>
              <p className="text-xl">
                ¡Déjame ayudarte a hacer tu sueño realidad!
              </p>
            </div>
            <div>
              <ButtonComponent label="Contacto" onPress={onOpen} />

              {isOpen && (
                <ModalComponent
                  bgColor="bg-roseGold"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                >
                  <ContactMe elevated />
                </ModalComponent>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <Image
              priority
              alt="house"
              className="rounded-xl"
              height={800}
              src={house}
              width={600}
            />
          </div>
        </div>

        {/* //Small screens */}

        {/* Imagen para pantallas pequeñas */}
        <div className="absolute inset-0 flex justify-center items-center md:opacity-50 md:z-0 md:hidden ">
          <Image
            fill
            priority
            alt="house"
            className="rounded-xl opacity-30 md:fixed md:w-auto md:h-auto"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
            src={house}
          />
        </div>

        {/* Texto para pantallas pequeñas */}
        <div className="xl:hidden relative z-10 flex flex-col justify-around items-start w-full text-left  px-5 py-10 md:hidden">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-3xl font-extrabold">Encuentra el hogar</p>
              <p className="text-3xl font-extrabold">que siempre soñaste</p>
            </div>
            <div>
              <p className="text-md">Vende o arrienda con la mejor asesoría</p>
              <p className="text-md">
                ¡Déjame ayudarte a hacer tu sueño realidad!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="z-0">
        <div className="z-0 ">
          <Wave />
        </div>
      </div>
      <div className="bg-roseGold md:-mt-14 md:mb-6 ">
        <div className="inset-0 flex justify-center items-center md:-z-10 -mt-11 -mb-3 flex-col md:flex md:-mt-24 z-10 ">
          <h2 className="text-3xl font-extrabold mb-3">
            Propiedades Destacadas
          </h2>
        </div>
      </div>
      <section className="grid w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 md:py-4 bg-roseGold justify-items-center">
        {properties.slice(-3).map((property: any) => (
          <CardComponent key={property.id} {...property} />
        ))}
      </section>
    </div>
  )
}
