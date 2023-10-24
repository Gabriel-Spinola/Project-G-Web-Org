'use client'

import '@/app/styles/navbar.css'
import { StaticImage } from '../Image'
import React, { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { MdClose } from 'react-icons/md'
import Link from 'next/link'

export default function Navbar({ userSession }: { userSession?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function ToggleMenu() {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <nav
        id="navDesktop"
        className="flex h-[88px] w-full justify-around shadow-darker-white/40 shadow-2xl bg-medium-gray text-darker-white items-center text-xl"
      >
        <ul className="flex flex-row">
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

      <nav id="navMobile">
        <div className="flex h-[88px] w-full shadow-darker-white/40 shadow-2xl bg-medium-gray text-darker-white items-center text-xl">
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
        </div>
        <ul
          id="mobileMenuItems"
          className={`${
            menuOpen ? 'displayMenu' : 'hideMenu'
          } + text-xl sm:text-2xl md:text-3xl`}
        >
          <a href="/" className="w-full">
            <li className="p-4 hover:bg-darker-white">Feed</li>
          </a>
          <hr className="h-px bg-black/25 border-0" />
          <a href="../client/explore" className="w-full">
            <li className="p-4 hover:bg-darker-white">Explorar</li>
          </a>
          <hr className="h-px bg-black/25 border-0" />
          <a href="../client/projects" className="w-full">
            <li className="p-4 hover:bg-darker-white">Projetos</li>
          </a>
          <hr className="h-px bg-black/25 border-0" />
          <a href="../client/search" className="w-full">
            <li className="p-4 hover:bg-darker-white">Busca</li>
          </a>
          <hr className="h-px bg-black/25 border-0" />

          {userSession ? (
            <a href={`../client/profile/${userSession}`} className="w-full">
              <li className="p-4 hover:bg-darker-white">Perfil</li>
            </a>
          ) : (
            <a href="/auth" className="w-full">
              <li className="p-4 hover:bg-darker-white">Logar</li>
            </a>
          )}
        </ul>
      </nav>
    </>
  )
}
