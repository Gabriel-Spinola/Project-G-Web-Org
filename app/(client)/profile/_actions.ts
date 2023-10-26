import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse } from '@/lib/types/common'
import { User } from '@prisma/client'
import { isFollowing } from './_server-actions'

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
        headers: {
          'X-API-Key': process.env.API_SECRET as string,
        },
        body: formData,
      },
    )

    if (!response.ok) {
      throw new Error('Response not okay')
    }

    const { data }: { data: User } = await response.json()

    return { data, error: null }
  } catch (error: unknown) {
    console.error(error)

    return { data: null, error: error as string }
  }
}

/**
 *
 * @param authorId
 * @param targetId
 * @param isOwner
 * @returns isFollowing
 */
export async function handleFollowingCheckage(
  authorId: string,
  targetId: string,
  isOwner: boolean,
): Promise<boolean> {
  if (isOwner) {
    return false
  }

  const { data, error } = await isFollowing(authorId, targetId)

  if (error) {
    console.log('Failed to check following')

    return false
  }

  return data ?? false
}
