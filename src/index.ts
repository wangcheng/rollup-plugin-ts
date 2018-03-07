import resolveId from './resolve'
import transform from './transform'
import parseOptions from './options'
import {Plugin} from 'rollup'

export default (): Plugin => {
  const compilerOptions = parseOptions()
  return {
    name: 'typescript',
    resolveId: resolveId(compilerOptions),
    transform: transform(compilerOptions),
  }
}
