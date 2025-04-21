'use client'

import { Pagination } from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationComponentProps {
  total: number
  currentPage: number
  itemsPerPage: number
}

export const PaginationComponent = ({
  total,
  currentPage,
  itemsPerPage,
}: PaginationComponentProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(total / itemsPerPage)

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams as any)

    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <Pagination
      initialPage={currentPage}
      total={totalPages}
      onChange={(page: number) => handlePageChange(page)}
    />
  )
}
