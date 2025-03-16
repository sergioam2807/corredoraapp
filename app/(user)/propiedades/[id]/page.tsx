'use client'
import ImageGallery from 'react-image-gallery'

import 'react-image-gallery/styles/css/image-gallery.css'
import { useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { ButtonComponent } from '@/components/ButtonComponent'
import { CardComponent } from '@/components/CardComponent'
import { ContactMe } from '@/components/ContactMe'
import { ModalComponent } from '@/components/ModalComponent'
import { CardPropData } from '@/components/CardPropData'
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
              showButton
              smallButton
              label="Contacto"
              onPress={onOpen}
            />
          </div>
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
        <div className="sm:px-24 md:px-5">
          <h2 className="text-2xl font-semibold my-4 text-center">
            Descripción
          </h2>
          <div className="flex justify-center">
            <CardPropData property={property} />
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
