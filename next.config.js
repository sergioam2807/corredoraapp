/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com', // Dominios permitidos
        port: '', // Deja vacío si no usas un puerto específico
        pathname: '/**', // Permite todas las rutas bajo este dominio
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
}

export default nextConfig
