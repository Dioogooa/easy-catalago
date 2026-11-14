import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Output standalone para Docker
  output: 'standalone',

  // Configuração de imagens permitidas
  images: {
    remotePatterns: [
      // MinIO local (desenvolvimento)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/easycatalago/**',
      },
      // Produção: adicionar padrões S3/R2 conforme necessário
    ],
  },

  // Variáveis de ambiente expostas ao cliente
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    NEXT_PUBLIC_STORAGE_URL: process.env.NEXT_PUBLIC_STORAGE_URL ?? 'http://localhost:9000/easycatalago',
  },
}

export default nextConfig
