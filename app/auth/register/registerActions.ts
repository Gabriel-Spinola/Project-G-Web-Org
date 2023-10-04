'use server'

import { z as zod } from 'zod'
import { signIn } from 'next-auth/react'
import { API_URL } from '@/lib/apiConfig'
import { prisma } from '@/lib/database/prisma'
import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'

const schema = zod.object({})

export async function registerNewUser(formData: FormData): Promise<void> {
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

      return
    }

    redirect('/client/auth/')
  } catch (error: unknown) {
    console.error(error)
  }
}
