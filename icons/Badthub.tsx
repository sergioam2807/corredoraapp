import Image from 'next/image'
import React from 'react'
import badthub from '@/public/bathtub.png'

export const Badthub = () => {
  return <Image src={badthub} alt="bed" height={28} width={28} />
}
