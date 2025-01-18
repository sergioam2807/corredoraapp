import useMediaQuery from '@/hooks/useMediaQuery'
import { Skeleton } from '@heroui/skeleton'
import '@/styles/custom.css'

export default function SkeletonAdmin() {
  const isXL = useMediaQuery('(min-width: 1280px)')

  if (isXL) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <Skeleton className="rounded-lg w-full">
            <div className="h-44 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="rounded-lg w-full">
            <div className="h-44 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="rounded-lg w-full">
            <div className="h-44 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
        <Skeleton className="rounded-lg">
          <div className="custom-height rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300" />
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-72 rounded-lg bg-default-300" />
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-72 rounded-lg bg-default-300" />
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-16 rounded-lg bg-default-300" />
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-16 rounded-lg bg-default-300" />
      </Skeleton>
    </div>
  )
}
