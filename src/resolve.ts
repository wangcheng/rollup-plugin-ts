import {statSync, readFileSync} from 'fs'
import {ResolveIdHook as Hook} from 'rollup'
import {
  nodeModuleNameResolver,
  CompilerOptions as Options,
  ModuleResolutionHost,
} from 'typescript'

const resolveHost: ModuleResolutionHost = {
  readFile: (path: string) => readFileSync(path, 'utf8'),
  directoryExists: path => {
    try {
      return statSync(path).isDirectory()
    } catch (err) {
      return false
    }
  },
  fileExists: path => {
    try {
      return statSync(path).isFile()
    } catch (err) {
      return false
    }
  },
}

export default (compilerOptions: Options): Hook => (importee, importer) => {
  if (!importer) return

  const {resolvedModule} = nodeModuleNameResolver(
    importee,
    importer.split('\\').join('/'),
    compilerOptions,
    resolveHost
  )

  return (
    resolvedModule &&
    resolvedModule.resolvedFileName &&
    !resolvedModule.resolvedFileName.endsWith('d.ts') &&
    resolvedModule.resolvedFileName
  )
}
