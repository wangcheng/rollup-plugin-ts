import tsPlugin from '../src'
import {InputOptions, OutputOptions} from 'rollup'

export const inputOptions: InputOptions = {
  input: './src/index.ts',
  external: ['fs', 'path'],
  plugins: [tsPlugin()],
}

export const outputOptions: OutputOptions = {
  format: 'es',
  file: 'index.js',
  sourcemap: 'inline',
}
