import { Skeleton } from '@heroui/skeleton'
import { Input, Textarea } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import '@/styles/custom.css'
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
  estadoVenta: string
  tipoVenta: string
  tipoPropiedad: string
  profitPercentage: string
  imagenes: File[]
  imagenesPreview: string[]
  profit_percentage: number
}

interface FormPropertiesProps {
  onChange: (data: any) => void
  showPopup: boolean
  id?: string
  setDataIsloading?: (loading: boolean) => void
}

export const FormProperties: React.FC<FormPropertiesProps> = ({
  onChange,
  showPopup,
  id,
  setDataIsloading,
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
    estadoVenta: '',
    tipoPropiedad: '',
    tipoVenta: '',
    profitPercentage: '',
    imagenes: [],
    imagenesPreview: [],
    profit_percentage: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/filters')
        const result = await response.json()

        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        if (setDataIsloading) {
          setDataIsloading(false)
        }
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const response = await fetch(`/api/properties?id=${id}`)
          const data = await response.json()

          setFormValues({
            nombre: data.nombre || '',
            descripcion: data.descripcion || '',
            valor: data.valor_uf || '',
            mt2: data.mt2 || '',
            habitaciones: data.habitaciones || '',
            banos: data.banos || '',
            estacionamientos: data.estacionamientos || '',
            bodegas: data.bodegas || '',
            comuna: data.comuna_id || '',
            direccion: data.direccion || '',
            tipoVenta: data.estado_id || '',
            tipoPropiedad: data.tipo_propiedad_id || '',
            estadoVenta: data.disponibilidad_id || '',
            profitPercentage: data.profit_percentage || '',
            imagenes: [],
            imagenesPreview:
              data.images.map((image: { url: string }) => image.url) || [],
            profit_percentage: data.profit_percentage || 0,
          })
        } catch (error) {
          console.log('Error fetching property', error)
        } finally {
          setLoading(false)
        }
      }

      fetchProperty()
    } else {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (!loading) {
      onChange(formValues)
    }
  }, [formValues, loading])

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
        estadoVenta: '',
        tipoPropiedad: '',
        tipoVenta: '',
        profitPercentage: '',
        imagenes: [],
        imagenesPreview: [],
        profit_percentage: 0,
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

  if (loading) return <Skeleton className="rounded-lg custom-skeleton-height" />

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Nombre"
        name="nombre"
        placeholder="Nombre de la propiedad"
        type="text"
        value={formValues.nombre}
        onChange={handleChange}
      />
      <Textarea
        label="Descripción"
        name="descripcion"
        placeholder="Ingresa la descripción de la propiedad"
        value={formValues.descripcion}
        onChange={handleChange}
      />

      <div className="flex gap-4">
        <Input
          label="Direccion"
          name="direccion"
          placeholder="Ingresa la direccion de la propiedad"
          value={formValues.direccion}
          onChange={handleChange}
        />
        <Input
          label="Valor"
          name="valor"
          placeholder="Ingrese valor en uf"
          type="text"
          value={formValues.valor}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="Mt2"
          name="mt2"
          placeholder="Metros Cuadrados"
          type="text"
          value={formValues.mt2}
          onChange={handleChange}
        />
        <Input
          label="Habitaciones"
          name="habitaciones"
          placeholder="Cantidad de Habitaciones"
          type="number"
          value={formValues.habitaciones}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="Baños"
          name="banos"
          placeholder="Cantidad de baños"
          type="number"
          value={formValues.banos}
          onChange={handleChange}
        />
        <Input
          label="Estacionamientos"
          name="estacionamientos"
          placeholder="Cantidad de Estacionamientos"
          type="number"
          value={formValues.estacionamientos}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="Bodegas"
          name="bodegas"
          placeholder="Cantidad de Bodegas"
          type="number"
          value={formValues.bodegas}
          onChange={handleChange}
        />
        <Select
          label="Comuna"
          name="comuna"
          placeholder="Selecciona una comuna"
          selectedKeys={formValues.comuna ? [formValues.comuna.toString()] : []}
          onChange={handleChange}
        >
          {data.tipoComuna?.map((tipo) => (
            <SelectItem key={tipo.id.toString()} value={tipo.id.toString()}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex gap-4">
        <Select
          label="Tipo de propiedad"
          name="tipoPropiedad"
          placeholder="Selecciona un tipo"
          selectedKeys={
            formValues.tipoPropiedad
              ? [formValues.tipoPropiedad.toString()]
              : []
          }
          onChange={handleChange}
        >
          {data.tipoPropiedad?.map((tipo) => (
            <SelectItem key={tipo.id.toString()} value={tipo.id.toString()}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Procentaje de ganancia"
          name="profitPercentage"
          placeholder="% de ganancia"
          type="number"
          value={formValues.profitPercentage}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <Select
          label="Tipo de Venta"
          name="tipoVenta"
          placeholder="Selecciona un tipo de venta"
          selectedKeys={
            formValues.tipoVenta ? [formValues.tipoVenta.toString()] : []
          }
          onChange={handleChange}
        >
          {data.tiposVenta?.map((tipo) => (
            <SelectItem key={tipo.id.toString()} value={tipo.id.toString()}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Estado de la propiedad"
          name="estadoVenta"
          placeholder="Selecciona un estado"
          selectedKeys={
            formValues.estadoVenta ? [formValues.estadoVenta.toString()] : []
          }
          onChange={handleChange}
        >
          {data.estadoVenta?.map((tipo) => (
            <SelectItem key={tipo.id.toString()} value={tipo.id.toString()}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          multiple
          className="w-fit font-bold"
          label="Imágenes"
          name="imagenes"
          type="file"
          onChange={handleChange}
        />
        <div className="flex gap-4 flex-wrap">
          {formValues.imagenesPreview.map((src, index) => (
            <div
              key={index}
              className="relative cursor-pointer hover:opacity-75"
              role="button"
              tabIndex={0}
              onClick={() => handleRemoveImage(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleRemoveImage(index)
                }
              }}
            >
              <Image
                alt={`Imagen ${index + 1}`}
                className="w-14 h-14 object-contain rounded-lg"
                height={20}
                src={src}
                width={60}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
