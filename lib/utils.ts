import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusColor = (
  status: string
):
  | 'success'
  | 'warning'
  | 'danger'
  | 'default'
  | 'primary'
  | 'secondary'
  | undefined => {
  switch (status) {
    case 'Venta':
      return 'success'
    case 'Arriendo':
      return 'warning'
    case 'Arriendo Temporal':
      return 'danger'
    default:
      return 'primary'
  }
}
