import { UserSelectedData } from '@/app/(client)/profile/_actions'
import { prisma } from '@/lib/database/prisma'
import { UserData } from '@/lib/types/common'
import { User } from '@prisma/client'
import { NextResponse } from 'next/server'

type SelectedData = Record<keyof User, boolean>

export async function handleGet(id: string, selectedData: SelectedData) {
  try {
    const data: UserData | null = await prisma.user.findUnique({
      where: { id },
      select: {
        ...selectedData,
        _count: { select: { followers: true, following: true } },
      },
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
