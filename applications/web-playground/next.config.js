const withPreconstruct = require('@preconstruct/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['ui-avatars.com'],
  },
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve('react').replace('index.js', ''),
      'react-dom': require.resolve('react-dom').replace('index.js', ''),
    }

    return config
  },
  // experimental: {
  //   externalDir: true,
  // },
}

module.exports = withPreconstruct(nextConfig)
