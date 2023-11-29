import { API_URL } from '@/lib/api/apiConfig'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { User } from '@prisma/client'

export async function searchForUser(
  query: string,
): Promise<ESResponse<User[]>> {
  try {
    const response = await fetch(
      `${API_URL}api/services/users/search/${query}`,
      {
        method: 'GET',
        headers: {
          'X-API-Key': process.env.API_SECRET as string,
        },
        next: { tags: ['user-data'] },
      },
    )

    if (!response.ok) {
      const { data }: { data: string } = await response.json()

      throw new Error('Response not ok ' + data)
    }

    const { data }: { data: User[] } = await response.json()

    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}

export async function fetchUsers(): Promise<ESResponse<User[]>> {
  try {
    const response = await fetch(`${API_URL}api/services/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.API_SECRET as string,
      },
      next: { tags: ['user-data'] },
    })

    if (!response.ok) {
      const { data }: { data: string } = await response.json()

      throw new Error('Response not ok ' + data)
    }

    const { data }: { data: User[] } = await response.json()

    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}
