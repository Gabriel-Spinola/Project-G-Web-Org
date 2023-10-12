import { API_ENDPOINTS, API_URL } from "@/lib/apiConfig"
import { ESResponse, FullPost } from "@/lib/types/common"
import { isAbortError } from "next/dist/server/pipe-readable"

export async function fetchPosts(
  page = 1,
  signal?: AbortSignal,
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
      signal,
    })

    if (!response.ok) {
      throw new Error("Response's not okay")
    }
    console.log(`fetch`)
    const { data }: { data: FullPost[] } = await response.json()

    return {
      data,
      error: null,
    }
  } catch (error: unknown) {
    if (isAbortError(error)) {
      console.log('feed aborted')

      return {
        data: null,
        error: 'Feed fetch aborted',
      }
    }

    console.error(error)

    return {
      data: null,
      error: 'Failed to fetch posts',
    }
  }
}
