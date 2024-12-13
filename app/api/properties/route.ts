import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const properties = await prisma.properties.findMany({
      include: {
        communes: { include: { regions: true } },
        states: true,
        images: true,
      },
    })
    return NextResponse.json(properties, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error al obtener las propiedades' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}
