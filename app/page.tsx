// import { SendEmail } from '@/components/sendEmail'
import house from '@/public/hero-house.jpg'
import { Button } from '@nextui-org/button'
import Image from 'next/image'

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
        <div className="relative z-10 flex flex-col justify-around items-start w-full text-left md:flex md:hidden px-5 py-10">
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
            <div>
              <Button className="bg-roseGold text-white">Contacto</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#e0bfb8"
            fillOpacity="1"
            d="M0,160L40,144C80,128,160,96,240,112C320,128,400,192,480,186.7C560,181,640,107,720,74.7C800,43,880,53,960,90.7C1040,128,1120,192,1200,192C1280,192,1360,128,1400,96L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* <SendEmail /> */}
      </section>
    </div>
  )
}
