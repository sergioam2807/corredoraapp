'use client'
import { WidgetCard } from '@/components/WidgetCard'
import { useUser } from '@auth0/nextjs-auth0/client'

function AdminPage() {
  const { user, error, isLoading } = useUser()
  const name = user?.name?.split(' ')[0]

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  return (
    <div className="w-full flex justify-center items-center flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold">Hola! {name} 😁</h1>
        <p>¿Que deseas publicar hoy?</p>
      </div>
      <div>
        <WidgetCard />
      </div>
    </div>
  )
}

export default AdminPage
