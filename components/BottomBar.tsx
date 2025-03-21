'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Avatar } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export const Bottombar = () => {
  const { user } = useUser()

  return (
    <div className="fixed bottom-0 left-0 right-0 block md:hidden z-50">
      <div className="px-8 h-full bg-roseGold  text-white flex p-4 rounded-t-3xl">
        <div className="flex justify-center items-center sm:block">
          {user?.picture && (
            <Avatar className="w-10 h-10 text-large" src={user?.picture} />
          )}
        </div>
        <nav className="flex gap-4 flex-grow justify-center items-center ">
          <Link
            className="flex items-center gap-2 p-2 hover:bg-sidebar rounded-xl font-bold"
            href="/admin"
          >
            <span>Publicar</span>
          </Link>
          <Link
            className="flex items-center gap-2 p-2 hover:bg-sidebar rounded-xl font-bold"
            href="admin/mis-publicaciones"
          >
            <span>Mis Publicaciones</span>
          </Link>
        </nav>
        <div className="flex justify-center items-center">
          <Link
            className="flex items-center gap-2 p-2 hover:bg-sidebar rounded-xl font-bold"
            href="/api/auth/logout"
          >
            <span>Cerrar Sesion</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
