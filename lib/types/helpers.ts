import { ESResponse } from './common'

export function ESSucceed<DataType>(
  data: DataType,
): ESResponse<DataType, never> {
  return { data, error: {} as never }
}

export function ESFailed<CustomError>(
  error: CustomError,
): ESResponse<never, CustomError> {
  return { data: {} as never, error }
}
