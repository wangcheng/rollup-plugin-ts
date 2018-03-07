import {rollup} from 'rollup'
import {inputOptions, outputOptions} from './options'

rollup(inputOptions).then(bundle => bundle.write(outputOptions))
