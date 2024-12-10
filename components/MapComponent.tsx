'use client'
import React from 'react'

export const MapComponent = () => {
  return (
    <div className="flex justify-center align-center w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d504379.1788305229!2d-71.85271372873844!3d-32.90993636431451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de0024d67dbf%3A0x21e8b06ea5d15502!2sValpara%C3%ADso%2C%20Chile!5e0!3m2!1ses!2scl!4v1699999999999"
        title="Mapa de la Región de Valparaíso"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        className="rounded-lg"
      />
    </div>
  )
}
