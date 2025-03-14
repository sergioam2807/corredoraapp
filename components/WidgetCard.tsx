import { Card, CardBody } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export const WidgetCard = () => {
  const [ufValue, setUfValue] = useState(null)
  const [metrics, setMetrics] = useState({
    totalProfit: 0,
    ventaProfit: 0,
    arriendoProfit: 0,
    arriendoTemporalProfit: 0,
  })
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

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/ernings')
        const data = await response.json()
        const formattedUfValue = data.ufValue.toLocaleString('es-CL', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })

        console.log('data', data)

        setUfValue(formattedUfValue)
        setMetrics({
          totalProfit: data.totalProfit,
          ventaProfit: data.ventaProfit,
          arriendoProfit: data.arriendoProfit,
          arriendoTemporalProfit: data.arriendoTemporalProfit,
        })
      } catch (error) {
        console.error('Error fetching metrics:', error)
      }
    }

    fetchMetrics()
  }, [])

  console.log('metrics', metrics)

  return (
    <Card className="sm:min-w-[400px] px-4 py-1">
      <CardBody className="gap-2">
        <div className="w-full flex justify-center">
          <p className="text-xl font-bold">Ganancias</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex flex-col W-1/2 gap-3">
            <div className="flex justify-center sm:justify-between items-center gap-4">
              <p className="text-sm font-bold">
                {day} de {month} del {date.getFullYear()}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-center sm:justify-between items-center gap-4 w-full">
                <p className="text-sm font-bold">Venta</p>
                <p className="text-sm font-bold text-success-600">
                  {`$ ${metrics.ventaProfit.toLocaleString('es-CL', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}`}
                </p>
              </div>
              <div className="flex justify-center sm:justify-between items-center gap-4 w-full">
                <p className="text-sm font-bold">Arriendo</p>
                <p className="text-sm font-bold text-success-600">
                  {`$ ${metrics.arriendoProfit.toLocaleString('es-CL', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}`}
                </p>
              </div>
              <div className="flex justify-center sm:justify-between items-center gap-4 w-full">
                <p className="text-sm font-bold">Arriendo T</p>
                <p className="text-sm font-bold text-success-600">
                  {`$ ${metrics.arriendoTemporalProfit.toLocaleString('es-CL', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center W-1/2 gap-3 mt-3 sm:mt-0">
            <p className="text-sm font-bold text-success-600">
              {ufValue ? `Valor UF $${ufValue}` : 'Cargando...'}
            </p>
            <div className="flex flex-col items-center w-1/2 gap-2">
              <p className="text-sm font-bold">Total</p>
              <p className="text-lg font-bold text-rose-700">
                {`$${metrics.totalProfit.toLocaleString('es-CL', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
