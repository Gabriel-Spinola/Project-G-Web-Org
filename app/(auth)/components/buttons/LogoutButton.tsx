'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { AiFillHome } from 'react-icons/ai'
import { RiLogoutBoxLine } from 'react-icons/ri'

export default function LogoutButton() {
  return (
    <div className="flex flex-col w-full h-full gap-8 justify-center p-8">
      <h1 className="w-full text-center text-2xl text-pure-white">
        Parece que você já está logado!
      </h1>
      <button
        className="w-full h-12 rounded-lg flex items-center justify-evenly bg-pure-white text-darker-primary font-semibold hover:bg-medium-white"
        onClick={() => signOut()}
      >
        <RiLogoutBoxLine size={24} />
        Sair da conta
      </button>
      <Link href="/">
        <button className="w-full h-12 rounded-lg flex items-center justify-evenly bg-pure-white text-darker-primary font-semibold hover:bg-medium-white">
          <AiFillHome size={24} />
          Página inicial
        </button>
      </Link>
    </div>
  )
}
