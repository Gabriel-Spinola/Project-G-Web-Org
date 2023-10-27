import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse, UserData } from '@/lib/types/common'
import { User } from '@prisma/client'
import { isFollowing } from './_server-actions'

export type UserSelectedData = { [key in keyof Partial<User>]: boolean }

/**
 * @author Gabriel Spinola
 *
 * @param id Id of the user as a string.
 * @param requestData the specific data from the user you want to request.
 * @returns the requested data from the user or, if failed, null.
 */
export async function getUserData(
  id: string,
  requestData: UserSelectedData,
): Promise<UserData | null> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.users}?id=${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.API_SECRET as string,
        },
        body: JSON.stringify(requestData),
        next: { tags: ['user-data'] },
      },
    )

    if (!response.ok) throw new Error('Response not ok')

    const { data }: { data: UserData } = await response.json()

    return data
  } catch (error: unknown) {
    console.error(error, 'Failed to fetch users')

    return null
  }
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
