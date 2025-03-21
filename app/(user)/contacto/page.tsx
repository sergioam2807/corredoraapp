import { ContactMe } from '@/components/ContactMe'
import { MapComponent } from '@/components/MapComponent'
import { title } from '@/components/primitives'
import { SmallCard } from '@/components/SmallCard'

export default function ConocemePage() {
  return (
    <div className="flex flex-col gap-4 px-8">
      <div className="w-full">
        <h1 className={`${title()} text-center py-4`}>Conversemos</h1>
      </div>
      <div className="mb-4">
        <p className="text-center text-gray-600">
          ¿Interesado en encontrar tu próximo hogar, arrendar o comprar? Estoy
          aquí para ayudarte a resolver tus dudas y guiarte en cada paso del
          proceso. ¡Hablemos!
        </p>
      </div>
      <div className="flex flex-1 justify-center items-start flex-col lg:flex-row w-full gap-8">
        <div className="order-2 lg:order-1 lg:mr-4 mb-4 lg:mb-0">
          <div>
            <SmallCard />
          </div>
        </div>
        <div className="order-1 lg:order-2 w-full ">
          <ContactMe />
        </div>
      </div>

      <div className="hidden lg:block">
        <MapComponent />
      </div>
    </div>
  )
}
