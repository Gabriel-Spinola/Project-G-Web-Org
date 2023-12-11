import { API_ENDPOINTS, API_URL } from '@/lib/api/apiConfig'
import { requestFactory } from '@/lib/api/requestHandler'
import { PostType, ProjectType } from '@/lib/types/common'

type FetchParams = {
  page: number
  authorId: string
  signal?: AbortSignal
}

export const fetchPinnedPosts = requestFactory<FetchParams, PostType[]>(
  async (params) =>
    await fetch(
      `${API_URL}${API_ENDPOINTS.services.posts}pins/${params.page}/${params.authorId}/`,
      {
        method: 'GET',
        headers: {
          'X-API-Key': process.env.API_SECRET as string,
          'Content-Type': 'application/json',
        },
        next: { tags: ['revalidate-feed'] },
        signal: params.signal,
      },
    ),
)

export const fetchPinnedProjects = requestFactory<FetchParams, ProjectType[]>(
  async (params) =>
    await fetch(
      `${API_URL}${API_ENDPOINTS.services.projects}pins/${params.page}/${params.authorId}/`,
      {
        method: 'GET',
        headers: {
          'X-API-Key': process.env.API_SECRET as string,
          'Content-Type': 'application/json',
        },
        next: { tags: ['revalidate-feed'] },
        signal: params.signal,
      },
    ),
)
