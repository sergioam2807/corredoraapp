'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error)
  }, [error])

  return (
    <div className="w-full h-96 flex justify-center items-center flex-col gap-24">
      <h2 className="text-4xl font-semibold">Ups, algo salió mal</h2>
      <p className="text-center text-xl font-semibold">
        Parece que hubo un problema al procesar tu solicitud. Inténtalo
        nuevamente en unos momentos.
      </p>

      <button onClick={() => reset()}>Intentalo de nuevo</button>
    </div>
  )
}
