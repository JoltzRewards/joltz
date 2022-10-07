import path from 'path'
import { defineConfig } from 'vite'

module.exports = defineConfig({
  base: './',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
      keep_fnames: true,
    },
  },
})
