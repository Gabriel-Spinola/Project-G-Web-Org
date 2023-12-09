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
import { Session } from 'next-auth'
import { prisma } from '../database/prisma'

export type Credentials = Record<'email' | 'password', string> | undefined

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

export function checkIfAuthorized(
  session: Session | null,
  positionRequired: $Enums.Positions,
) {
  return session?.user.position === positionRequired
}

export function isProfissionalAccount(session: Session | null) {
  if (!session) {
    return false
  }

  return (
    checkIfAuthorized(session, $Enums.Positions.Professional) ||
    checkIfAuthorized(session, $Enums.Positions.Admin) ||
    checkIfAuthorized(session, $Enums.Positions.Office)
  )
}
