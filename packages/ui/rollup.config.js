import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      typescript({
        clean: true,
        tsconfig: 'tsconfig-rollup.json',
        typescript: require('typescript'),
      }),
    ],
  },
  {
    input: '.dist/esm/index.d.ts',
    output: [{ file: '.dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
]
// import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
// import typescript from '@rollup/plugin-typescript'
// import { terser } from 'rollup-plugin-terser'
// import peerDepsExternal from 'rollup-plugin-peer-deps-external'

// const packageJson = require('./package.json')

// export default [
//   {
//     input: 'src/index.ts',
//     output: [
//       {
//         file: packageJson.main,
//         format: 'cjs',
//         sourcemap: true,
//       },
//       {
//         file: packageJson.module,
//         format: 'es',
//         sourcemap: true,
//       },
//     ],
//     plugins: [
//       peerDepsExternal(),
//       resolve(),
//       commonjs(),
//       typescript({ tsconfig: './tsconfig.json' }),
//       terser(),
//     ],
//     external: [],
//   },
//   {
//     input: '.dist/esm/types/index.d.ts',
//     output: [{ file: '.dist/index.d.ts', format: 'esm' }],
//     plugins: [dts()],
//   },
// ]
