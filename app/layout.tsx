import '@/styles/globals.css'
import { Metadata } from 'next'
import clsx from 'clsx'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import Image from 'next/image'
import wtsp from '@/public/whatsapp.png'
import email from '@/public/email.png'
import location from '@/public/location.png'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

// export const viewport: Viewport = {
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: 'white' },
//     // { media: '(prefers-color-scheme: dark)', color: 'black' },
//   ],
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
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
          <div className="relative flex flex-col h-screen">
            <Navbar />
            {/* className="container mx-auto max-w-7xl pt-16 px-6 flex-grow" */}
            <main className="pt-16">{children}</main>

            {/* <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">NextUI</p>
              </Link> */}
            <footer className="w-full flex flex-col items-center justify-center py-4 gap-2">
              <div className="flex flex-col lg:flex-row gap-1 lg:gap-8">
                <div className="flex gap-1">
                  <Image src={wtsp} alt="whatsapp" width={24} height={24} />
                  <p className="text-default-500">+569 64562423</p>
                </div>
                <div className="flex gap-1">
                  <Image src={email} alt="email" width={24} height={24} />
                  <p className="text-default-500">contacto@lorenasoto.cl</p>
                </div>
                <div className="flex gap-1">
                  <Image src={location} alt="location" width={24} height={24} />
                  <p className="text-default-500">Region de Valparaiso</p>
                </div>
              </div>
              <div className="flex gap-1 mt-2">
                <p className="text-default-500">Visita mis redes sociales</p>
              </div>
              <div className="flex gap-14">
                <Image src={location} alt="location" width={24} height={24} />
                <Image src={location} alt="location" width={24} height={24} />
                <Image src={location} alt="location" width={24} height={24} />
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
