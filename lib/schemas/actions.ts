import { ZodError } from 'zod'

export function buildValidationErrorMessage<T>(
  error: ZodError<T>,
  logCallback: (errorMessage: string) => void,
) {
  let errorMessage = ''

  error.issues.forEach((issue) => {
    errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. \n'
  })

  logCallback(errorMessage)
}
