import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  try {
    const property = await prisma.properties.findUnique({
      where: { id: parseInt(id) },
      include: {
        communes: { include: { regions: true } },
        states: true,
        images: true,
      },
    })

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    return NextResponse.json(property, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error al obtener la propiedad' },
      { status: 500 }
    )
  }
}
