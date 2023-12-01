'use server'

import { LikeOptions } from '@/app/(feed)/_constants'
import { prisma } from '@/lib/database/prisma'
import { Comment } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

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
