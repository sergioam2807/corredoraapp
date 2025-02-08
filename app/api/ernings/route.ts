import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

import PropertyTypes from '@/enum/properties'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Obtener el valor de la UF
    const response = await fetch('https://mindicador.cl/api/uf')
    const data = await response.json()
    const ufValue = data.serie[0].valor

    // Consultas a la base de datos
    const totalProperties = await prisma.properties.count()

    const ventaProperties = await prisma.properties.findMany({
      where: {
        estado_id: PropertyTypes.Venta,
        disponibilidad_id: { in: [1, 2] },
      },
      select: { profit_percentage: true, valor_uf: true },
    })

    const arriendoProperties = await prisma.properties.findMany({
      where: {
        estado_id: PropertyTypes.Arriendo,
        disponibilidad_id: { in: [1, 2] },
      },
      select: { profit_percentage: true, valor_uf: true },
    })

    const arriendoTemporalProperties = await prisma.properties.findMany({
      where: {
        estado_id: PropertyTypes.ArriendoTemporal,
        disponibilidad_id: { in: [1, 2] }, // Filtrar por estado_id 1 (vendida) o 2 (arrendada)
      },
      select: { profit_percentage: true, valor_uf: true },
    })

    // Calcular las ganancias
    const calculateTotalProfit = (properties) => {
      return properties.reduce((total, property) => {
        const profit =
          (property.profit_percentage / 100) * property.valor_uf * ufValue

        return total + profit
      }, 0)
    }

    const totalProfit = Math.floor(
      calculateTotalProfit([
        ...ventaProperties,
        ...arriendoProperties,
        ...arriendoTemporalProperties,
      ])
    )

    const ventaProfit = Math.floor(calculateTotalProfit(ventaProperties))
    const arriendoProfit = Math.floor(calculateTotalProfit(arriendoProperties))
    const arriendoTemporalProfit = Math.floor(
      calculateTotalProfit(arriendoTemporalProperties)
    )

    return NextResponse.json({
      totalProperties,
      totalProfit,
      ventaProperties: ventaProperties.length,
      ventaProfit,
      arriendoProperties: arriendoProperties.length,
      arriendoProfit,
      arriendoTemporalProperties: arriendoTemporalProperties.length,
      arriendoTemporalProfit,
      ufValue,
    })
  } catch (error) {
    console.error('Error details:', error) // Log the error details for debugging
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Error al obtener las métricas', details: error.message },
        { status: 500 }
      )
    } else {
      return NextResponse.json(
        { error: 'Error al obtener las métricas', details: 'Unknown error' },
        { status: 500 }
      )
    }
  }
}
