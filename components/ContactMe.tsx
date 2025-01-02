'use client'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import React, { ChangeEvent, useState } from 'react'

import { ModalComponent } from './ModalComponent'

interface FormData {
  nombre: string
  correo: string
  telefono: string
  mensaje: string
}

interface FormErrors {
  nombre?: string
  correo?: string
  telefono?: string
  mensaje?: string
}

interface ContactMeProps {
  elevated?: boolean
}

export const ContactMe = ({ elevated }: ContactMeProps) => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [successMessage, setSuccessMessage] = useState('')
  const { onOpen, isOpen, onOpenChange } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validate = () => {
    const newErrors: FormErrors = {}
    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio'
    if (!formData.correo) newErrors.correo = 'El correo es obligatorio'
    if (!formData.telefono) newErrors.telefono = 'El teléfono es obligatorio'
    if (!formData.mensaje) newErrors.mensaje = 'El mensaje es obligatorio'
    return newErrors
  }

  const handleSubmit = async () => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    console.log('Form Data:', formData)

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('¡Correo enviado exitosamente!')
        setFormData({
          nombre: '',
          correo: '',
          telefono: '',
          mensaje: '',
        })
        setSuccessMessage(
          'El mensaje fue enviado y nos pondremos en contacto a la brevedad posible.'
        )
      } else {
        setError(data.error || 'Error desconocido al enviar el correo.')
      }
    } catch (err) {
      setError('Hubo un error al intentar enviar el correo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card
        isFooterBlurred
        className={`w-full col-span-12 sm:col-span-5 bg-roseGold bg-opacity-40 ${elevated ? 'shadow-none' : 'shadow-medium'}`}
      >
        <CardHeader className="z-10 top-1 flex-col items-start">
          <h4 className="text-black w-full text-center text-2xl font-bold">
            Contacto
          </h4>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center gap-3">
          <Input
            label="Nombre"
            placeholder="Ingresa tu nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            errorMessage={errors.nombre}
            isRequired
            isInvalid={!!errors.nombre}
          />
          <Input
            label="Correo"
            placeholder="Ingresa tu Correo"
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            errorMessage={errors.correo}
            isRequired
            isInvalid={!!errors.correo}
          />
          <Input
            label="Telefono"
            placeholder="Ingresa tu numero"
            type="phone"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            errorMessage={errors.telefono}
            isRequired
            isInvalid={!!errors.telefono}
          />
          <Textarea
            label="Mensaje"
            placeholder="Ingresa tu mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            errorMessage={errors.mensaje}
            isRequired
            isInvalid={!!errors.mensaje}
          />
        </CardBody>

        <Button
          className="text-tiny mx-4 my-4"
          color="primary"
          radius="full"
          size="sm"
          onClick={handleSubmit}
          spinner
          onPress={onOpen}
        >
          Enviar
        </Button>
      </Card>
      {successMessage && isOpen && (
        <ModalComponent isOpen={isOpen} onOpenChange={onOpenChange}>
          {successMessage && (
            <div className="flex justify-center items-center px-4 gap-6 -mb-5">
              <div className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-10 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-justify">{successMessage}</p>
            </div>
          )}
        </ModalComponent>
      )}
    </div>
  )
}
