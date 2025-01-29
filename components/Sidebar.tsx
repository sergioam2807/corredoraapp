'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Avatar } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export const Sidebar = () => {
  const { user } = useUser()

  return (
    <div className="hidden sm:block ">
      <div className="px-8 h-full bg-custom-gradient bg-opacity-70 text-white flex flex-col p-4 rounded-tr-3xl rounded-br-3xl">
        <div className="flex justify-center mt-6">
          {user?.picture && (
            <Avatar className="w-20 h-20 text-large" src={user?.picture} />
          )}
        </div>
        <nav className="flex ite flex-col gap-4 mt-8 flex-grow">
          <Link
            href="/admin"
            className="flex items-center  gap-2 p-2 hover:bg-sidebar rounded-xl font-bold "
          >
            <span>Publicar</span>
          </Link>
          <Link
            href="admin/mis-publicaciones"
            className="flex items-center text-start gap-2 p-2 hover:bg-sidebar rounded-xl font-bold"
          >
            <span>Publicaciones</span>
          </Link>
        </nav>
        <div className="mt-auto">
          <Link
            href="/api/auth/logout"
            className="flex items-center gap-2 p-2 hover:bg-sidebar rounded-xl font-bold"
          >
            <span>Cerrar Sesion</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
