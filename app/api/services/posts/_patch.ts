import { prisma } from '@/lib/database/prisma'
import { Post } from '@prisma/client'
import { NextResponse } from 'next/server'

async function tryUpdatePost(
  newPost: Partial<Post>,
  postId: string,
): Promise<Post | null> {
  try {
    const data = await prisma.post.update({
      where: { id: postId },
      data: newPost,
    })

    return data
  } catch (e: unknown) {
    console.warn(
      'SERVICES/CREATE-POSTS::failed to create post (database level): ',
      e,
    )

    return null
  }
}

export async function handlePatch(
  postId: string,
  newPost: Partial<Post>,
): Promise<NextResponse> {
  const data = await tryUpdatePost(newPost, postId)

  return NextResponse.json(data)
}
