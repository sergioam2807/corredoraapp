import Image from 'next/image'

import parking from '@/public/sedan.png'

export const Parking = () => {
  return <Image alt="bed" height={44} src={parking} width={44} />
}
