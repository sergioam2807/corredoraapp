/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
  },
  productionBrowserSourceMaps: true,
}

export default nextConfig
