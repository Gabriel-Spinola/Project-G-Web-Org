import { ESResponse } from './types/common'
import { ESFailed, ESSucceed } from './types/helpers'
import { isAbortError } from 'next/dist/server/pipe-readable'

type BaseRequest<Params> = (params: Params) => Promise<Response>

export function requestHandler<Params, Value, Error = unknown>(
  request: BaseRequest<Params>,
) {
  return async (params: Params): Promise<ESResponse<Value, Error>> => {
    try {
      const response = await request(params)

      if (!response.ok) {
        const { data }: { data: Error } = await response.json()

        console.error("Response's not okay: ", JSON.stringify(data))

        throw new Error("Response's not okay")
      }

      const { data }: { data: Value } = await response.json()

      return ESSucceed(data)
    } catch (error: unknown) {
      if (isAbortError(error)) {
        return ESFailed('Request aborted' as Error)
      }

      console.error('Request failed: ', JSON.stringify(error))

      return ESFailed(error as Error)
    }
  }
}
