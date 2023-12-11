'use server'

import { prisma } from '@/lib/database/prisma'
import { ESResponse, PublicationComment } from '@/lib/types/common'

export async function postComment(
  content: string | undefined,
  replyTarget: {
    id: string | number
    type: 'postId' | 'parentCommentId' | 'projectId'
  },
  authorId: string,
): Promise<ESResponse<Partial<PublicationComment>>> {
  if (!content || !authorId) {
    return {
      data: null,
      error: 'missing fields: content & authorId',
    }
  }

  try {
    const target = { [replyTarget.type]: replyTarget.id }

    const newComment: Partial<PublicationComment> = await prisma.comment.create(
      {
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
      },
    )

    console.log('Comment (succeeded): ' + JSON.stringify(newComment) + '\n')

    return {
      data: newComment,
      error: null,
    }
  } catch (error: unknown) {
    console.error(error)

    return { data: null, error }
  }
}
