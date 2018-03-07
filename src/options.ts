import {readFileSync} from 'fs'
import {resolve} from 'path'
import {convertCompilerOptionsFromJson, readConfigFile} from 'typescript'
import {printDiagnostic} from './diagnostic'

export default () => {
  const cwd = process.cwd()
  const file = resolve(cwd, 'tsconfig.json')
  const reader = (path: string) => readFileSync(path, 'utf8')
  const {config, error} = readConfigFile(file, reader)

  if (error) printDiagnostic(error)

  const {compilerOptions} = config
  const {options, errors} = convertCompilerOptionsFromJson(compilerOptions, cwd)
  errors.forEach(printDiagnostic)

  return options
}
