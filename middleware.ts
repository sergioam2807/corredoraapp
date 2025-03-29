import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('appSession')

  if (!token) {
    const loginUrl = new URL('/api/auth/login', req.url)

    loginUrl.searchParams.set(
      'returnTo',
      req.nextUrl.pathname + req.nextUrl.search
    )

    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/publicacion/:path*', // Aplica a todas las rutas bajo `/admin`
}
