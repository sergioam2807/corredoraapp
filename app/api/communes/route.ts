import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const regionId = searchParams.get('regionId')

  if (!regionId || isNaN(Number(regionId))) {
    return NextResponse.json({ error: 'Invalid region ID' }, { status: 400 })
  }

  try {
    const communes = await prisma.communes.findMany({
      where: { region_id: parseInt(regionId) },
      select: { id: true, nombre: true },
    })

    return NextResponse.json(communes, { status: 200 })
  } catch (error) {
    console.error('Error fetching communes:', error)

    return NextResponse.json(
      { error: 'Error fetching communes' },
      { status: 500 }
    )
  }
}
