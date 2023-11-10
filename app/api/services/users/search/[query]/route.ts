import { prisma } from '@/lib/database/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  _req: Request,
  { params }: { params: { query: string } },
) {
  const { query } = params

  try {
    const data = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { CREA: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        CREA: true,
        email: true,
        title: true,
        description: true,
        graduations: true,
        profilePic: true,
        location: true,
        image: true,
        _count: { select: { followers: true, following: true } },
      },
    })

    if (!data) {
      throw new Error('Failed to fetch data')
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (e: unknown) {
    console.error(e)

    return NextResponse.json({ data: 'failed' }, { status: 400 })
  }
}
