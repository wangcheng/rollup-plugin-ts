import {TransformHook as Hook} from 'rollup'
import {transpileModule, CompilerOptions as Options} from 'typescript'
import {printDiagnostic} from './diagnostic'

export default (compilerOptions: Options): Hook => (input, id) => {
  const {diagnostics = [], outputText, sourceMapText} = transpileModule(input, {
    fileName: String(id),
    reportDiagnostics: true,
    compilerOptions,
  })

  diagnostics.forEach(printDiagnostic)

  return Promise.resolve({
    code: outputText,
    map: sourceMapText ? JSON.parse(sourceMapText) : null,
  })
}
