'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

import '@/styles/custom.css'
import { Skeleton } from '@heroui/skeleton'

import { EditIcon } from '@/icons/EditIcons'

interface Property {
  id: number
  nombre: string
  valor_uf: string
  communes: {
    nombre: string
  }
  direccion: string
  property_types: {
    nombre: string
  }
  states: {
    nombre: string
  }
  fecha_publicacion: string
}

interface Column {
  name: string
  uid: string
}

const columns: Column[] = [
  { name: 'Nombre', uid: 'nombre' },
  { name: 'Valor', uid: 'valor_uf' },
  { name: 'Comuna', uid: 'communes.nombre' },
  { name: 'Dirección', uid: 'direccion' },
  { name: 'Tipo de propiedad', uid: 'property_types' },
  { name: 'Tipo de venta', uid: 'states.nombre' },
  { name: 'Fecha Publicación', uid: 'fecha_publicacion' },
  { name: 'Administrar', uid: 'administrar' },
]

export default function MisPublicaciones() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties')
        const data = await response.json()

        setProperties(data)
      } catch (error) {
        console.log('Error fetching properties', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const handleAdminClick = (id: number) => {
    router.push(`/admin?id=${id}`)
  }

  const getStatusColor = (
    status: string
  ):
    | 'success'
    | 'warning'
    | 'danger'
    | 'default'
    | 'primary'
    | 'secondary'
    | undefined => {
    switch (status) {
      case 'Venta':
        return 'success'
      case 'Arriendo':
        return 'warning'
      case 'Arriendo Temporal':
        return 'danger'
      default:
        return 'primary'
    }
  }

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((o, i) => (o ? o[i] : null), obj)
  }

  const renderCell = React.useCallback(
    (property: Property, columnKey: string) => {
      const cellValue = getNestedValue(property, columnKey)

      switch (columnKey) {
        case 'nombre':
          return <div className="font-semibold">{property.nombre}</div>
        case 'valor_uf':
          return <div>{property.valor_uf}</div>
        case 'communes.nombre':
          return <div className="font-semibold">{property.communes.nombre}</div>
        case 'direccion':
          return <div>{property.direccion}</div>
        case 'property_types':
          return (
            <div className="font-semibold">
              {property.property_types.nombre}
            </div>
          )
        case 'states.nombre':
          return (
            <Chip
              className="capitalize px-4 py-2 text-white font-semibold"
              color={getStatusColor(property.states.nombre)}
              size="sm"
            >
              {cellValue}
            </Chip>
          )
        case 'fecha_publicacion':
          return (
            <div className="font-semibold">
              {new Date(property.fecha_publicacion).toLocaleDateString(
                'es-ES',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }
              )}
            </div>
          )
        case 'administrar':
          return (
            <div className="relative gap-2">
              <Button
                className="bg-blue-400 text-xs font-semibold text-white"
                onClick={() => handleAdminClick(property.id)}
              >
                Administrar <EditIcon />
              </Button>
            </div>
          )
        default:
          return cellValue
      }
    },
    []
  )

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-20 rounded-lg w-full" />
        <Skeleton className="custom-height rounded-lg w-full" />
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center items-center flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold">Listado de publicaciones</h1>
      </div>
      <div className="hidden lg:block w-full h-[700px] overflow-y-auto">
        <Table aria-label="Table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === 'administrar' ? 'center' : 'start'}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={properties}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, String(columnKey))}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="block lg:hidden sm:grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="px-4 py-8 border rounded-lg shadow-md mt-4"
          >
            <Chip
              className="capitalize px-4 py-2 text-white font-semibold"
              color={getStatusColor(property.states.nombre)}
              size="sm"
            >
              {property.states.nombre}
            </Chip>
            <div className="font-semibold mt-2">{property.nombre}</div>
            <div>Valor UF: {property.valor_uf}</div>
            <div className="font-semibold">{property.communes.nombre}</div>
            <div className="italic">{property.direccion}</div>
            <div className="font-semibold">
              {property.property_types.nombre}
            </div>

            <div className="flex justify-center">
              <Button
                className="bg-blue-400 text-xs font-semibold text-white mt-2"
                onClick={() => handleAdminClick(property.id)}
              >
                Administrar <EditIcon />
              </Button>
            </div>
            <div className="text-sm text-end mt-2 italic">
              {new Date(property.fecha_publicacion).toLocaleDateString(
                'es-ES',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
