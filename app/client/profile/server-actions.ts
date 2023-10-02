import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { UserSelectedData } from './actions'
import { User } from '@prisma/client'

/**
 * @author Gabriel Spinola
 * @default Cache is currently deactivated
 *
 * @param id Id of the user as a string.
 * @param requestData the specific data from the user you want to request.
 * @returns the requested data from the user or, if failed, null.
 */
export async function getUserData(
  id: string,
  requestData: UserSelectedData,
): Promise<Partial<User> | null> {
  'use server'

  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.users}?id=${id}`,
      {
        method: 'POST',
        headers: {
          'Cotent-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        cache: 'no-cache', // REVIEW -
        next: { tags: ['user-data'] },
      },
    )

    if (!response.ok) throw new Error('Response not ok')

    const { data }: { data: Partial<User> } = await response.json()
    return data
  } catch (error: unknown) {
    console.error(error, 'Failed to fetch users')

    return null
  }
}
