'use client'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import React, { ChangeEvent, useState } from 'react'
import Confetti from 'react-confetti'
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

export const ContactMe = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [successMessage, setSuccessMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const { onOpen, isOpen, onOpenChange } = useDisclosure()

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

  const handleSubmit = () => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    console.log('Form Data:', formData)

    setFormData({
      nombre: '',
      correo: '',
      telefono: '',
      mensaje: '',
    })
    setSuccessMessage(
      'El mensaje fue enviado y nos pondremos en contacto a la brevedad posible.'
    )

    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  return (
    <div>
      {showConfetti && <Confetti />}
      <Card
        isFooterBlurred
        className="w-full col-span-12 sm:col-span-5 bg-roseGold bg-opacity-40"
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
          {successMessage && <p className="text-green-500">{successMessage}</p>}
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
        <ModalComponent isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
    </div>
  )
}
