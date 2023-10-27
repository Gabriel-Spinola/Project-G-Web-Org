import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse, FullPost } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { Post } from '@prisma/client'
import { isAbortError } from 'next/dist/server/pipe-readable'

export async function handlePostDeletion(
  postId: string,
  routeCallback: () => void,
) {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.posts}?id=${postId}`,
      {
        method: 'DELETE',
        headers: {
          'X-API-Key': process.env.API_SECRET as string,
        },
      },
    )

    const { data }: { data: Post } = await response.json()

    if (!response.ok) {
      throw new Error('response not ok' + JSON.stringify(data))
    }

    routeCallback()
  } catch (error: unknown) {
    console.error(error)
  }
}

/**
 * Fetch multiple posts
 * @param page
 * @param signal
 * @param authorId
 * @returns array of posts
 */
export async function fetchPosts<T extends FullPost = FullPost>(
  page = 1,
  signal?: AbortSignal,
  authorId?: string,
): Promise<ESResponse<T[]>> {
  try {
    const apiRequestURL = !authorId
      ? `${API_URL}${API_ENDPOINTS.services.posts}?page=${page}`
      : `${API_URL}${API_ENDPOINTS.services.posts}?page=${page}&id=${authorId}`

    const response = await fetch(apiRequestURL, {
      method: 'GET',
      headers: {
        'X-API-Key': process.env.API_SECRET as string,
        'Content-Type': 'application/json',
      },
      next: { tags: ['revalidate-feed'] },
      signal,
    })

    if (!response.ok) {
      throw new Error("Response's not okay")
    }

    const { data }: { data: T[] } = await response.json()

    return {
      data,
      error: null,
    }
  } catch (error: unknown) {
    if (isAbortError(error)) {
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

/**
 * Fetch single post
 * @param postId
 * @returns post
 */
export async function fetchPost(postId: string): Promise<ESResponse<FullPost>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.users}/only/${postId}`,
      {
        method: 'GET',
        headers: {
          'X-API-Key': process.env.API_SECRET as string,
          'Content-Type': 'application/json',
        },
        next: { tags: ['revalidate-post'] },
      },
    )

    if (!response.ok) {
      throw new Error("Response's not okay")
    }

    const { data }: { data: FullPost } = await response.json()

    return ESSucceed(data)
  } catch (error: unknown) {
    console.error(error)

    return ESFailed(error)
  }
}
