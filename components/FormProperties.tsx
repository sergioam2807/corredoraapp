import { Input, Textarea } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

interface Tipo {
  id: number
  nombre: string
}

interface Data {
  tiposVenta: Tipo[]
  tipoPropiedad: Tipo[]
  tipoComuna: Tipo[]
}

interface FormPropertiesProps {
  onChange: (data: any) => void
}

export const FormProperties: React.FC<FormPropertiesProps> = ({ onChange }) => {
  const [data, setData] = useState<Data>({
    tiposVenta: [],
    tipoPropiedad: [],
    tipoComuna: [],
  })
  const [formValues, setFormValues] = useState({
    nombre: '',
    descripcion: '',
    mt2: '',
    habitaciones: '',
    banos: '',
    estacionamientos: '',
    bodegas: '',
    comuna: '',
    direccion: '',
    tipoVenta: '',
    tipoPropiedad: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/filters')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    onChange(formValues)
  }, [formValues])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Nombre"
        placeholder="Nombre de la propiedad"
        type="text"
        name="nombre"
        onChange={handleChange}
      />
      <Textarea
        label="Descripción"
        placeholder="Ingresa la descripción de la propiedad"
        name="descripcion"
        onChange={handleChange}
      />
      <div className="flex gap-4">
        <Input
          label="Mt2"
          placeholder="Metros Cuadrados"
          type="text"
          name="mt2"
          onChange={handleChange}
        />
        <Input
          label="Habitaciones"
          placeholder="Cantidad de Habitaciones"
          type="number"
          name="habitaciones"
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="Baños"
          placeholder="Cantidad de baños"
          type="number"
          name="banos"
          onChange={handleChange}
        />
        <Input
          label="Estacionamientos"
          placeholder="Cantidad de Estacionamientos"
          type="number"
          name="estacionamientos"
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="Bodegas"
          placeholder="Cantidad de Bodegas"
          type="number"
          name="bodegas"
          onChange={handleChange}
        />
        <Select
          label="Comuna"
          placeholder="Selecciona una comuna"
          name="comuna"
          onChange={handleChange}
        >
          {data.tipoComuna.map((tipo) => (
            <SelectItem key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Input
        label="Direccion"
        placeholder="Ingresa la direccion de la propiedad"
        name="direccion"
        onChange={handleChange}
      />
      <div className="flex gap-4">
        <Select
          label="Tipo de Venta"
          placeholder="Selecciona un tipo de venta"
          name="tipoVenta"
          onChange={handleChange}
        >
          {data.tiposVenta.map((tipo) => (
            <SelectItem key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Tipo de Propiedad"
          placeholder="Selecciona un tipo de propiedad"
          name="tipoPropiedad"
          onChange={handleChange}
        >
          {data.tipoPropiedad.map((tipo) => (
            <SelectItem key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
