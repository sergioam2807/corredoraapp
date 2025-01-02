import { Input, Textarea } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/react'
import Image from 'next/image'
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
    valor: '',
    mt2: '',
    habitaciones: '',
    banos: '',
    estacionamientos: '',
    bodegas: '',
    comuna: '',
    direccion: '',
    tipoVenta: '',
    tipoPropiedad: '',
    profitPercentage: '',
    imagenes: [] as File[],
    imagenesPreview: [] as string[],
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
    const { name, value, files } = e.target
    if (name === 'ganancia' && Number(value) > 100) {
      alert('El porcentaje de ganancia no puede ser mayor a 100')
      return
    }
    if (name === 'imagenes' && files) {
      const fileArray = Array.from(files)
      if (formValues.imagenes.length + fileArray.length > 12) {
        alert('No puedes agregar más de 12 imágenes')
        return
      }
      const previewArray = fileArray.map((file) => URL.createObjectURL(file))
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: [...prevValues.imagenes, ...fileArray],
        imagenesPreview: [...prevValues.imagenesPreview, ...previewArray],
      }))
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormValues((prevValues) => {
      const newImages = [...prevValues.imagenes]
      const newPreviews = [...prevValues.imagenesPreview]
      newImages.splice(index, 1)
      newPreviews.splice(index, 1)
      return {
        ...prevValues,
        imagenes: newImages,
        imagenesPreview: newPreviews,
      }
    })
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
      <Input
        label="Valor"
        placeholder="Ingrese valor en uf"
        type="text"
        name="valor"
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
      <div className="flex gap-4">
        <Input
          label="Direccion"
          placeholder="Ingresa la direccion de la propiedad"
          name="direccion"
          onChange={handleChange}
        />
        {/* <Input
          label="Procentaje de ganancia"
          placeholder="% de ganancia"
          type="number"
          name="ganancia"
          onChange={handleChange}
        /> */}
      </div>
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
      <div className="gap-4 sm:flex">
        <Input
          label="Imágenes"
          type="file"
          name="imagenes"
          multiple
          onChange={handleChange}
          className="sm:w-fit font-bold"
        />
        <div className="flex gap-4">
          {formValues.imagenesPreview.map((src, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              className="relative cursor-pointer hover:opacity-75"
              onClick={() => handleRemoveImage(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleRemoveImage(index)
                }
              }}
            >
              <Image
                src={src}
                alt={`Imagen ${index + 1}`}
                className="w-14 h-14 object-contain rounded-lg"
                height={20}
                width={60}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
