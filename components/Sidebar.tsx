'use client'
import { Avatar } from '@nextui-org/react'
import React from 'react'

export const Sidebar = () => {
  return (
    <div className="px-8 h-full bg-roseGold bg-opacity-70 text-white flex flex-col p-4 rounded-tr-3xl rounded-br-3xl">
      <div className="flex justify-center mt-6">
        <Avatar
          className="w-20 h-20 text-large"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </div>
      <nav className="flex flex-col gap-4 mt-8 flex-grow">
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
      <div className="mt-auto">
        <a
          href="/api/auth/logout"
          className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
        >
          <span>Cerrar Sesion</span>
        </a>
      </div>
    </div>
  )
}
