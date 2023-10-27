import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'

export async function createNewProject(
  id: string,
  formData: FormData,
): Promise<ESResponse<string>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.projects}${id}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'X-API-Key': process.env.API_SECRET as string,
        },
      },
    )

    const { data }: { data: string } = await response.json()

    if (!response.ok) {
      throw new Error('response not ok' + JSON.stringify(data))
    }

    return ESSucceed(data)
  } catch (error: unknown) {
    console.error(error)

    return ESFailed(error)
  }
}
