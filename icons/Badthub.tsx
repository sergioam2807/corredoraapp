import Image from 'next/image'
import React from 'react'

import badthub from '@/public/bathtub.png'

export const Badthub = () => {
  return <Image alt="bed" height={30} src={badthub} width={30} />
}
