import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { User } from '@prisma/client'

export type UserSelectedData = { [key in keyof Partial<User>]: boolean }

/**
 * @author Gabriel Spinola
 *
 * ES stands for error/success response,
 * meaning that: it either returns an error with data being null
 * or the other way around.
 */
export type ESResponse<DataType> =
  | {
      data: DataType
      error: null
    }
  | {
      data: null
      error: string
    }

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
