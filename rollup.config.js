import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import { terser } from 'rollup-plugin-terser'

export default {
  external: ['vue-runtime-helpers'],
  input: 'src/wrapper.js',
  output: {
    name: 'ImageLazy',
    exports: 'named',
    globals: {
      'vue-runtime-helpers': 'vueRuntimeHelpers',
    }
  },
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
    }),
    buble(),
    terser()
  ]
}
