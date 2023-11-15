'use client'

import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'
import { StaticImage } from '../Image'
import Link from 'next/link'
import './styles/mobileNavbar.css'

export default function MobileNavbar({
  userSession,
}: {
  userSession?: string
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  function ToggleMenu() {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav id="navMobile">
      <section className="flex h-[88px] w-full shadow-darker-white/40 shadow-2xl bg-medium-gray text-darker-white items-center text-xl">
        <button
          type="button"
          onClick={ToggleMenu}
          id="menuLines"
          className={menuOpen ? 'closeMenu' : 'hamburguerMenu'}
        >
          {menuOpen ? <MdClose size="32" /> : <RxHamburgerMenu size="32" />}
        </button>

        <section
          className="absolute flex w-full items-center justify-center"
          id="mobileLogoContainer"
        >
          <a href="/" className="">
            <StaticImage
              url={
                'https://ebqqbabyixbmiwalviko.supabase.co/storage/v1/object/public/Vampeta-Images-Public/static-images/logo.png'
              }
              alt={'logo'}
              className={''}
            />
          </a>
        </section>
      </section>
      {/* NOTE MOBILE NAVBAR MENU OPTIONS */}
      <section className="h-screen">
        <ul
          id="mobileMenuItems"
          className={`${
            menuOpen ? 'displayMenu' : 'hideMenu'
          } + text-xl sm:text-2xl md:text-3xl max-h-screen`}
        >
          <Link href="/" className="w-full">
            <li className="p-4 hover:bg-darker-white">Feed</li>
          </Link>
          <hr className="h-px bg-black/25 border-0" />
          <Link href="/explore" className="w-full">
            <li className="p-4 hover:bg-darker-white">Explorar</li>
          </Link>
          <hr className="h-px bg-black/25 border-0" />
          <Link href="/project" className="w-full">
            <li className="p-4 hover:bg-darker-white">Projetos</li>
          </Link>
          <hr className="h-px bg-black/25 border-0" />
          <Link href="/search" className="w-full">
            <li className="p-4 hover:bg-darker-white">Busca</li>
          </Link>
          <hr className="h-px bg-black/25 border-0" />

          {userSession ? (
            <Link href={`/profile/${userSession}`} className="w-full">
              <li className="p-4 hover:bg-darker-white">Perfil</li>
            </Link>
          ) : (
            <Link href="/login" className="w-full">
              <li className="p-4 hover:bg-darker-white">Logar</li>
            </Link>
          )}
        </ul>
      </section>
    </nav>
  )
}
