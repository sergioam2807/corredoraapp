'use client'
// import { useRouter } from 'next/router'
import { ButtonComponent } from '@/components/ButtonComponent'
import { CardComponent } from '@/components/CardComponent'
import { ContactMe } from '@/components/ContactMe'
import { ModalComponent } from '@/components/ModalComponent'
import { useDisclosure } from '@nextui-org/react'

interface PropiedadProps {
  params: {
    id: string
  }
}

const Propiedad = ({ params }: PropiedadProps) => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure()

  const { id } = params

  //   // Aquí puedes obtener datos específicos de la propiedad usando el ID
  //   const data = await fetch(`https://api.example.com/propiedades/${id}`).then(
  //     (res) => res.json()
  //   )

  return (
    <div>
      <h1 className="text-3xl font-semibold my-10">Nombre Propiedad: {id}</h1>
      {/* Renderiza los detalles de la propiedad aquí */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="md:flex">
        <div>
          <CardComponent id={id} />
        </div>
        <div className="w-full mt-2">
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
        <div>
          <h2 className="text-2xl font-semibold my-4">Descripción</h2>
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
          <h2 className="text-2xl font-semibold my-4">Imagenes</h2>
          <p className="text-justify">Galeria de imagenes con carusel</p>
        </div>
      </div>
    </div>
  )
}

export default Propiedad
