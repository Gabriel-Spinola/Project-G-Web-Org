'use server'

import { prisma } from '@/lib/database/prisma'
import { revalidateTag } from 'next/cache'
import { Comment } from '@prisma/client'
import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { commentsRefetchTag } from './contants'

export async function getComments(): Promise<Comment[] | null> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.comments}`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: [commentsRefetchTag] },
      },
    )

    if (!response.ok) {
      throw new Error(JSON.stringify(await response.json()))
    }

    const { data }: { data: Comment[] } = await response.json()

    return data
  } catch (e: unknown) {
    console.error(e)
    return null
  }
}

export async function handleSubmitComment(formData: FormData): Promise<void> {
  const content = formData.get('content')?.toString()
  const selectedType = formData.get('type')?.toString()
  const authorId = formData.get('author-id')?.toString()
  const targetId = formData.get('target-id')?.toString()

  if (!content || !authorId || !selectedType) return

  try {
    const data: Comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId: selectedType === 'posts' ? targetId : null,
        projectId: selectedType === 'projects' ? targetId : null,
        isEdited: false,
        createdAt: new Date(Date.now()),
      },
    })

    console.log('sucess' + JSON.stringify(data))
    revalidateTag(commentsRefetchTag)
  } catch (error: unknown) {
    console.error(error)
  }
}

// export async function increaseLikeCount()
