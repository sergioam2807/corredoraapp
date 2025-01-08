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
    <Card className="min-w-[400px] px-4 py-1">
      <CardBody className="gap-2">
        <div className="w-full flex justify-center ">
          <p className="text-xl font-bold">Ganancias</p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <p className="text-sm font-bold">
            {day} de {month} del {date.getFullYear()}
          </p>
          <p className="text-sm font-bold text-success-600">
            {ufValue ? `Valor UF $${ufValue}` : 'Cargando...'}
          </p>
        </div>
        <div className="flex ">
          <div className="flex flex-col gap-1 w-full justify-start items-start mt-2 w-1/2">
            <div className="flex justify-between items-center gap-4 w-full">
              <p className="text-sm font-bold">Venta</p>
              <p className="text-sm font-bold text-success-600">{`$ 450.000`}</p>
            </div>
            <div className="flex justify-between items-center gap-4 w-full">
              <p className="text-sm font-bold">Arriendo</p>
              <p className="text-sm font-bold text-success-600">{`$ 860.000`}</p>
            </div>
            <div className="flex justify-between items-center gap-4 w-full">
              <p className="text-sm font-bold">Arriendo T</p>
              <p className="text-sm font-bold text-success-600">{`$ 360.000`}</p>
            </div>
          </div>
          <div className="flex flex-col text-center w-1/2 gap-2 mt-2">
            {' '}
            <p className="text-sm font-bold ">Total</p>
            <p className="text-lg font-bold text-rose-700">$167.000</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
