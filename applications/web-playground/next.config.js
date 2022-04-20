const withPreconstruct = require('@preconstruct/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ui-avatars.com'],
  },
  experimental: {
    externalDir: true,
  },
}

module.exports = withPreconstruct(nextConfig)
