import { ESResponse } from './common'

export function ESSucceed<DataType>(data: DataType): ESResponse<DataType> {
  return { data, error: null }
}

export function ESFailed<CustomError = string | unknown>(
  error: CustomError,
): ESResponse<never, CustomError> {
  return { data: null, error }
}
