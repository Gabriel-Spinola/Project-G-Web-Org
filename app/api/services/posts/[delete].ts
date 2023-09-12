import { prisma } from '@/lib/database/prisma'
import { NextResponse } from 'next/server'

export async function handleDelete(postId: string): Promise<NextResponse> {
  try {
    const data = await prisma.post.delete({ where: { id: postId } })

    if (data) {
      return NextResponse.json({ data }, { status: 200 })
    }

    return NextResponse.json(
      {
        data: 'FAILED:SERVICES/DELETE-POST::failed to delete posts (API level)',
      },
      { status: 400 },
    )
  } catch (e: unknown) {
    console.error(
      'SERVICES/DELETE-POST::failed to get posts (database level):',
      e,
    )

    return NextResponse.json(
      {
        data: 'FAILED:SERVICES/DELETE-POST::failed to delete posts (API level)',
      },
      { status: 400 },
    )
  }
}
