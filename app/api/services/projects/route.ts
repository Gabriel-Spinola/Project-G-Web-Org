import { prisma } from '@/lib/database/prisma'
import { ProjectType } from '@/lib/types/common'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data: ProjectType[] = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
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

    return NextResponse.json({ data }, { status: 200 })
  } catch (error: unknown) {
    console.error('Failed to fetch projects: ', error)

    return NextResponse.json(
      { data: 'Failed to fetch projects' },
      { status: 500 },
    )
  }
}
