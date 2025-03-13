import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const tipoVenta = searchParams.get('tipoVenta')
  const tipoPropiedad = searchParams.get('tipoPropiedad')
  const comuna = searchParams.get('comuna')

  try {
    if (id) {
      const property = await prisma.properties.findUnique({
        where: { id: Number(id) },
        include: {
          communes: { include: { regions: true } },
          states: true,
          images: true,
          property_types: true,
        },
      })

      if (!property) {
        return NextResponse.json(
          { error: 'Propiedad no encontrada' },
          { status: 404 }
        )
      }

      return NextResponse.json(property, { status: 200 })
    }

    const filters: any = {}

    if (tipoVenta && tipoVenta !== 'undefined') {
      filters.sale_type_id = Number(tipoVenta)
    }
    if (tipoPropiedad && tipoPropiedad !== 'undefined') {
      filters.property_type_id = Number(tipoPropiedad)
    }
    if (comuna && comuna !== 'undefined') {
      filters.comuna_id = Number(comuna)
    }

    const properties = await prisma.properties.findMany({
      where: Object.keys(filters).length > 0 ? filters : undefined,
      include: {
        communes: { include: { regions: true } },
        states: true,
        images: true,
        property_types: true,
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

    const newProperty = await prisma.properties.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        mt2: parseInt(data.mt2, 10),
        valor_uf: data.valor ? parseFloat(data.valor) : 0,
        habitaciones: parseInt(data.habitaciones, 10),
        banos: parseInt(data.banos, 10),
        estacionamientos: parseInt(data.estacionamientos, 10),
        bodegas: parseInt(data.bodegas, 10),
        direccion: data.direccion,
        comuna_id: data.comuna ? parseInt(data.comuna, 10) : 1,
        estado_id: data.tipoVenta ? parseInt(data.tipoVenta, 10) : 1,
        tipo_propiedad_id: data.tipoPropiedad
          ? parseInt(data.tipoPropiedad, 10)
          : undefined,
        profit_percentage: data.profitPercentage
          ? parseFloat(data.profitPercentage)
          : 0,
        disponibilidad_id: data.estadoVenta
          ? parseInt(data.estadoVenta, 10)
          : 3,
        fecha_publicacion: new Date().toISOString(),
        video_url: data.video_url,
        images: {
          create: data.imagenesPreview.map((url: string) => ({ url })),
        },
      },
    })

    return NextResponse.json(newProperty, { status: 201 })
  } catch (error) {
    console.error('Error details:', error)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Error al crear la propiedad', details: error.message },
        { status: 500 }
      )
    } else {
      return NextResponse.json(
        { error: 'Error al crear la propiedad', details: 'Unknown error' },
        { status: 500 }
      )
    }
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id } = data

    const updatedProperty = await prisma.properties.update({
      where: { id: Number(id) },
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
        profit_percentage: data.profitPercentage
          ? parseFloat(data.profitPercentage)
          : undefined, // Convert to float if provided
        tipo_propiedad_id: data.tipoPropiedad
          ? parseInt(data.tipoPropiedad, 10)
          : undefined, // Convert to integer if provided
        disponibilidad_id: data.estadoVenta
          ? parseInt(data.estadoVenta, 10)
          : 3, // Convert to integer if provided
        fecha_publicacion: new Date().toISOString(), // Convert to Date if provided
        video_url: data.video_url,
        images: {
          deleteMany: {}, // Delete existing images
          create: data.imagenesPreview.map((url: string) => ({ url })), // Add new images
        },
      },
    })

    return NextResponse.json(updatedProperty, { status: 200 })
  } catch (error) {
    console.error('Error details:', error) // Log the error details for debugging
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Error al actualizar la propiedad', details: error.message },
        { status: 500 }
      )
    } else {
      return NextResponse.json(
        { error: 'Error al actualizar la propiedad', details: 'Unknown error' },
        { status: 500 }
      )
    }
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json()
    const { id } = data

    // Verifica si el registro existe
    const property = await prisma.properties.findUnique({
      where: { id: Number(id) },
    })

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    await prisma.images.deleteMany({
      where: { propiedad_id: Number(id) },
    })

    const deletedProperty = await prisma.properties.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json(deletedProperty, { status: 200 })
  } catch (error) {
    console.error('Error details:', error) // Log the error details for debugging
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Error al eliminar la propiedad', details: error.message },
        { status: 500 }
      )
    } else {
      return NextResponse.json(
        { error: 'Error al eliminar la propiedad', details: 'Unknown error' },
        { status: 500 }
      )
    }
  }
}
