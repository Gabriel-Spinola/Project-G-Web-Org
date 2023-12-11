import { prisma } from '@/lib/database/prisma'
import { ESResponse, PostType } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { NextResponse } from 'next/server'

async function getPost(id: string): Promise<ESResponse<PostType>> {
  try {
    const data: PostType = await prisma.post.findUniqueOrThrow({
      where: { id },
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

    return ESSucceed(data)
  } catch (error: unknown) {
    console.error('Failed to get post: ', error)

    return ESFailed(error)
  }
}

async function handler(req: Request, { params }: { params: { id: string } }) {
  if (req.method !== 'GET') {
    return NextResponse.json({ data: 'Only GET allowed' }, { status: 405 })
  }

  const { id } = params

  console.log(id)

  if (!id) {
    return NextResponse.json(
      { data: "FAILED:SERVICES/only GET: Id can't be null" },
      { status: 400 },
    )
  }

  const { data, error } = await getPost(id)

  if (error) {
    return NextResponse.json({ data: error }, { status: 400 })
  }

  return NextResponse.json({ data }, { status: 200 })
}

export { handler as GET }
