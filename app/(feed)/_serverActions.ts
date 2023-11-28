'use server'

import { prisma } from '@/lib/database/prisma'
import { LikeOptions, PinOptions } from './_constants'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Comment } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { ESResponse, TDisplayComment } from '@/lib/types/common'

/**
 * Helper function to control the feed revalidation in client components.
 * @returns Feed Revalidation
 */
export const revalidateFeed = (): void => revalidatePath('/')

export async function postComment(
  content: string | undefined,
  replyTarget: {
    id: string | number
    type: 'postId' | 'parentCommentId' | 'projectId'
  },
  fromPost: string,
  authorId: string,
): Promise<ESResponse<Partial<TDisplayComment>>> {
  if (!content || !authorId) {
    return {
      data: null,
      error: 'missing fields: content & authorId',
    }
  }

  try {
    const target = { [replyTarget.type]: replyTarget.id }

    const newComment: Partial<TDisplayComment> = await prisma.comment.create({
      data: {
        content,
        authorId,
        ...target,
        isEdited: false,
        createdAt: new Date(Date.now()),
      },
      include: {
        author: { select: { name: true, profilePic: true, image: true } },
      },
    })

    console.log('sucess' + JSON.stringify(newComment) + '\n')

    return {
      data: newComment,
      error: null,
    }
  } catch (error: unknown) {
    console.error(error)

    return { data: null, error }
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

export async function unpinPublication(
  selectedType: PinOptions,
  targetId: string,
): Promise<void> {
  try {
    const pin = await prisma.user.deleteMany({
      where: { pinnedPosts: { some: { id: targetId } } },
    })

    console.log('DELETE? ' + JSON.stringify(pin))
  } catch (error: unknown) {
    console.error('Like Failed ' + error)
  }
}

export async function pinPublication(
  selectedType: PinOptions,
  authorId: string,
  targetId: string,
): Promise<void> {
  try {
    const pin = await prisma.user.update({
      where: { id: authorId },
      data: { [selectedType]: { connect: { id: targetId } } },
      select: {
        [selectedType]: true,
      },
    })

    console.log('works' + pin.pinnedPosts)
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
    console.error('Failed to delete comment' + error)

    return null
  }
}
