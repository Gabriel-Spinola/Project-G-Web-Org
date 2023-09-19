import { prisma } from '@/lib/database/prisma'
import { Post } from '@prisma/client'
import { NextResponse } from 'next/server'

async function tryUpdatePost(
  newPost: Post,
  postId: string,
): Promise<Post | null> {
  try {
    // TODO: Make upsert
    const data = await prisma.post.upsert({
      where: { id: postId },
      update: newPost,
      create: {
        content: newPost.content,
        images: newPost.images,
        published: newPost.published,
        authorId: newPost.authorId,
      },
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

export async function handlePut(
  postId: string,
  newPost: Post,
): Promise<NextResponse> {
  const data = await tryUpdatePost(newPost, postId)

  return NextResponse.json(data)
}
