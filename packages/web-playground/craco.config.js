const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  webpack: {
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
    resolve: {
      fallback: {
        stream: require('stream-browserify'),
        buffer: require('buffer'),
        crypto: require('crypto-browserify'),
      },
    },
  },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
}
