'use server'

import { z as zod } from 'zod'
import { prisma } from '@/lib/database/prisma'
import { hash } from 'bcryptjs'
import { ESResponse } from '@/lib/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FormExpectedData } from '@/components/register/form'

const schema = zod.object({})

/**
 * @param formData
 * @template string error/success message type
 * @returns either an error message or a success message
 */
export async function registerNewUser({
  name,
  email,
  password,
}: FormExpectedData): Promise<ESResponse<string>> {
  try {
    if (!name || !email || !password)
      throw new Error("Form fields can't be null")

    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
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
