import { prisma } from '@/lib/database/prisma'
import { User } from '@prisma/client'
import { NextResponse } from 'next/server'

export default async function handlePatch(
  id: string,
  newUserData: Partial<User>,
) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: newUserData,
    })

    return NextResponse.json(
      { data: `User ${updatedUser.id} updated succesfuly` },
      { status: 200 },
    )
  } catch (error: unknown) {
    console.error(error)

    return NextResponse.json({ data: error }, { status: 400 })
  }
}
