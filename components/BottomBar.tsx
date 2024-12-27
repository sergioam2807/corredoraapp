'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Avatar } from '@nextui-org/react'
import React from 'react'

export const Bottombar = () => {
  const { user } = useUser()
  return (
    <div className="fixed bottom-0 left-0 right-0 block md:hidden">
      <div className="px-8 h-full bg-roseGold bg-opacity-70 text-white flex  p-4 rounded-t-3xl">
        <div className="flex justify-center items-center sm:blovk ">
          {user?.picture && (
            <Avatar className="w-10 h-10 text-large" src={user?.picture} />
          )}
        </div>
        <nav className="flex gap-4  flex-grow justify-center items-center">
          <a
            href="admin/publicar"
            className="flex items-center gap-2 p-2 hover:bg-gray-700 hover:bg-opacity-40 rounded"
          >
            <span>Publicar</span>
          </a>
          <a
            href="/mis-publicaciones"
            className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
          >
            <span>Mis Publicaciones</span>
          </a>
        </nav>
        <div className="flex justify-center items-center ">
          <a
            href="/api/auth/logout"
            className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
          >
            <span>Cerrar Sesion</span>
          </a>
        </div>
      </div>
    </div>
  )
}
