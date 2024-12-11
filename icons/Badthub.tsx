import Image from 'next/image'
import React from 'react'
import badthub from '@/public/bathtub.png'

export const Badthub = () => {
  return <Image src={badthub} alt="bed" height={44} width={44} />
}
