import Image from 'next/image'
import bed from '@/public/bed.png'

export const Bed = () => {
  return <Image src={bed} alt="bed" height={44} width={44} />
}
