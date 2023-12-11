import { API_URL, API_ENDPOINTS } from '@/lib/api/apiConfig'
import { requestFactory } from '@/lib/api/requestHandler'
import { PostType } from '@/lib/types/common'

export const fetchPost = requestFactory<string, PostType>((params) =>
  fetch(`${API_URL}${API_ENDPOINTS.services.posts}only/${params}`, {
    method: 'GET',
    headers: {
      'X-API-Key': process.env.API_SECRET as string,
      'Content-Type': 'application/json',
    },
    next: { tags: ['revalidate-post'] },
  }),
)
