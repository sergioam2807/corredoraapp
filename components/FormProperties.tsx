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
  estadoVenta: Tipo[]
}

interface FormValues {
  nombre: string
  descripcion: string
  valor: string
  mt2: string
  habitaciones: string
  banos: string
  estacionamientos: string
  bodegas: string
  comuna: string
  direccion: string
  tipoVenta: string
  tipoPropiedad: string
  profitPercentage: string
  imagenes: File[]
  imagenesPreview: string[]
}

interface FormPropertiesProps {
  onChange: (data: any) => void
  showPopup: boolean
}

export const FormProperties: React.FC<FormPropertiesProps> = ({
  onChange,
  showPopup,
}) => {
  const [data, setData] = useState<Data>({
    tiposVenta: [],
    tipoPropiedad: [],
    tipoComuna: [],
    estadoVenta: [],
  })
  const [formValues, setFormValues] = useState<FormValues>({
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
    imagenes: [],
    imagenesPreview: [],
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

  useEffect(() => {
    if (showPopup) {
      setFormValues({
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
        imagenes: [],
        imagenesPreview: [],
      })
    }
  }, [showPopup])

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    const files = (e.target as HTMLInputElement).files

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
      const formData = new FormData()
      fileArray.forEach((file) => formData.append('file', file))

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()

      const previewArray = result.urls || []

      if (Array.isArray(previewArray)) {
        setFormValues((prevValues) => ({
          ...prevValues,
          imagenes: [...prevValues.imagenes, ...fileArray],
          imagenesPreview: [...prevValues.imagenesPreview, ...previewArray],
        }))
      } else {
        console.error(
          'Error: La respuesta de la API no contiene un array de URLs'
        )
      }
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
    }
  }

  const handleRemoveImage = async (index: number) => {
    const fileName = formValues.imagenesPreview[index].split('/').pop()

    const response = await fetch('/api/deleteImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName }),
    })

    const result = await response.json()

    if (result.success) {
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
    } else {
      console.error('Error al eliminar la imagen:', result.error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Nombre"
        placeholder="Nombre de la propiedad"
        type="text"
        name="nombre"
        onChange={handleChange}
        value={formValues.nombre}
      />
      <Textarea
        label="Descripción"
        placeholder="Ingresa la descripción de la propiedad"
        name="descripcion"
        onChange={handleChange}
        value={formValues.descripcion}
      />

      <div className="flex gap-4">
        <Input
          label="Direccion"
          placeholder="Ingresa la direccion de la propiedad"
          name="direccion"
          onChange={handleChange}
          value={formValues.direccion}
        />
        <Input
          label="Valor"
          placeholder="Ingrese valor en uf"
          type="text"
          name="valor"
          onChange={handleChange}
          value={formValues.valor}
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="Mt2"
          placeholder="Metros Cuadrados"
          type="text"
          name="mt2"
          onChange={handleChange}
          value={formValues.mt2}
        />
        <Input
          label="Habitaciones"
          placeholder="Cantidad de Habitaciones"
          type="number"
          name="habitaciones"
          onChange={handleChange}
          value={formValues.habitaciones}
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="Baños"
          placeholder="Cantidad de baños"
          type="number"
          name="banos"
          onChange={handleChange}
          value={formValues.banos}
        />
        <Input
          label="Estacionamientos"
          placeholder="Cantidad de Estacionamientos"
          type="number"
          name="estacionamientos"
          onChange={handleChange}
          value={formValues.estacionamientos}
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="Bodegas"
          placeholder="Cantidad de Bodegas"
          type="number"
          name="bodegas"
          onChange={handleChange}
          value={formValues.bodegas}
        />
        <Select
          label="Comuna"
          placeholder="Selecciona una comuna"
          name="comuna"
          onChange={handleChange}
          value={formValues.comuna}
        >
          {data.tipoComuna.map((tipo) => (
            <SelectItem key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex gap-4">
        <Select
          label="Tipo de propiedad"
          placeholder="Selecciona un tipo"
          name="tipoPropiedad"
          onChange={handleChange}
          value={formValues.tipoPropiedad}
        >
          {data.tipoPropiedad.map((tipo) => (
            <SelectItem key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Procentaje de ganancia"
          placeholder="% de ganancia"
          type="number"
          name="profitPercentage"
          onChange={handleChange}
          value={formValues.profitPercentage}
        />
      </div>
      <div className="flex gap-4">
        <Select
          label="Tipo de Venta"
          placeholder="Selecciona un tipo de venta"
          name="tipoPropiedad"
          onChange={handleChange}
          value={formValues.tipoPropiedad}
        >
          {data.tiposVenta.map((tipo) => (
            <SelectItem key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Estado de la propiedad"
          placeholder="Selecciona un estado"
          name="tipoPropiedad"
          onChange={handleChange}
          value={formValues.tipoPropiedad}
        >
          {data.estadoVenta.map((tipo) => (
            <SelectItem key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          label="Imágenes"
          type="file"
          name="imagenes"
          multiple
          onChange={handleChange}
          className="w-fit font-bold"
        />
        <div className="flex gap-4 flex-wrap">
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
