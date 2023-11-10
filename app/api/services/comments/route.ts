import { prisma } from '@/lib/database/prisma'
import { PublicationComment } from '@/lib/types/common'
import { NextResponse } from 'next/server'

// TODO - pagination
export async function GET(req: Request) {
  const url = new URL(req.url)

  const postId: string | null = url.searchParams.get('id')
  const page: number | null = Number(url.searchParams.get('page'))

  if (req.method === 'GET' && postId) {
    const take = 3
    const skip = (page - 1) * take

    try {
      const data: PublicationComment[] = await prisma.comment.findMany({
        where: { postId },
        include: { author: { select: { name: true } } },
        skip,
        take,
<<<<<<< Updated upstream
=======
        where: { postId },
        include: {
          author: { select: { name: true, profilePic: true, image: true } },
          replies: {
            select: { id: true, content: true, isEdited: true },
            include: {
              author: { select: { name: true, profilePic: true, image: true } },
            },
          },
        },
>>>>>>> Stashed changes
      })

      return NextResponse.json({ data }, { status: 200 })
    } catch (error: unknown) {
      console.error(error)

      return NextResponse.json({ data: 'invalid' }, { status: 301 })
    }
  }

  return NextResponse.json({ data: 'invalid' }, { status: 301 })
}
