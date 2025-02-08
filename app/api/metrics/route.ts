import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

import PropertyTypes from '@/enum/properties'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const totalProperties = await prisma.properties.count()

    const ventaProperties = await prisma.properties.count({
      where: { estado_id: PropertyTypes.Venta },
    })

    const arriendoProperties = await prisma.properties.count({
      where: { estado_id: PropertyTypes.Arriendo },
    })

    const arriendoTemporalProperties = await prisma.properties.count({
      where: { estado_id: PropertyTypes.ArriendoTemporal },
    })

    return NextResponse.json({
      totalProperties,
      ventaProperties,
      arriendoProperties,
      arriendoTemporalProperties,
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
