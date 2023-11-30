'use client'

import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'
import { StaticImage } from '../Image'
import Link from 'next/link'
import './styles/mobileNavbar.css'
import { useSession } from 'next-auth/react'

export default function MobileNavbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  function ToggleMenu() {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav id="navMobile">
      <section className="flex h-[88px] max-h-[88px] w-full shadow-darker-white/40 shadow-2xl bg-medium-gray text-darker-white items-center text-xl">
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
      <section className="h-[calc(100vh-88px)]">
        <ul
          id="mobileMenuItems"
          className={`${
            menuOpen ? 'displayMenu' : 'hideMenu'
          } + text-xl sm:text-2xl md:text-3xl max-h-screen`}
        >
          <li className="p-4 hover:bg-darker-white">
            <Link href="/" className="w-full">
              Feed
            </Link>
          </li>

          <hr className="h-px bg-black/25 border-0" />

          <li className="p-4 hover:bg-darker-white">
            <Link href="/explore" className="w-full">
              Explorar
            </Link>
          </li>

          <hr className="h-px bg-black/25 border-0" />

          <li className="p-4 hover:bg-darker-white">
            <Link href="/project" className="w-full">
              Projetos
            </Link>
          </li>

          <hr className="h-px bg-black/25 border-0" />

          <li className="p-4 hover:bg-darker-white">
            <Link href="/search" className="w-full">
              Busca
            </Link>
          </li>

          <hr className="h-px bg-black/25 border-0" />

          {session ? (
            <li className="p-4 hover:bg-darker-white">
              <Link href={`/profile/${session.user.id}`} className="w-full">
                Perfil
              </Link>
            </li>
          ) : (
            <li className="p-4 hover:bg-darker-white">
              <Link href="/login" className="w-full">
                Logar
              </Link>
            </li>
          )}
        </ul>
      </section>
    </nav>
  )
}
