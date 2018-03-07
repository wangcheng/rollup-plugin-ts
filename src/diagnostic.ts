import {
  Diagnostic,
  flattenDiagnosticMessageText,
  DiagnosticCategory,
} from 'typescript'

export const printDiagnostic = (diagnostic: Diagnostic) => {
  const {messageText, category} = diagnostic
  const message = flattenDiagnosticMessageText(messageText, '\n')

  if (category === DiagnosticCategory.Error) {
    throw new Error(`There were TypeScript errors transpiling`)
  }

  return console.error(`[ts]: ${message}`)
}
