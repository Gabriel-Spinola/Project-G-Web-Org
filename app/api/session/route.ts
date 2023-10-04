/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import { AuthOptions } from '@/lib/auth/AuthOptions'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

type SessionResponse = NextResponse<Record<string, any>>

export async function GET(): Promise<SessionResponse> {
  const session = await getServerSession(AuthOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: 'fail', message: 'You are not logged in' }),
      { status: 401 },
    )
  }

  return NextResponse.json({
    //               session != null ? true : false
    isAuthenticated: !!session,
    session,
  })
}
