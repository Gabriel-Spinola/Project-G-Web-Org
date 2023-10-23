/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import { $Enums, User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Session, getServerSession } from 'next-auth'
import { AuthOptions } from '.'
import { prisma } from '../database/prisma'

export type Credentials = Record<'email' | 'password', string> | undefined

export function generateJwtToken(user: User): string {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  }

  const token = sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: 30 * 24 * 60 * 60,
  })

  return token
}

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

    if (!user || !(await compare(credentials.password, user.password || ''))) {
      console.error(
        `ERROR_LOG::Incorret Password: ${credentials.password} != ${user?.password}`,
      )

      return null
    }

    return user
  } catch (error: unknown) {
    console.error(`FAILED TO VALIDATE CREDENTIALS ${error}`)

    return null
  }
}

export async function checkIfAuthorized(positionRequired: $Enums.Positions) {
  const session: Session | null = await getServerSession(AuthOptions)

  if (!session) {
    return false
  }

  return session?.user.position === positionRequired
}
