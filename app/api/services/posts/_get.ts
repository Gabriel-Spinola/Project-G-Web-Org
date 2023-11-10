import { FullPost } from '@/lib/types/common'
import { prisma } from '@/lib/database/prisma'
import { NextResponse } from 'next/server'
import { tempIncludeForUser } from './_utils'

async function getPosts(
  where: { authorId?: string; published?: boolean },
  page = 1,
  take = 3,
): Promise<FullPost[] | null> {
  try {
    const skip = (page - 1) * take

    const data: FullPost[] = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where,
      skip,
      take,
      ...tempIncludeForUser,
    })

    return data
  } catch (error) {
    console.error('Error occurred:', error)

    throw new Error('Failed to fetch posts from the database.')
  }
}

async function getPostsFromUser(
  authorId: string,
  page?: number,
  take?: number,
): Promise<FullPost[] | null> {
  return getPosts({ authorId }, page, take)
}

async function getPostsFromAllUsers(
  page?: number,
  take?: number,
): Promise<FullPost[] | null> {
  return getPosts({ published: true }, page, take)
}

export async function handleGet(
  page: string | null,
  authorId: string | null,
): Promise<NextResponse> {
  const data: FullPost[] | null = !authorId
    ? await getPostsFromAllUsers(page ? parseInt(page) : undefined)
    : await getPostsFromUser(authorId, page ? parseInt(page) : undefined)

  if (!data) {
    return NextResponse.json(
      { data: 'FAILED:SERVICES/GET-POSTS::failed to get posts (API level)' },
      { status: 400 },
    )
  }

  return NextResponse.json(
    { data: JSON.parse(JSON.stringify(data)) },
    { status: 200 },
  )
}
