import { prisma } from '@/lib/database/prisma'
import { UserData } from '@/lib/types/common'
import { User } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

async function handleGet(id: string) {
  try {
    const data: UserData | null = await prisma.user.findUnique({
      where: { id },
      include: {
        followers: { select: { follower: true } },
        following: { select: { following: true } },
      },
    })

    if (!data) {
      throw new Error('Failed to fetch data')
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)

    return NextResponse.json({ data: 'failed' }, { status: 400 })
  }
}

async function handlePatch(userData: Partial<User>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userData.id },
      data: userData,
    })

    revalidateTag('user-data')
    return NextResponse.json(
      { data: `User ${updatedUser.id} updated succesfuly` },
      { status: 200 },
    )
  } catch (error: unknown) {
    console.error(error)

    return NextResponse.json({ data: error }, { status: 400 })
  }
}

async function handler(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  switch (req.method) {
    case 'GET': {
      return handleGet(id)
    }

    case 'PATCH': {
      const data: Partial<User> = await req.json()

      return handlePatch(data)
    }

    default: {
      return NextResponse.json({ data: 'Invalid method' })
    }
  }
}

export { handler as PATCH, handler as GET }
