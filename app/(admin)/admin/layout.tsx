import '@/styles/globals.css'
import { Metadata } from 'next'
import clsx from 'clsx'
import { UserProvider } from '@auth0/nextjs-auth0/client'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Providers } from '@/app/(user)/providers'
import { Sidebar } from '@/components/Sidebar'
import { Bottombar } from '@/components/BottomBar'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>LSH Propiedades</title>
        <meta
          content={metadata.description ?? 'Corredora app'}
          name="description"
        />
        <link href="/favicon.ico" rel="icon" sizes="any" />
      </head>
      <body
        className={clsx(
          fontSans.variable,
          'min-h-screen bg-background font-sans antialiased'
        )}
      >
        <Providers
          themeProps={{
            attribute: 'class',
            themes: ['light'],
            defaultTheme: 'light',
            storageKey: 'theme',
          }}
        >
          <UserProvider>
            <div className="relative flex h-screen z-0">
              <Sidebar />
              <Bottombar />
              <main className="w-full pt-8 px-8 sm:pt-8 sm:px-8">
                {children}
              </main>
            </div>
          </UserProvider>
        </Providers>
      </body>
    </html>
  )
}
