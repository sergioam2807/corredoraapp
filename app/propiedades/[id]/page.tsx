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
import { useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

interface PropiedadProps {
  params: {
    id: string
  }
}

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
]

const Propiedad = ({ params }: PropiedadProps) => {
  const [thumbnailPosition, setThumbnailPosition] = useState<'left' | 'bottom'>(
    'bottom'
  )
  const { onOpen, isOpen, onOpenChange } = useDisclosure()

  const { id } = params

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

  //   // Aquí puedes obtener datos específicos de la propiedad usando el ID
  //   const data = await fetch(`https://api.example.com/propiedades/${id}`).then(
  //     (res) => res.json()
  //   )

  return (
    <div className="px-10">
      <h1 className="text-3xl font-semibold ">
        Cumbres del Bosque - Viña del Mar
      </h1>
      <hr className="border-t-2 border-roseGold mb-8 mt-2" />
      {/* Renderiza los detalles de la propiedad aquí */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="md:flex">
        <div>
          <CardComponent id={id} />
        </div>
        <div className="w-full mt-2 sm:px-1">
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
        <div className="sm:px-24 md:px-0">
          <h2 className="text-2xl font-semibold my-4">Descripción</h2>
          <div className="bg-gray-200 bg-opacity-50 rounded-lg py-6 px-4 mb-4 shadow-lg">
            <div className="flex justify-between items-center flex-col w-full gap-3">
              <div className="flex justify-around w-full">
                <div>
                  <div className="flex items-center gap-1">
                    <Money />
                    <p className="uppercase font-bold">uf 12500</p>
                  </div>
                  <div className="text-sm font-bold">Valor</div>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <Mt2 />
                    <p className="uppercase font-bold">63 mt</p>
                  </div>
                  <div className="text-sm font-bold">Metros</div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <div className="flex justify-around items-center  w-full">
                  {/* <Chip color="default">Venta</Chip> */}
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center gap-1 font-bold">
                      <Bed /> : 3
                    </div>
                    <div className="text-sm font-bold">Habitaciones</div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center gap-1 font-bold">
                      <Badthub /> : 2
                    </div>
                    <div className="text-sm font-bold">Baños</div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center gap-1 font-bold">
                      <Parking /> : 1
                    </div>
                    <div className="text-sm font-bold">Estacionmiento</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisl nec tempus ultrices, elit eros tincidunt justo, vel
            condimentum ligula elit vel nulla. Sed nec orci vel nisl tincidunt
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisl nec tempus ultrices, elit eros tincidunt justo, vel
            condimentum ligula elit vel nulla. Sed nec orci vel nisl tincidunt
          </p>
        </div>
      </div>
      <div className="sm:flex sm:flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold my-6">Imagenes</h2>
          <ImageGallery items={images} thumbnailPosition={thumbnailPosition} />
        </div>
      </div>
    </div>
  )
}

export default Propiedad
