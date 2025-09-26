/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // API configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
  // Disable Next.js API routes to use custom PHP API
  async redirects() {
    return []
  },
  // Environment variables
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost/api',
  },
}

export default nextConfig
