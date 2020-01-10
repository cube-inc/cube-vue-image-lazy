import fs from 'fs'
import path from 'path'

import progress from 'rollup-plugin-progress'
import clear from 'rollup-plugin-clear'

import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const name = 'ImageLazy'
const version = pkg.version
const banner = `/**
 * @module ${pkg.name}
 * @version ${version}
 * @license MIT
 */`

const esbrowserslist = fs
  .readFileSync('./.browserslistrc')
  .toString()
  .split('\n')

const output = {
  name,
  banner,
  exports: 'named',
  sourcemap: true
}

const umd = {
  format: 'umd',
  file: pkg.main,
  ...output
}

const esm = {
  format: 'esm',
  file: pkg.module,
  ...output
}

const unpkg = {
  format: 'iife',
  file: pkg.unpkg,
  ...output
}

export default {
  input: 'src/wrapper.js',
  output: [umd, esm, unpkg],
  plugins: [
    progress(),
    clear({
      targets: ['dist']
    }),
    resolve(),
    commonjs(),
    alias({
      resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      entries: {
        '@': path.resolve('src'),
      },
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      presets: [
        [
          '@babel/preset-env', {
            targets: {
              browsers: esbrowserslist
            }
          }
        ]
      ]
    }),
    terser()
  ]
}
