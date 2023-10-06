import { prisma } from '@/lib/database/prisma'
import { UserData } from '@/lib/types/common'
import { Follows, User } from '@prisma/client'
import { NextResponse } from 'next/server'

type SelectedData = Record<keyof User, boolean>

async function handler(req: Request) {
  const url = new URL(req.url)

  const id = url.searchParams.get('id')?.toString()
  const selectedData: SelectedData = await req.json()

  if (!id) {
    return NextResponse.json({ data: "Id can't be null" }, { status: 400 })
  }

  try {
    const data: UserData | null = await prisma.user.findUnique({
      where: { id },
      select: { ...selectedData, followers: true, following: true },
    })

    if (data) {
      return NextResponse.json({ data }, { status: 200 })
    }

    throw new Error('Failed to fetch data')
  } catch (e: unknown) {
    console.error(e)

    return NextResponse.json({ data: 'failed' }, { status: 400 })
  }
}

export { handler as POST }
