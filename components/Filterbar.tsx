'use client'

import { Select, SelectItem } from '@nextui-org/react'

interface FilterbarProps {
  filters: Array<{ key: string; label: string }>
  label?: string
  placeholder?: string
}

export const Filterbar = ({
  filters,
  label = 'Tipo',
  placeholder = 'Selecciona un tipo',
}: FilterbarProps) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      //   disabledKeys={[
      //     'Vemta',
      //     'Arriendo',
      //     'lion',
      //     'elephant',
      //     'crocodile',
      //     'whale',
      //   ]}
      className="max-w-xs z-20"
    >
      {filters.map((filter) => (
        <SelectItem key={filter.key}>{filter.label}</SelectItem>
      ))}
    </Select>
  )
}
