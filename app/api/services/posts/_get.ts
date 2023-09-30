import { FullPost } from '@/lib/common'
import { prisma } from '@/lib/database/prisma'
import { NextResponse } from 'next/server'

async function getPostsFromUser(
  authorId: string,
  page = 1,
  take = 3,
): Promise<FullPost[] | null> {
  const skip = (page - 1) * take

  try {
    const data = await prisma.post.findMany({
      skip,
      take,
      where: { authorId, published: true },
      include: {
        author: {
          select: { name: true, title: true, location: true, profilePic: true },
        },
        contributor: { select: { name: true } },
        likes: { select: { id: true } },
        comments: { select: { id: true } },
      },
    })

    return data
  } catch (e: unknown) {
    console.error(
      'SERVICES/GET-POSTS::failed to get posts from user (database level): ',
      e,
    )

    return null
  }
}

async function getPostsFromAllUsers(
  page = 1,
  take = 3,
): Promise<FullPost[] | null> {
  try {
    const skip = (page - 1) * take

    const data = await prisma.post.findMany({
      skip,
      take,
      include: {
        author: {
          select: { name: true, title: true, location: true, profilePic: true },
        },
        contributor: { select: { name: true } },
        likes: { select: { id: true } },
        comments: { select: { id: true } },
      },
    })

    return data
  } catch (error: unknown) {
    console.error(
      'SERVICES/GET-POSTS::failed to get posts (database level):',
      error,
    )

    return null
  }
}

export async function handleGet(
  page: string | null,
  authorId: string | null,
): Promise<NextResponse> {
  const data: FullPost[] | null = !authorId
    ? await getPostsFromAllUsers(page ? parseInt(page) : undefined)
    : await getPostsFromUser(authorId, page ? parseInt(page) : undefined)

  console.log(data)

  if (data) {
    return NextResponse.json(
      { data: JSON.parse(JSON.stringify(data)) },
      { status: 200 },
    )
  }

  return NextResponse.json(
    { data: 'FAILED:SERVICES/GET-POSTS::failed to get posts (API level)' },
    { status: 400 },
  )
}
