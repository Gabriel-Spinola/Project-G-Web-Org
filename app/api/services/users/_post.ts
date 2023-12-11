import { prisma } from '@/lib/database/prisma'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

async function registerUser(
  data: Pick<User, 'name' | 'email' | 'password'>,
): Promise<ESResponse<User>> {
  try {
    const hashedPassword = await hash(data.password as string, 12)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    })

    if (!user) {
      console.error('not user')

      return {
        data: null,
        error: "Could'nt create new user",
      }
    }

    return ESSucceed(user)
  } catch (error: unknown) {
    if (!(error instanceof PrismaClientKnownRequestError)) {
      console.error(error)
    }

    return ESFailed('failed to register user')
  }
}

export async function handlePost(
  userData: Pick<User, 'name' | 'email' | 'password'>,
) {
  const { data, error } = await registerUser(userData)

  if (error) {
    console.error(error)

    return NextResponse.json(
      { data: 'failed to register user' },
      { status: 500 },
    )
  }

  if (!data) {
    console.error('not user')

    return NextResponse.json({ data: 'Users not found' }, { status: 404 })
  }

  return NextResponse.json({ data }, { status: 200 })
}
