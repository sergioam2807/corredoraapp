import { Skeleton } from '@heroui/skeleton'
import '@/styles/custom.css'

export default function SkeletonAdmin() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex-col sm:flex-row gap-4 hidden sm:flex sm:block">
        <Skeleton className="rounded-lg w-full">
          <div className="h-24 sm:h-44 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="rounded-lg w-full">
          <div className="h-24 sm:h-44 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="rounded-lg w-full">
          <div className="h-24 sm:h-44 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
      <Skeleton className="rounded-lg  sm:block md:hidden">
        <div className="h-72 sm:h-96 rounded-lg bg-default-300" />
      </Skeleton>
      <Skeleton className="rounded-lg  hidden sm:block">
        <div className="h-72 sm:h-96 rounded-lg bg-default-300" />
      </Skeleton>
      <Skeleton className="rounded-lg  hidden sm:block">
        <div className="h-72 sm:h-72 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="sm:hidden">
        <Skeleton className="rounded-lg">
          <div className="h-72 sm:h-96 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
      <div className="sm:hidden">
        <Skeleton className="rounded-lg">
          <div className="h-16 sm:h-20 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

      <div className="sm:hidden">
        <Skeleton className="rounded-lg">
          <div className="h-16 sm:h-20 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </div>
  )
}
