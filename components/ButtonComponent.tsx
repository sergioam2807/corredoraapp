'use client'

import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/react'
import React from 'react'

interface ButtonComponentProps {
  label: string
  onClick?: () => void
  onPress?: () => void
  showButton?: boolean
  smallButton?: boolean
  colorButton?: string
  disabled?: boolean
  isPending?: boolean
}

export const ButtonComponent = ({
  label,
  onClick,
  onPress,
  showButton,
  smallButton,
  colorButton = 'bg-roseGold',
  disabled,
  isPending,
}: ButtonComponentProps) => {
  return (
    <Button
      className={`${showButton ? 'block' : 'hidden'} ${smallButton ? 'w-full' : ''} sm:block ${colorButton}   text-white ${smallButton ? 'md:w-auto lg:w-auto' : ''} py-1`}
      disabled={disabled}
      onClick={onClick}
      onPress={onPress}
    >
      {!isPending ? label : <Spinner color="white" />}
    </Button>
  )
}
