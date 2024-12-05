import Image from 'next/image'
import parking from '@/public/sedan.png'

export const Parking = () => {
  return <Image src={parking} alt="bed" height={44} width={44} />
}
