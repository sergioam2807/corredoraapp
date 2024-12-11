'use client'
// import { SendEmail } from '@/components/sendEmail'
import { ButtonComponent } from '@/components/ButtonComponent'
import { CardComponent } from '@/components/CardComponent'
import { ContactMe } from '@/components/ContactMe'
import { Filterbar } from '@/components/Filterbar'
import { ModalComponent } from '@/components/ModalComponent'
import { Wave } from '@/components/Wave'
import house from '@/public/hero-house.jpg'
import { useDisclosure } from '@nextui-org/react'
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

export default function Admin() {
  return <div>Text Here</div>
}
