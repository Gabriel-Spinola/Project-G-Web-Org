/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
    serverActions: true,
  },
  env: {
    RECAPTCHA_SITE_KEY: '6LevjPUnAAAAAFr3W2IrbvOxPRuSo-hUhsI6TgZ1',
  },
}

module.exports = nextConfig
