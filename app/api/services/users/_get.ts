import { prisma } from '@/lib/database/prisma'
import { User } from '@prisma/client'
import { NextResponse } from 'next/server'

export default async function handleGet(): Promise<
  NextResponse<Record<'data', User[] | string>>
> {
  try {
    const users = await prisma.user.findMany()

    if (users.length <= 0) {
      console.warn('no user found')

      return NextResponse.json({ data: 'No user found' }, { status: 204 })
    }

    return NextResponse.json({ data: users }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)

    return NextResponse.json(
      { data: 'failed to search for user' },
      { status: 500 },
    )
  }
}
