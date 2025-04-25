import { handleAuth } from '@auth0/nextjs-auth0'

export const GET = handleAuth({
  onError(req: unknown, error: unknown) {
    if (error?.toString().includes('access_denied')) {
      console.error('Access denied: Este email no está autorizado')

      return new Response(null, {
        status: 302,
        headers: { Location: '/' },
      })
    }

    return new Response(null, {
      status: 500,
      headers: { Location: '/' },
    })
  },
})

export const POST = handleAuth()
