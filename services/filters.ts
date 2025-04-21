export async function getProperties(filters?: {
  tipoVenta?: string
  tipoPropiedad?: string
  comuna?: string
  page?: number
  limit?: number
}) {
  const query = new URLSearchParams({
    ...filters,
    page: filters?.page?.toString() || '1',
    limit: filters?.limit?.toString() || '9',
  }).toString()

  const res = await fetch(
    `${process.env.AUTH0_BASE_URL}/api/properties?${query}`,
    {
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch properties')
  }

  return res.json()
}

export async function getFilters() {
  try {
    const res = await fetch(`${process.env.AUTH0_BASE_URL}/api/filters`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch filters')
    }

    return res.json()
  } catch (error) {
    console.error('Error al obtener filtros:', error)

    return {
      tiposVenta: [],
      tipoPropiedad: [],
      tipoComuna: [],
    }
  }
}
