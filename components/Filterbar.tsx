'use client'

import { Select, SelectItem } from '@nextui-org/react'

interface FilterbarProps {
  filters: Array<{ key: string; label: string }>
}

export const Filterbar = ({ filters }: FilterbarProps) => {
  return (
    <Select
      label="Tipo"
      placeholder="Selecciona un tipo"
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
