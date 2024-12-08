export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Lorena Soto Propiedades',
  description: 'Sitio de venta de propiedades',
  navItems: [
    {
      label: 'Inicio',
      href: '/',
    },
    {
      label: 'Quien Soy',
      href: '/conoceme',
    },
    {
      label: 'Contacto',
      href: '/contacto',
    },
  ],
  navMenuItems: [
    //TODO ADMIN ROUTE
    {
      label: 'Contacto',
      href: '/conoceme',
    },
    {
      label: 'Propiedades',
      href: '/propiedades',
    },
  ],
  links: {
    //ADD SOCIAL LINKS
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
}
