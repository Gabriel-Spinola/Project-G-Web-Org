'use client'

import React from 'react'
import NavBarSettings from './NavBarSettings'
import Link from 'next/link'
import { StaticImage } from '../Image'
import './styles/desktopNavbar.css'

export default function DesktopNavbar({
  userSession,
}: {
  userSession?: string
}) {
  return (
    <nav
      id="navDesktop"
      className="flex justify-end p-8 h-[88px] w-full shadow-darker-white/40 shadow-2xl bg-medium-gray text-darker-white items-center text-xl"
    >
      {userSession ? <NavBarSettings className="z-[100]" /> : null}

      <ul className="absolute flex flex-row w-full items-center justify-center">
        <li>
          <Link href="/explore">
            Explorar
            <div></div>
          </Link>
        </li>
        <li>
          <Link href="/projects">
            Projetos
            <div></div>
          </Link>
        </li>
        <li>
          <Link href="/">
            <StaticImage
              url={
                'https://ebqqbabyixbmiwalviko.supabase.co/storage/v1/object/public/Vampeta-Images-Public/static-images/logo.png'
              }
              alt={'logo'}
              className={''}
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
          {userSession ? (
            <Link href={`/profile/${userSession}`}>
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
