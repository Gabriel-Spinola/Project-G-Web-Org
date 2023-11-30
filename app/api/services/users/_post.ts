import { prisma } from '@/lib/database/prisma'
import { UserData } from '@/lib/types/common'
import { User } from '@prisma/client'
import { NextResponse } from 'next/server'

type SelectedData = Record<keyof User, boolean>

export async function handlePostWithSelectedData(
  id: string,
  selectedData: SelectedData,
) {
  try {
    const data: UserData | null = await prisma.user.findUnique({
      where: { id },
      select: {
        ...selectedData,
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

export async function handlePost(data: Pick<User, 'name' | 'email'>) {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    })

    if (!user) {
      console.error('not user')

      throw new Error("Could'nt create new user")
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error: unknown) {
    return NextResponse.json({ data: error }, { status: 301 })
  }
}
