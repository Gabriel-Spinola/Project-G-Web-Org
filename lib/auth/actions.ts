import { compare } from 'bcryptjs'
import { prisma } from '../database/prisma'
import { createTransport } from 'nodemailer'
import { Theme } from 'next-auth'

export type Credentials = Record<'email' | 'password', string> | undefined
export type User = Record<string, any>

/**
 *
 * @param credentials
 * @returns if credentials valid returns user
 */
export async function validateCredentials(
  credentials: Credentials,
): Promise<User | null> {
  if (!credentials?.password || !credentials?.email) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    })

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!user || !(await compare(credentials.password, user.password!))) {
      console.log(`GETTING NULL ${credentials.password} != ${user?.password}`)

      return null
    }

    return user
  } catch (error: unknown) {
    console.error(`FAILED TO VALIDATE CREDENTIALS ${error}`)

    return null
  }
}