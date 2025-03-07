'use client'
import { useState, Suspense } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Button, ModalFooter } from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Skeleton } from '@heroui/skeleton'

import { ButtonComponent } from '@/components/ButtonComponent'
import { FormProperties } from '@/components/FormProperties'
import { WidgetCard } from '@/components/WidgetCard'
import { PieChartComponent } from '@/components/PieChartComponent'
import { ModalComponent } from '@/components/ModalComponent'
import SkeletonAdmin from '@/components/skeleton/SkeletonAdmin'

function AdminPageContent() {
  const [formData, setFormData] = useState({
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
    estadoVenta: '',
    profitPercentage: '',
    imagenes: [],
    imagenesPreview: [],
  })
  const [showPopup, setShowPopup] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataIsloading, setDataIsloading] = useState(true)
  const { user, error, isLoading } = useUser()
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')
  const name = user?.name?.split(' ')[0]

  const handleFormChange = (newData: Record<string, any>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await response.json()

      if (response.ok) {
        setShowPopup(true)
        setFormData({
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
          estadoVenta: '',
          profitPercentage: '',
          imagenes: [],
          imagenesPreview: [],
        })
        handleFormChange({})
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handlePut = async () => {
    try {
      const response = await fetch(`/api/properties`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, id }),
      })

      if (response.ok) {
        setShowPopup(true)
        setFormData({
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
          estadoVenta: '',
          profitPercentage: '',
          imagenes: [],
          imagenesPreview: [],
        })
        handleFormChange({})
        router.push('/admin/mis-publicaciones')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDeleteClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleConfirmDelete = (id: string | null) => {
    if (id === null) {
      console.error('ID is null')

      return
    }

    try {
      fetch(`/api/properties`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: Number(id) }),
      })
      router.push('/admin/mis-publicaciones')
    } catch (error) {
      console.error('Error:', error)
    }
    setIsModalOpen(false)
  }

  if (isLoading)
    return (
      <div>
        <SkeletonAdmin />
      </div>
    )
  if (error) return <div>{error.message}</div>

  return (
    <div className="w-full sm:h-full flex sm:flex-col justify-center items-center flex-col gap-4 ">
      <div className="flex flex-col sm:flex-row w-full gap-4 items-center sm:py-0">
        <div className="flex flex-col gap-4 sm:w-1/5 px-4 justify-center items-center">
          <h1 className="text-2xl font-extrabold">¡Hola {name}! 😁</h1>
          <p className="text-lg">¿Qué deseas publicar hoy?</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-around gap-8 sm:w-4/5 w-full">
          <PieChartComponent />
          <WidgetCard />
          {/* <Earnings /> */}
        </div>
      </div>
      <div className="w-full sm:flex-grow sm:overflow-auto">
        <FormProperties
          id={id ?? undefined}
          setDataIsloading={setDataIsloading}
          showPopup={showPopup}
          onChange={handleFormChange}
        />
      </div>
      <div className="w-full flex justify-end px-8 mb-24 sm:mb-4 gap-4">
        {/* TODO: ADD CONDITONAL IN EDIT OR ADMIN MODE */}
        {id && (
          <div className={`${dataIsloading ? 'hidden' : 'flex'} `}>
            <ButtonComponent
              showButton
              colorButton="bg-rose-600"
              label="Eliminar"
              onClick={handleDeleteClick}
            />
          </div>
        )}
        <div className={`${dataIsloading ? 'hidden' : 'flex'} `}>
          <ButtonComponent
            label={id ? 'Editar' : 'Publicar'}
            showButton={dataIsloading}
            onClick={id ? handlePut : handleSubmit}
          />
        </div>
        <ModalComponent
          hasCancelButton={false}
          isOpen={isModalOpen}
          title="Confirmar Eliminación"
          onOpenChange={setIsModalOpen}
        >
          <div className="w-full flex justify-center items-center flex-col gap-4 p-4 text-center">
            <p>¿Estás seguro de que deseas eliminar este elemento?</p>
          </div>
          <ModalFooter className="flex justify-between">
            <Button color="danger" variant="light" onPress={handleModalClose}>
              Cancelar
            </Button>
            <Button
              color="success"
              variant="light"
              onPress={() => handleConfirmDelete(id)}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalComponent>
      </div>
      {showPopup && (
        <div className="fixed bottom-10 left-48 z-50 bg-green-500 text-white p-4 gap-4 rounded-xl flex items-center">
          <p> {id ? 'Edicion exitosa!' : 'Publicación exitosa!'}</p>
          <button
            className="bg-white text-green-500 px-2 py-2 rounded-lg"
            onClick={() => setShowPopup(false)}
          >
            OK
          </button>
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={<Skeleton className="rounded-lg" />}>
      <AdminPageContent />
    </Suspense>
  )
}
