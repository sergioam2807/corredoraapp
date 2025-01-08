'use client'
import { useState } from 'react'
import { ButtonComponent } from '@/components/ButtonComponent'
import { FormProperties } from '@/components/FormProperties'
import { WidgetCard } from '@/components/WidgetCard'
import { useUser } from '@auth0/nextjs-auth0/client'
import { PieChartComponent } from '@/components/PieChartComponent'

function AdminPage() {
  const [formData, setFormData] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  const { user, error, isLoading } = useUser()
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
      console.log('result', result)
      if (response.ok) {
        setShowPopup(true)
        setFormData({})
        handleFormChange({})
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="w-full flex justify-center items-center flex-col gap-4 ">
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
      <div className="w-full ">
        <FormProperties onChange={handleFormChange} showPopup={showPopup} />
      </div>
      <div className="w-full flex justify-end px-8 mb-24 sm:mb-0 sm:-mt-20">
        <ButtonComponent label="Publicar" showButton onClick={handleSubmit} />
      </div>
      {showPopup && (
        <div className="fixed bottom-10 left-48 z-50 bg-green-500 text-white p-4 gap-4 rounded-xl flex items-center">
          <p>Publicación exitosa!</p>
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

export default AdminPage
