import { Card, CardBody } from '@nextui-org/react'
import React from 'react'

export const WidgetCard = () => {
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]
  const date = new Date()
  const day = date.getDate()
  const month = monthNames[date.getMonth()]

  return (
    <Card className="max-w-[400px] px-2 py-4">
      <CardBody>
        <h1 className="text-2xl font-bold">
          Valor UF, {day} de {month}
        </h1>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
  )
}
