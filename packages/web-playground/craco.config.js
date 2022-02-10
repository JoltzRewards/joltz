const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const webpack = require('webpack')
const { ESLINT_MODES } = require('@craco/craco')

module.exports = {
  webpack: {
    configure: {
      plugins: [
        new NodePolyfillPlugin(),
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
      resolve: {
        fallback: {
          stream: require.resolve('stream-browserify'),
          console: require.resolve('console-browserify'),
          buffer: require.resolve('buffer'),
          crypto: require.resolve('crypto-browserify'),
        },
      },
    },
    eslint: {
      enable: true,
      mode: ESLINT_MODES.extends,
    },

    jest: {
      configure: {
        setupFilesAfterEnv: ['../../config/jest/setupTests.js'],
      },
    },
    style: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  },
}
