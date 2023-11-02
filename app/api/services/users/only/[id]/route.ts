import { prisma } from '@/lib/database/prisma'
import { UserData } from '@/lib/types/common'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    const data: UserData | null = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
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
