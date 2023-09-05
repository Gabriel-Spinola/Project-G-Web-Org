import { prisma } from '@/lib/database/prisma'
import { Post } from '@prisma/client'
import { NextResponse } from 'next/server'

type FullPost = {
  author: {
    name: string | null
  } | null
} & Post

async function getPostsFromUser(
  take: number | null,
  authorId: string,
): Promise<FullPost[] | null> {
  try {
    const data = await prisma.post.findMany({
      take: take ?? 3,
      where: { authorId },
      include: {
        author: { select: { name: true, title: true } },
      },
    })

    console.log('specific users')

    return data
  } catch (e: unknown) {
    console.error(
      'SERVICES/GET-POSTS::failed to get posts from user (database level): ',
      e,
    )

    return null
  }
}

async function getOnlyPosts(take: number | null): Promise<FullPost[] | null> {
  try {
    const data = await prisma.post.findMany({
      take: take ?? 3,
      include: {
        author: { select: { name: true, title: true } },
      },
    })

    return data
  } catch (e: unknown) {
    console.error('SERVICES/GET-POSTS::failed to get posts (database level)', e)

    return null
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url)

  const take: string | null = url.searchParams.get('take')
  const authorId: string | null = url.searchParams.get('authorId')

  const data: FullPost[] | null = !authorId
    ? await getOnlyPosts(take ? parseInt(take) : null)
    : await getPostsFromUser(take ? parseInt(take) : null, authorId)

  if (data) {
    return NextResponse.json({ data }, { status: 200 })
  }

  return NextResponse.json(
    { data: 'FAILED:SERVICES/GET-POSTS::failed to get posts (API level)' },
    { status: 400 },
  )
}
