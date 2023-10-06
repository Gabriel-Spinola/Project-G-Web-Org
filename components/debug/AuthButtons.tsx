/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const LoginButton = () => {
  return (
    <button
      className="w-1/5 py-4 bg-darker-primary rounded-xl text-2xl text-darker-white"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  )
}

export const RegisterButton = () => {
  return (
    <Link href="/auth/register/" style={{ marginRight: 10 }}>
      Criar uma conta
    </Link>
  )
}

export const LogoutButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </button>
  )
}

export const ProfileButton = () => {
  const session = useSession()

  return <Link href={`/client/profile/${session.data?.user.id}`}>Profile</Link>
}
