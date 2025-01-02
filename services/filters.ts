export async function getFilters() {
  const res = await fetch('http://localhost:3000/api/filters', {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch filters')
  }
  return res.json()
}

export async function getProperties() {
  const res = await fetch('http://localhost:3000/api/properties', {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch properties')
  }
  return res.json()
}
