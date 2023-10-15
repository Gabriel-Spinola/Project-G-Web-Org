import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { UserSelectedData } from './actions'
import { UserData } from '@/lib/types/common'

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
  'use server'

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
