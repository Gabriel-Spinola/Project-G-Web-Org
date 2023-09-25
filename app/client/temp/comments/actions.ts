'use server'

import { prisma } from '@/lib/database/prisma'
import { revalidateTag } from 'next/cache'
import { Comment, Post, Project } from '@prisma/client'
import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { commentsRefetchTag } from './contants'
import { Session } from 'next-auth'

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
    const createComment: Comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId: selectedType === 'posts' ? targetId : null,
        projectId: selectedType === 'projects' ? targetId : null,
        isEdited: false,
        createdAt: new Date(Date.now()),
      },
    })

    const updateTarget: Post | Project =
      selectedType === 'posts'
        ? await prisma.post.update({
            where: { id: targetId },
            // NOTE - Push new comment into post
            data: { comments: { connect: { id: createComment.id } } },
          })
        : await prisma.project.update({
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
  } catch (error: unknown) {
    console.error(error)
  }
}

// TODO - get likes directly from posts
export async function increaseLikeCount(
  selectedType: 'postId' | 'projectId' | 'commentId',
  session: Session,
  targetId: string,
): Promise<void> {
  try {
    const newLike = { likes: { create: { [selectedType]: targetId } } }

    const updateUser = await prisma.user.update({
      where: { id: session.user.id },
      data: newLike,
    })

    console.log('success? ' + JSON.stringify(updateUser))
  } catch (error: unknown) {
    console.error('Like Failed')
  }
}
