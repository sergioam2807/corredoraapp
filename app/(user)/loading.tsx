'use client'

import { Progress } from '@nextui-org/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import logo from '@/public/sercop.png'

export default function Loading() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10))
    }, 700)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-96 gap-4 flex justify-center items-center flex-col px-6">
      <div>
        <Image priority alt="Loading..." height={150} src={logo} width={450} />
      </div>
      <div>
        <Progress
          aria-label="Downloading..."
          className="max-w-md"
          color="secondary"
          showValueLabel={true}
          size="md"
          value={value}
        />

        <p className="text-2xl font-semibold mt-2">
          Estamos cargando la informacion...
        </p>
      </div>
    </div>
  )
}
