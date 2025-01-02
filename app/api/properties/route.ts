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

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received data:', data) // Log the received data for debugging

    const newProperty = await prisma.properties.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        mt2: parseInt(data.mt2, 10), // Convert to integer
        valor_uf: data.valor ? parseFloat(data.valor) : 0, // Convert to float if provided
        habitaciones: parseInt(data.habitaciones, 10), // Convert to integer
        banos: parseInt(data.banos, 10), // Convert to integer
        estacionamientos: parseInt(data.estacionamientos, 10), // Convert to integer
        bodegas: parseInt(data.bodegas, 10), // Convert to integer
        direccion: data.direccion,
        comuna_id: data.comuna ? parseInt(data.comuna, 10) : 1, // Convert to integer if provided
        estado_id: data.tipoVenta ? parseInt(data.tipoVenta, 10) : 1, // Convert to integer if provided
        tipo_propiedad_id: data.tipoPropiedad
          ? parseInt(data.tipoPropiedad, 10)
          : undefined, // Convert to integer if provided
        disponibilidad_id: data.disponibilidad_id
          ? parseInt(data.disponibilidad_id, 10)
          : 1, // Convert to integer if provided
        fecha_publicacion: new Date().toISOString(), // Convert to Date if provided
        video_url: data.video_url,
      },
    })
    return NextResponse.json(newProperty, { status: 201 })
  } catch (error) {
    console.error('Error details:', error) // Log the error details for debugging
    return NextResponse.json(
      { error: 'Error al crear la propiedad', details: error.message },
      { status: 500 }
    )
  }
}
