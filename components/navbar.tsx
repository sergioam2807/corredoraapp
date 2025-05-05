import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { link as linkStyles } from '@nextui-org/theme'
import NextLink from 'next/link'
import clsx from 'clsx'
import Image from 'next/image'

import { siteConfig } from '@/config/site'
import { TwitterIcon } from '@/components/icons'

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <div className="flex items-center w-auto">
        <Image priority alt="Logo" height={80} src="/lshprop.png" width={80} />
        <p className="-m-4 sm:block font-semibold text-default-500">
          {siteConfig.name}
        </p>
      </div>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <div className="flex justify-center min-w-full">
          <ul className="hidden sm:flex gap-8 justify-center mr-56">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={
                    (clsx(
                      linkStyles({ color: 'foreground' }),
                      'data-[active=true]:text-primary data-[active=true]:font-medium'
                    ),
                    'text-2xl font-semibold sm:text-lg')
                  }
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </div>
      </NavbarContent>

      <NavbarContent className="hidden xl::flex basis-1/5 " justify="end">
        <NavbarItem className="hidden xl:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 1
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}
