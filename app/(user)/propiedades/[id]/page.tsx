'use client'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { ButtonComponent } from '@/components/ButtonComponent'
import { CardComponent } from '@/components/CardComponent'
import { ContactMe } from '@/components/ContactMe'
import { ModalComponent } from '@/components/ModalComponent'
import { Badthub } from '@/icons/Badthub'
import { Bed } from '@/icons/Bed'
import { Money } from '@/icons/Money'
import { Mt2 } from '@/icons/Mt2'
import { Parking } from '@/icons/Parking'
import { Chip, image, useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

interface PropiedadProps {
  params: {
    id: string
  }
}

const Propiedad = ({ params }: PropiedadProps) => {
  const [property, setProperty] = useState<any>(null)
  const [thumbnailPosition, setThumbnailPosition] = useState<'left' | 'bottom'>(
    'bottom'
  )
  const { onOpen, isOpen, onOpenChange } = useDisclosure()
  const { id } = params
  console.log('id', id)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/property/${id}`)
        const data = await response.json()
        setProperty(data)
      } catch (error) {
        console.error('Error fetching property:', error)
      }
    }

    fetchProperty()
  }, [id])

  useEffect(() => {
    const updateThumbnailPosition = () => {
      const width = window.innerWidth
      if (width >= 768) {
        setThumbnailPosition('left')
      } else {
        setThumbnailPosition('bottom')
      }
    }
    updateThumbnailPosition()
    window.addEventListener('resize', updateThumbnailPosition)
    return () => window.removeEventListener('resize', updateThumbnailPosition)
  }, [])

  if (!property) {
    return <div>Loading...</div>
  }

  const images = property?.images?.map((image: { url: string }) => ({
    original: image.url,
    thumbnail: image.url,
  }))

  console.log('property', property)

  return (
    <div className="px-10 pt-8">
      <h1 className="text-3xl font-semibold text-center">
        {property.nombre} - {property.communes.nombre}
      </h1>
      <hr className="border-t-2 border-roseGold mb-8 mt-2 " />

      <div className="lg:flex lg:justify-center">
        <div>
          <CardComponent key={property.id} {...property} />
        </div>
        <div className="mt-2 sm:px-1">
          <div className="md:hidden">
            <ButtonComponent
              label="Contacto"
              onPress={onOpen}
              smallButton
              showButton
            />
          </div>
          {isOpen && (
            <ModalComponent
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              bgColor="bg-roseGold"
            >
              <ContactMe elevated />
            </ModalComponent>
          )}
        </div>
        <div className="sm:px-24 md:px-5">
          <h2 className="text-2xl font-semibold my-4 text-center">
            Descripción
          </h2>
          <div className="bg-gray-200 bg-opacity-50 rounded-lg py-6 px-4 mb-4 shadow-lg sm:w-[500] md:w-[600] lg:w-[700]">
            <div className="flex justify-between items-center flex-col gap-3">
              <div className="w-full flex justify-around">
                <div>
                  <div className="flex items-center gap-1">
                    <Money />
                    <p className="uppercase font-bold">
                      uf {property.valor_uf}
                    </p>
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
                      <Bed /> : 3
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
          <p className="text-justify">{property.descripcion}</p>
        </div>
      </div>
      <div className="sm:flex sm:flex-col gap-6 mt-4">
        <h2 className="text-2xl font-semibold my-6 text-center">Imagenes</h2>

        <div className="flex justify-center">
          {images && images.length > 0 ? (
            <div className="flex justify-center sm:w-full md:w-5/6 lg:w-2/3">
              <ImageGallery
                items={images}
                thumbnailPosition={thumbnailPosition}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-96">
              <p>No hay imagenes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Propiedad
