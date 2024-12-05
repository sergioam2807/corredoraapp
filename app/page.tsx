// import { SendEmail } from '@/components/sendEmail'
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
              <Button className="bg-roseGold text-white">Contacto</Button>
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <Image
              src={house}
              width={600}
              height={800}
              className="rounded-xl"
              alt="house"
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
          />
        </div>

        {/* Texto para pantallas pequeñas */}
        <div className="xl:hidden relative z-10 flex flex-col justify-around items-start w-full text-left md:flex px-5 py-10">
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
              <Button className="bg-roseGold text-white hidden">
                Contacto
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:hidden absolute inset-0 flex justify-center items-center z-20 mt-11 flex-col">
        <div className="bg-gray-400/70 flex justify-center w-3/4 items-center flex-col px-4 py-2 rounded-lg gap-2">
          <Filterbar filters={tiposVenta} />
          <Filterbar filters={tiposVenta} />
          <Filterbar filters={tiposVenta} />
        </div>
      </div>
      <div className="mt-20">
        <Wave />
      </div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 bg-roseGold -mt-1 gap-2">
        <CardComponent />
        <CardComponent />
      </section>
    </div>
  )
}
