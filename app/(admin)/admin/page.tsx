'use client'
import { useState } from 'react'
import { ButtonComponent } from '@/components/ButtonComponent'
import { FormProperties } from '@/components/FormProperties'
import { WidgetCard } from '@/components/WidgetCard'
import { useUser } from '@auth0/nextjs-auth0/client'

function AdminPage() {
  const [formData, setFormData] = useState({})
  const { user, error, isLoading } = useUser()
  const name = user?.name?.split(' ')[0]

  const handleFormChange = (newData: Record<string, any>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleSubmit = () => {
    // Aquí puedes enviar formData a tu API
    console.log('Form Data:', formData)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="w-full flex justify-center items-center flex-col gap-4 ">
      <div className="flex flex-col sm:flex-row w-full gap-4 items-center sm:py-10">
        <div className="flex flex-col gap-4 sm:w-1/5 px-4 justify-center items-center">
          <h1 className="text-4xl font-extrabold">Hola! {name} 😁</h1>
          <p className="text-xl">¿Que deseas publicar hoy?</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-evenly gap-8 sm:w-4/5">
          <WidgetCard />
          <WidgetCard />
          <WidgetCard />
        </div>
      </div>
      <div className="w-full pt-8">
        <FormProperties onChange={handleFormChange} />
      </div>
      <div className="w-full flex justify-end px-8 mb-24 sm:mb-0">
        <ButtonComponent label="Publicar" showButton onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default AdminPage
