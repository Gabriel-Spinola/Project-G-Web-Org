'use server'

import { z as zod } from 'zod'
import { signIn } from 'next-auth/react'
import { API_URL } from '@/lib/apiConfig'
import { prisma } from '@/lib/database/prisma'
import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ESResponse } from '@/lib/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

const schema = zod.object({})

export async function registerNewUser(
  formData: FormData,
): Promise<ESResponse<string>> {
  try {
    const name = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

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
