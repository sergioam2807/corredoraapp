import { Card, CardBody } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export const WidgetCard = () => {
  const [ufValue, setUfValue] = useState(null)
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
  const formattedDate = `${day}-${date.getMonth() + 1}-${date.getFullYear()}`

  useEffect(() => {
    const fetchUfValue = async () => {
      try {
        const response = await fetch(
          `https://mindicador.cl/api/uf/${formattedDate}`
        )
        const data = await response.json()
        const formattedUfValue = data.serie[0].valor.toLocaleString('es-CL', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        setUfValue(formattedUfValue)
      } catch (error) {
        console.error('Error fetching UF value:', error)
      }
    }

    fetchUfValue()
  }, [])

  return (
    <Card className="max-w-[400px] px-2 py-4">
      <CardBody className="gap-4">
        <h1 className="text-2xl font-bold">
          {day} de {month} del {date.getFullYear()}
        </h1>
        <div className="flex justify-center items-center gap-2">
          <p className="text-xl font-bold">
            {ufValue ? ` Valor UF $${ufValue}` : 'Cargando...'}
          </p>
        </div>
        {/* <p>Make beautiful websites regardless of your design experience.</p> */}
      </CardBody>
    </Card>
  )
}
