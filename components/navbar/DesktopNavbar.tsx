'use client'

import React from 'react'
import NavBarSettings from './NavBarSettings'
import Link from 'next/link'
import './styles/desktopNavbar.css'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function DesktopNavbar() {
  const { data: session } = useSession()

  return (
    <nav
      id="navDesktop"
      className="flex justify-end p-8 h-[88px] w-full shadow-darker-white/40 shadow-2xl bg-medium-gray text-darker-white items-center text-xl"
    >
      {session ? <NavBarSettings className="z-[100]" /> : null}

      <ul className="absolute flex flex-row w-full items-center justify-center">
        <li>
          <Link href="/explore">
            Explorar
            <div></div>
          </Link>
        </li>
        <li>
          <Link href="/project">
            Projetos
            <div></div>
          </Link>
        </li>
        <li className="w-[15%] h-[80%]">
          <Link href="/" prefetch={false}>
            <Image
              src={
                'https://ebqqbabyixbmiwalviko.supabase.co/storage/v1/object/public/Vampeta-Images-Public/static-images/logo.png'
              }
              alt="Logo"
              width={250}
              height={72}
              objectFit="contain"
              quality={100}
            />
          </Link>
        </li>
        <li>
          <Link href="/search">
            Busca
            <div></div>
          </Link>
        </li>
        <li>
          {session ? (
            <Link href={`/profile/${session.user.id}`}>
              Perfil
              <div></div>
            </Link>
          ) : (
            <Link href="/login">
              Logar
              <div></div>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
