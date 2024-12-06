'use client'

import { Button } from '@nextui-org/button'
import React from 'react'

export const ButtonComponent = () => {
  const handleClick = () => {
    console.log('Llamar al modal')
  }

  return (
    <Button
      className="hidden sm:block bg-roseGold text-white"
      onClick={handleClick}
    >
      Contacto
    </Button>
  )
}
