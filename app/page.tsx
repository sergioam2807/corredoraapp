// import { SendEmail } from '@/components/sendEmail'
import { ButtonComponent } from '@/components/ButtonComponent'
import { CardComponent } from '@/components/CardComponent'
import { Filterbar } from '@/components/Filterbar'
import { Wave } from '@/components/Wave'
import house from '@/public/hero-house.jpg'
import { Button } from '@nextui-org/button'
import Image from 'next/image'

const tiposVenta = [
  { key: 'venta', label: 'Venta' },
  { key: 'arriendo', label: 'Arriendo' },
]

const tipoPropiedad = [
  { key: 'casa', label: 'Casa' },
  { key: 'depto', label: 'Departamento' },
]

const tipoComuna = [
  { key: 'viña', label: 'Viña del mar' },
  { key: 'concon  ', label: 'Con Con' },
  { key: 'quillota  ', label: 'Quillota' },
  { key: 'limache  ', label: 'Limache' },
]

export default function Home() {
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
              <ButtonComponent />
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <Image
              src={house}
              width={600}
              height={800}
              className="rounded-xl"
              alt="house"
              priority
            />
          </div>
        </div>

        {/* //Small screens */}

        {/* Imagen para pantallas pequeñas */}
        <div className="absolute inset-0 flex justify-center items-center md:opacity-50 md:z-0 md:hidden ">
          <Image
            src={house}
            // width={800}
            // height={1000}

            fill
            className="rounded-xl opacity-30 md:fixed md:w-auto md:h-auto"
            alt="house"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Texto para pantallas pequeñas */}
        <div className="xl:hidden relative z-10 flex flex-col justify-around items-start w-full text-left  px-5 py-10 md:hidden">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-3xl font-extrabold">Encuentra el hogar</p>
              <p
                className="text-3xl font-extrabold"
                // style={{ fontFamily: 'var(--font-tangerine)' }}
              >
                que siempre soñaste
              </p>
            </div>
            <div>
              <p className="text-md">Vende o arrienda con la mejor asesoría</p>
              <p className="text-md">
                ¡Déjame ayudarte a hacer tu sueño realidad!
              </p>
            </div>
            <div className="">
              <ButtonComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="inset-0 flex justify-center items-center md:-z-10 -mt-11 -mb-3 flex-col md:flex md:mt-1 md:-mb-9">
        <div className="bg-gray-400/70 flex justify-center w-3/4 items-center flex-col md:flex-row px-4 py-2 rounded-lg gap-2">
          <Filterbar filters={tiposVenta} />
          <Filterbar
            label="Tipo de propiedad"
            placeholder="Selecciona tipo de propiedad"
            filters={tipoPropiedad}
          />
          <Filterbar
            label="Comuna"
            placeholder="Selecciona Comuna"
            filters={tipoComuna}
          />
        </div>
      </div>
      <div className="z-0">
        <Wave />
      </div>
      <section className="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 md:py-4 bg-roseGold md:-mt-14 -mt-1 justify-items-center items-center">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </section>
    </div>
  )
}
