import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse } from '@/lib/common'
import { User } from '@prisma/client'

export type UserSelectedData = { [key in keyof Partial<User>]: boolean }

/**
 *
 * @param formData
 * @param userId
 * @returns Returns the updated data from the user or an error
 */
export async function updateUserPageData(
  formData: FormData,
  userId: string,
): Promise<ESResponse<User>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.handlers.updateUser}?id=${userId}`,
      {
        method: 'PUT',
        body: formData,
      },
    )

    if (!response.ok) {
      throw new Error('Response not okay')
    }

    const { data }: { data: User } = await response.json()

    return { data, error: null }
  } catch (error: unknown) {
    // TODO - Client Response
    console.error(error)

    return { data: null, error: error as string }
  }
}
