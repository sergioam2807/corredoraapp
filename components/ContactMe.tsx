'use client'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Textarea,
} from '@nextui-org/react'
import React, { useState } from 'react'
import Confetti from 'react-confetti'

export const ContactMe = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validate = () => {
    const newErrors = {}
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
    // Aquí puedes enviar la data a tu servidor o API

    // Limpiar los datos del formulario
    setFormData({
      nombre: '',
      correo: '',
      telefono: '',
      mensaje: '',
    })

    // Mostrar mensaje de éxito
    setSuccessMessage(
      'El mensaje fue enviado y nos pondremos en contacto a la brevedad posible.'
    )

    // Mostrar confeti
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000) // Ocultar confeti después de 5 segundos
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
            validationState={errors.nombre ? 'invalid' : 'valid'}
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
            validationState={errors.correo ? 'invalid' : 'valid'}
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
            isInvalid={errors.telefono ? 'invalid' : 'valid'}
          />
          <Textarea
            label="Mensaje"
            placeholder="Ingresa tu mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            errorMessage={errors.mensaje}
            isRequired
            isInvalid={errors.mensaje ? 'invalid' : 'valid'}
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
        >
          Enviar
        </Button>
      </Card>
    </div>
  )
}s