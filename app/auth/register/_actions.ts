'use server'

import { prisma } from '@/lib/database/prisma'
import { hash } from 'bcryptjs'
import { ESResponse } from '@/lib/types/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { RegisterFormExpectedData } from '@/lib/schemas/userRegisteringSchema'

/**
 * @param formData
 * @template string error/success message type
 * @returns either an error message or a success message
 */
export async function registerNewUser({
  name,
  email,
  password,
}: RegisterFormExpectedData): Promise<ESResponse<string>> {
  try {
    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
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

    return {
      data: 'Usuário criado',
      error: null,
    }
  } catch (error: unknown) {
    if (!(error instanceof PrismaClientKnownRequestError)) {
      console.error(error)
    }

    return {
      data: null,
      error: "Could'nt create new user, " + error,
    }
  }
}
