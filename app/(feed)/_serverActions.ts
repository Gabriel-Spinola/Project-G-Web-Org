'use server'

import { prisma } from '@/lib/database/prisma'
import { LikeOptions } from './_constants'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Comment, Post } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'

/**
 * Helper function to control the feed revalidation in client components.
 * @returns Feed Revalidation
 */
export const revalidateFeed = (): void => revalidatePath('/')

export async function postComment(
  formData: FormData,
): Promise<ESResponse<number, string | unknown>> {
  const content = formData.get('content')?.toString()
  const authorId = formData.get('author-id')?.toString()
  const targetId = formData.get('target-id')?.toString()

  if (!content || !authorId) {
    return ESFailed('missing fields: content & authorId')
  }

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

    return ESSucceed(createComment.id)
  } catch (error: unknown) {
    console.error(error)

    return ESFailed(error)
  }
}

export async function increaseLikeCount(
  selectedType: LikeOptions,
  authorId: string,
  targetId: string | number,
): Promise<void> {
  try {
    const newLike = { likes: { create: { [selectedType]: targetId } } }

    const updateUser = await prisma.user.update({
      where: {
        id: authorId,
        NOT: { likes: { some: { [selectedType]: targetId } } },
      },
      select: { id: true },
      data: newLike,
    })

    console.log('POST? ' + JSON.stringify(updateUser))
  } catch (error: unknown) {
    // REVIEW - check of possible optimizations for this solution
    if (error instanceof PrismaClientKnownRequestError) {
      console.warn('cannot like the same post twice thrown\n', error)

      return
    }

    console.error('Like Failed ' + error)
  }
}

export async function decreaseLikeCount(
  selectedType: LikeOptions,
  targetId: string | number,
): Promise<void> {
  try {
    // REVIEW - Best solution found till now, is to make all Like fields unique
    const deleteLike = await prisma.like.deleteMany({
      where: { [selectedType]: targetId },
    })

    console.log('DELETE? ' + JSON.stringify(deleteLike))
  } catch (error: unknown) {
    console.error('Like Failed ' + error)
  }
}

export async function deleteComment(id: number): Promise<void | null> {
  try {
    const deletedComment: Comment = await prisma.comment.delete({
      where: { id },
    })

    console.log(JSON.stringify(deletedComment))
  } catch (error: unknown) {
    console.error('Failed to delete comment')

    return null
  }
}
