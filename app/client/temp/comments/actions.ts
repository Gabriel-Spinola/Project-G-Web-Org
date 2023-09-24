'use server'

import { prisma } from '@/lib/database/prisma'
import { commentsRefetchTag } from './[id]/page'
import { revalidateTag } from 'next/cache'
import { Session } from 'next-auth'
import { Comment } from '@prisma/client'

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
