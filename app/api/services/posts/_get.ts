import { PostType } from '@/lib/types/common'
import { prisma } from '@/lib/database/prisma'
import { NextResponse } from 'next/server'

async function getPosts(
  where: { authorId?: string; published?: boolean },
  page = 1,
  take = 3,
): Promise<PostType[] | null> {
  const skip = (page - 1) * take

  try {
    const data: PostType[] = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where,
      skip,
      take,
      include: {
        author: {
          select: { name: true, image: true, profilePic: true },
        },
        contributor: { select: { name: true } },
        likes: { select: { id: true, userId: true } },
        pins: { select: { id: true, userId: true } },
        comments: {
          include: {
            author: { select: { name: true, profilePic: true, image: true } },
            likes: { select: { id: true, userId: true } },
            replies: {
              include: {
                author: {
                  select: { name: true, profilePic: true, image: true },
                },
                likes: { select: { id: true, userId: true } },
              },
            },
          },
        },
      },
    })

    return data
  } catch (error) {
    console.error('Error occurred:', error)

    return null
  }
}

async function getPostsFromUser(
  authorId: string,
  page?: number,
  take?: number,
): Promise<PostType[] | null> {
  return getPosts({ authorId }, page, take)
}

async function getPostsFromAllUsers(
  page?: number,
  take?: number,
): Promise<PostType[] | null> {
  return getPosts({ published: true }, page, take)
}

export async function handleGet(
  page: string | null,
  authorId: string | null,
): Promise<NextResponse> {
  const data: PostType[] | null = !authorId
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
