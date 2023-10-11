'use server'

import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse, FullPost, PublicationComment } from '@/lib/types/common'
import { revalidateTag } from 'next/cache'
import { commentsRefetchTag } from '../client/temp/comments/contants'
import { prisma } from '@/lib/database/prisma'
import { Comment, Post } from '@prisma/client'

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

// TODO - only need to receive the new post data not the formData
export async function createNewPost(
  formData: FormData,
): Promise<ESResponse<string>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.posts}?id=clneuw2o60000w494md2x3u8f`,
      {
        method: 'POST',
        body: formData,
      },
    )

    const { data } = await response.json()

    if (!response.ok) {
      throw new Error('response not ok ' + JSON.stringify(data))
    }

    console.log('worked ' + JSON.stringify(data))
    return {
      data: 'worked ' + JSON.stringify(data),
      error: null,
    }
    // revalidatePath('/client/temp/with-server/')
  } catch (e: unknown) {
    console.error(e)

    return {
      data: null,
      error: e as string,
    }
  }
}

export async function postComment(formData: FormData) {
  const content = formData.get('content')?.toString()
  const authorId = formData.get('author-id')?.toString()
  const targetId = formData.get('target-id')?.toString()

  if (!content || !authorId) return

  try {
    const createComment: Comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId: targetId,
        isEdited: false,
        createdAt: new Date(Date.now()),
      },
    })

    const updateTarget: Post = await prisma.post.update({
      where: { id: targetId },
      // NOTE - Push new comment into post
      data: { comments: { connect: { id: createComment.id } } },
    })

    console.log(
      'sucess' +
        JSON.stringify(createComment) +
        '\n' +
        JSON.stringify(updateTarget),
    )

    revalidateTag(commentsRefetchTag)
    revalidateTag('revalidate-feed')
  } catch (error: unknown) {
    console.error(error)
  }
}
