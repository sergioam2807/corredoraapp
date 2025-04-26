import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const tiposVenta = await prisma.states.findMany({
      select: {
        id: true,
        nombre: true,
      },
    })

    const tipoPropiedad = await prisma.property_types.findMany({
      select: {
        id: true,
        nombre: true,
      },
    })

    const tipoRegion = await prisma.regions.findMany({
      select: {
        id: true,
        nombre: true,
      },
    })

    const estadoVenta = await prisma.availability_status.findMany({
      select: {
        id: true,
        nombre: true,
      },
    })

    return NextResponse.json(
      {
        tiposVenta,
        tipoPropiedad,
        tipoRegion,
        estadoVenta,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Error al obtener los filtros' },
      { status: 500 }
    )
  }
}
