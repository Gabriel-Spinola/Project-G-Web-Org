'use server'

import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse, FullPost } from '@/lib/common'
import { revalidateTag } from 'next/cache'

export async function fetchPosts(
  page = 1,
  shouldRevalidate = false,
): Promise<ESResponse<FullPost[]>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.posts}?page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: ['revalidate-feed'] },
      },
    )

    if (!response.ok) {
      throw new Error("Response's not okay")
    }

    const { data }: { data: FullPost[] } = await response.json()

    if (shouldRevalidate) {
      revalidateTag('revalidate-feed')
    }

    return {
      data,
      error: null,
    }
  } catch (error: unknown) {
    console.error(error)

    return {
      data: null,
      error: 'Failed to fetch posts',
    }
  }
}
