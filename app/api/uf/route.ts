import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://mindicador.cl/api/uf')
    const data = await response.json()
    const ufValue = data.serie[0].valor

    return NextResponse.json({ ufValue }, { status: 200 })
  } catch (error) {
    console.error('Error fetching UF value:', error)
    return NextResponse.json(
      { error: 'Error fetching UF value' },
      { status: 500 }
    )
  }
}
