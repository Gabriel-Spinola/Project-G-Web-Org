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
import { RiLogoutBoxLine } from 'react-icons/ri'
import { AiFillHome } from 'react-icons/ai'

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </button>
  )
}

export const RegisterButton = () => {
  return (
    <Link href="/auth/register/" style={{ marginRight: 10 }}>
      Register
    </Link>
  )
}

export const LogoutButton = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="w-[270px] text-center text-2xl text-pure-white">
        Parece que você já está logado!
      </h1>
      <button
        className="w-full h-12 rounded-lg flex items-center justify-between pl-5 pr-20 bg-pure-white text-darker-primary font-semibold hover:bg-medium-white"
        onClick={() => signOut()}
      >
        <RiLogoutBoxLine size={24} />
        Sair da conta
      </button>
      <Link href="/">
        <button className="w-full h-12 rounded-lg flex items-center justify-between pl-5 pr-20 bg-pure-white text-darker-primary font-semibold hover:bg-medium-white">
          <AiFillHome size={24} />
          Página inicial
        </button>
      </Link>
    </div>
  )
}

export const ProfileButton = () => {
  const session = useSession()

  return <Link href={`/client/profile/${session.data?.user.id}`}>Profile</Link>
}
