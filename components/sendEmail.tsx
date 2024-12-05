'use client'

import { useState } from 'react'

export const SendEmail = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSendEmail = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: 'Sergio' }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('¡Correo enviado exitosamente!')
      } else {
        setError(data.error || 'Error desconocido al enviar el correo.')
      }
    } catch (err) {
      setError('Hubo un error al intentar enviar el correo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleSendEmail}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar Correo'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  )
}
