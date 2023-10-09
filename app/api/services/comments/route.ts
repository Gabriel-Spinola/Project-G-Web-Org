import { prisma } from '@/lib/database/prisma'
import { Comment } from '@prisma/client'
import { NextResponse } from 'next/server'

// TODO - pagination
export async function GET(req: Request) {
  const url = new URL(req.url)

  const postId: string | null = url.searchParams.get('id')

  if (req.method === 'GET' && postId) {
    try {
      const data: Comment[] = await prisma.comment.findMany({
        where: { postId },
      })

      return NextResponse.json({ data }, { status: 200 })
    } catch (e: unknown) {
      console.error(e)

      return NextResponse.json({ data: 'invalid' }, { status: 301 })
    }
  }

  return NextResponse.json({ data: 'invalid' }, { status: 301 })
}
