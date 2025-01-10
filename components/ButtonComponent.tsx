'use client'

import { Button } from '@nextui-org/button'
import { on } from 'events'
import React from 'react'

interface ButtonComponentProps {
  label: string
  onClick?: () => void
  onPress?: () => void
  showButton?: boolean
  smallButton?: boolean
  colorButton?: string
}

export const ButtonComponent = ({
  label,
  onClick,
  onPress,
  showButton,
  smallButton,
  colorButton = 'bg-roseGold',
}: ButtonComponentProps) => {
  return (
    <Button
      className={`${showButton ? 'block' : 'hidden'} ${smallButton ? 'w-full' : ''} sm:block ${colorButton}   text-white ${smallButton ? 'md:w-auto lg:w-auto' : ''}`}
      onClick={onClick}
      onPress={onPress}
    >
      {label}
    </Button>
  )
}
