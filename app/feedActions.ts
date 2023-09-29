'use server'

import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse, FullPost } from '@/lib/common'
import { revalidateTag } from 'next/cache'

/**
 * Helper function to control the feed revalidation in client components.
 * @returns Feed Revalidation
 */
export const revalidateFeed = (): void => revalidateTag('revalidate-feed')

export async function fetchPosts(
  page = 1,
  authorId: string | null = null,
): Promise<ESResponse<FullPost[]>> {
  try {
    const apiRequestURL = !authorId
      ? `${API_URL}${API_ENDPOINTS.services.posts}?page=${page}`
      : `${API_URL}${API_ENDPOINTS.services.posts}?page=${page}&id=${authorId}`

    const response = await fetch(apiRequestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['revalidate-feed'] },
    })

    if (!response.ok) {
      throw new Error("Response's not okay")
    }

    const { data }: { data: FullPost[] } = await response.json()

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
